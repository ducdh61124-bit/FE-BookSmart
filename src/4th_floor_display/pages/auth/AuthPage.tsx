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

    // useEffect lấy email đã lưu (Remember Me)
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            form.setFieldsValue({ username: savedEmail, remember: true });
        }
    }, [form]);

    // Hàm xử lý submit form
    const onFinish = async (values: any) => {
        try {
            const success = await loginUser(values);
            if (success) {
                if (values.remember) {
                    localStorage.setItem('rememberedEmail', values.username);
                } else {
                    localStorage.removeItem('rememberedEmail'); // Xóa nếu không tích
                }

                message.success('Đăng nhập thành công!');
                navigate('/books');
            }
        } catch (err: any) { message.error(err.message); }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <Title level={2} className="auth-title">LOGIN NOW</Title>

                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ remember: false }} // Mặc định không tích Remember Me
                >
                    <Form.Item name="username" rules={[{ required: true, message: 'Nhập E-mail!' }]}>
                        <Input className="modern-input" prefix={<UserOutlined style={{color: '#FFB400'}}/>} placeholder="Enter your E-mail" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Nhập Password!' }]}>
                        <Input.Password className="modern-input" prefix={<LockOutlined style={{color: '#FFB400'}}/>} placeholder="Enter Password" />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems: 'center' }}>
                        {/* FIX 1: Wrap Checkbox vào Form.Item để lấy được giá trị true/false */}
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{ color: '#ccc' }}>Remember Me</Checkbox>
                        </Form.Item>

                        {/* FIX 2: Thêm sự kiện onClick cho Forgot Password */}
                        <Text
                            style={{ color: '#FFB400', cursor: 'pointer' }}
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot Password?
                        </Text>
                    </div>

                    <SocialLogin />

                    <Form.Item style={{ marginBottom: 0 }}>
                        <CustomButton className="gold-button" htmlType="submit" loading={loading} block icon={<ArrowRightOutlined />}>
                            SIGN IN
                        </CustomButton>
                    </Form.Item>

                    {/* FIX 3: Thêm sự kiện onClick cho Nút Đăng ký */}
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Text style={{ color: '#ccc' }}>Chưa có tài khoản? </Text>
                        <Text
                            style={{ color: '#FFB400', cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => navigate('/register')}
                        >
                            Đăng ký ngay
                        </Text>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AuthPage;