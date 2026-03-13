import React, { useState } from 'react';
import { Form, Input, Typography, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/shared/CustomButton';
import './AuthPage.css';
import { authService } from '../../../2nd_floor_professionalSkill/services/authService';

const { Title, Text } = Typography;

const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [savedEmail, setSavedEmail] = useState('');

    // 1. Hàm xử lý gửi Email để nhận OTP
    const onSendEmail = async (values: any) => {
        setLoading(true);
        try {
            // Hàng thật: Gọi API xuống Spring Boot
            await authService.forgotPassword(cleanEmail);

            setSavedEmail(values.email);
            message.success('Đã gửi mã OTP vào Email của bạn!');
            setStep(2);
        } catch (err: any) {
            // Bắt lỗi từ Spring Boot trả về (VD: Email không tồn tại)
            message.error(err.response?.data?.message || err.response?.data || 'Lỗi: Email không tồn tại!');
        } finally {
            setLoading(false);
        }
    };

    // 2. Hàm xác nhận lại mật khẩu
    const onResetPassword = async (values: any) => {
        setLoading(true);
        try {
            const { confirm, ...submitData } = values;
            const payload = {
                email: savedEmail,
                otp: submitData.otp,
                newPassword: submitData.newPassword
            };

            // Hàng thật: Gửi OTP và Pass mới xuống Spring Boot
            await authService.resetPassword(payload);

            message.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
            navigate('/login');
        } catch (err: any) {
            message.error(err.response?.data?.message || err.response?.data || 'Mã OTP không chính xác hoặc đã hết hạn!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ maxWidth: '400px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <ArrowLeftOutlined
                        style={{ fontSize: '20px', cursor: 'pointer', color: '#FFB400', marginRight: '15px' }}
                        onClick={() => {
                            if (step === 2) setStep(1); // Nếu ở bước 2 thì lùi về bước 1
                            else navigate('/login');    // Nếu ở bước 1 thì về Login
                        }}
                    />
                    <Title level={2} className="auth-title" style={{ margin: 0 }}>
                        {step === 1 ? 'QUÊN MẬT KHẨU' : 'ĐỔI MẬT KHẨU'}
                    </Title>
                </div>

                {step === 1 && (
                    <>
                        <Text style={{ color: '#ccc', display: 'block', marginBottom: '25px' }}>
                            Nhập Email của bạn. Chúng tôi sẽ gửi mã OTP gồm 6 chữ số để khôi phục mật khẩu.
                        </Text>
                        <Form onFinish={onSendEmail} layout="vertical" size="large">
                            <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập Email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
                                <Input className="modern-input" prefix={<MailOutlined style={{color: '#FFB400'}}/>} placeholder="Nhập địa chỉ Email" />
                            </Form.Item>
                            <Form.Item style={{ marginTop: '20px', marginBottom: 0 }}>
                                <CustomButton className="gold-button" htmlType="submit" loading={loading} block>
                                    NHẬN MÃ OTP
                                </CustomButton>
                            </Form.Item>
                        </Form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Text style={{ color: '#ccc', display: 'block', marginBottom: '25px' }}>
                            Mã OTP đã được gửi đến <strong style={{ color: '#FFB400' }}>{savedEmail}</strong>. Vui lòng kiểm tra hộp thư.
                        </Text>
                        <Form onFinish={onResetPassword} layout="vertical" size="large">
                            <Form.Item name="otp" rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
                                <Input className="modern-input" prefix={<KeyOutlined style={{color: '#FFB400'}}/>} placeholder="Mã OTP (VD: 123456)" />
                            </Form.Item>

                            <Form.Item name="newPassword" rules={[{ required: true, message: 'Nhập mật khẩu mới!' }]} style={{ marginBottom: '15px' }}>
                                <Input.Password className="modern-input" prefix={<LockOutlined style={{color: '#FFB400'}}/>} placeholder="Mật khẩu mới" />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password className="modern-input" prefix={<LockOutlined style={{color: '#FFB400'}}/>} placeholder="Xác nhận mật khẩu mới" />
                            </Form.Item>

                            <Form.Item style={{ marginTop: '25px', marginBottom: 0 }}>
                                <CustomButton className="gold-button" htmlType="submit" loading={loading} block>
                                    XÁC NHẬN ĐỔI MẬT KHẨU
                                </CustomButton>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;