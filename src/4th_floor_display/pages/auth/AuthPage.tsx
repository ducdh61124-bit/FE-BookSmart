import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../3rd_floor_stateManagement/hooks/useAuth';
import { CustomButton } from '../../components/shared/CustomButton';
import { SocialLogin } from './components/SocialLogin';
import { Link } from 'react-router-dom';
import { authStyles } from '../../layouts/AuthLayout';

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

            if (success) {
                message.success('Đăng nhập thành công! Đang chuyển hướng...');
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
<>
            <Title level={2} className={authStyles.title}>LOGIN NOW</Title>
            <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{ remember: false }}>
                <Form.Item name="username" rules={[{ required: true, message: 'Nhập Username!' }]}>
                    <Input className={authStyles.input} prefix={<UserOutlined className="text-[#FFB400]"/>} placeholder="Enter your E-mail" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'Nhập Password!' }]}>
                    <Input.Password className={authStyles.input} prefix={<LockOutlined className="text-[#FFB400]"/>} placeholder="Enter Password" />
                </Form.Item>

                <div className="flex justify-between items-center mb-6">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="!text-white/60">Remember Me</Checkbox>
                    </Form.Item>
                    <span className={authStyles.link} onClick={() => navigate('/forgot-password')}>
                        Forgot Password?
                    </span>
                </div>

                <Form.Item>
                    <CustomButton className={authStyles.goldBtn} htmlType="submit" loading={loading} icon={<ArrowRightOutlined />}>
                        SIGN IN
                    </CustomButton>
                </Form.Item>

                <div className="mt-5">
                    <span className="text-white/60">Chưa có tài khoản? </span>
                    <Text className="!text-[#FFB400] cursor-pointer font-bold hover:underline" onClick={() => navigate('/register')}>Đăng ký ngay</Text>
                </div>
            </Form>
        </>
    );
};

export default AuthPage;