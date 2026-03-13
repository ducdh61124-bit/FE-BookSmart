import React, { useEffect } from 'react';
import { Form, Input, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../3rd_floor_stateManagement/hooks/useAuth';
import { CustomButton } from '../../components/shared/CustomButton';
import { SocialLogin } from './components/SocialLogin';
import './AuthPage.css';

const { Title, Text } = Typography;

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const { loginUser, loading } = useAuth();
    const [form] = Form.useForm();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            form.setFieldsValue({ username: savedEmail, remember: true });
        }
    }, [form]);

    const onFinish = async (values: any) => {
        try {
            const success = await loginUser(values);
            console.log("Đăng nhập có thành công không?", success);

            if (success) {
                message.success('Đăng nhập thành công! Đang chuyển hướng...');
                // Đợi 0.5 giây cho Redux kịp cập nhật rồi mới chuyển trang
                setTimeout(() => {
                    navigate('/books');
                }, 500);
            } else {
                message.error('Sai tài khoản hoặc mật khẩu!');
            }
        } catch (err: any) {
            message.error('Máy chủ không phản hồi!');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <Title level={2} className="auth-title">LOGIN NOW</Title>

                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ remember: false }}
                >
                    <Form.Item name="username" rules={[{ required: true, message: 'Nhập E-mail/Username!' }]}>
                        <Input className="modern-input" prefix={<UserOutlined style={{color: '#FFB400'}}/>} placeholder="Enter your E-mail" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Nhập Password!' }]}>
                        <Input.Password className="modern-input" prefix={<LockOutlined style={{color: '#FFB400'}}/>} placeholder="Enter Password" />
                    </Form.Item>

                    <div className="flex justify-between items-center mb-6">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="text-gray-300">Remember Me</Checkbox>
                        </Form.Item>
                        <Text className="text-yellow-500 cursor-pointer hover:underline" onClick={() => navigate('/forgot-password')}>
                            Forgot Password?
                        </Text>
                    </div>

                    <SocialLogin />

                    <Form.Item className="mt-6">
                        <CustomButton className="gold-button w-full" htmlType="submit" loading={loading} icon={<ArrowRightOutlined />}>
                            SIGN IN
                        </CustomButton>
                    </Form.Item>

                    <div className="text-center mt-5">
                        <Text className="text-gray-400">Chưa có tài khoản? </Text>
                        <Text className="text-yellow-500 cursor-pointer font-bold hover:underline" onClick={() => navigate('/register')}>
                            Đăng ký ngay
                        </Text>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AuthPage;