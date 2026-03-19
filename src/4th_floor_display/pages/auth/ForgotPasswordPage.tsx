import React, { useState } from 'react';
import { Form, Input, Typography, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/shared/CustomButton';
import { authStyles } from '../../layouts/AuthLayout';
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
            const emailToSent = values.email.trim();
            await authService.forgotPassword(emailToSent);

            setSavedEmail(emailToSent);
            message.success('Đã gửi mã OTP!');
            setStep(2);
        } catch (err: any) {
            message.error(err.message || 'Email không tồn tại!');
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
        <>
            <Title level={2} className={authStyles.title}>
                <ArrowLeftOutlined className="absolute left-10 cursor-pointer hover:scale-110 transition-transform" onClick={() => step === 2 ? setStep(1) : navigate('/login')} />
                {step === 1 ? 'QUÊN MẬT KHẨU' : 'ĐỔI MẬT KHẨU'}
            </Title>

            <span className="text-white/60 block mb-6 text-sm">
                {step === 1 ? 'Nhập Email để nhận mã OTP khôi phục.' : `Mã OTP đã gửi đến ${savedEmail}`}
            </span>

            {step === 1 ? (
                <Form onFinish={onSendEmail} layout="vertical">
                    <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                        <Input className={authStyles.input} prefix={<MailOutlined className="text-[#FFB400]"/>} placeholder="Nhập địa chỉ Email" />
                    </Form.Item>
                    <CustomButton className={authStyles.goldBtn} htmlType="submit" loading={loading}>NHẬN MÃ OTP</CustomButton>
                </Form>
            ) : (
                <Form onFinish={onResetPassword} layout="vertical">
                    <Form.Item name="otp" rules={[{ required: true }]}><Input className={authStyles.input} prefix={<KeyOutlined className="text-[#FFB400]"/>} placeholder="Mã OTP" /></Form.Item>
                    <Form.Item name="newPassword" rules={[{ required: true }]}><Input.Password className={authStyles.input} prefix={<LockOutlined className="text-[#FFB400]"/>} placeholder="Mật khẩu mới" /></Form.Item>
                    <Form.Item name="confirm" dependencies={['newPassword']} rules={[{ required: true }, ({ getFieldValue }) => ({
                        validator(_, value) { return !value || getFieldValue('newPassword') === value ? Promise.resolve() : Promise.reject(new Error('Mật khẩu không khớp!')); }
                    })]}><Input.Password className={authStyles.input} prefix={<LockOutlined className="text-[#FFB400]"/>} placeholder="Xác nhận mật khẩu" /></Form.Item>
                    <CustomButton className={authStyles.goldBtn} htmlType="submit" loading={loading}>XÁC NHẬN ĐỔI MẬT KHẨU</CustomButton>
                </Form>
            )}
        </>
    );
};

export default ForgotPasswordPage;