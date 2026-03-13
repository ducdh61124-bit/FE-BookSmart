import React from 'react';
import { Form, Input, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, IdcardOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../3rd_floor_stateManagement/hooks/useAuth';
import { CustomButton } from '../../components/shared/CustomButton';
import './AuthPage.css';

const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { registerUser, loading } = useAuth();

    // Hàm xử lý submit form
    const onFinish = async (values: any) => {
        try {
            const { confirm, ...submitData } = values;
            console.log("Dữ liệu gửi xuống Backend:", submitData);

            const success = await registerUser(submitData);
            if (success) {
                message.success('Đăng ký thành công! Hãy đăng nhập.');
                navigate('/login');
            }
        } catch (err: any) {
            message.error(err.message || 'Tên đăng nhập hoặc Email đã tồn tại!');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ maxWidth: '450px', padding: '30px 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <ArrowLeftOutlined
                        style={{ fontSize: '20px', cursor: 'pointer', color: '#FFB400', marginRight: '15px' }}
                        onClick={() => navigate('/login')}
                    />
                    <Title level={2} className="auth-title" style={{ margin: 0 }}>ĐĂNG KÝ</Title>
                </div>

                <Form onFinish={onFinish} layout="vertical" size="large">
                    <Form.Item name="name" rules={[{ required: true, message: 'Nhập họ và tên!' }]} style={{ marginBottom: '15px' }}>
                        <Input className="modern-input" prefix={<IdcardOutlined style={{color: '#FFB400'}}/>} placeholder="Họ và tên" />
                    </Form.Item>

                    <Form.Item name="username" rules={[{ required: true, message: 'Nhập tên đăng nhập!' }]} style={{ marginBottom: '15px' }}>
                        <Input className="modern-input" prefix={<UserOutlined style={{color: '#FFB400'}}/>} placeholder="Tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Nhập Email!' },
                            { type: 'email', message: 'Định dạng Email không hợp lệ!' }
                        ]}
                        style={{ marginBottom: '15px' }}
                    >
                        <Input className="modern-input" prefix={<MailOutlined style={{color: '#FFB400'}}/>} placeholder="Địa chỉ Email" />
                    </Form.Item>

                    <Form.Item name="phone" rules={[{ required: true, message: 'Nhập số điện thoại!' }]} style={{ marginBottom: '15px' }}>
                        <Input className="modern-input" prefix={<PhoneOutlined style={{color: '#FFB400'}}/>} placeholder="Số điện thoại" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Nhập mật khẩu!' }]} style={{ marginBottom: '15px' }}>
                        <Input.Password className="modern-input" prefix={<LockOutlined style={{color: '#FFB400'}}/>} placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        style={{ marginBottom: '25px' }}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password className="modern-input" prefix={<LockOutlined style={{color: '#FFB400'}}/>} placeholder="Xác nhận mật khẩu" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>
                        <CustomButton className="gold-button" htmlType="submit" loading={loading} block>
                            TẠO TÀI KHOẢN
                        </CustomButton>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;