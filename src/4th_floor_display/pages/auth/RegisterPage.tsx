import React from 'react';
import { Form, Input, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, IdcardOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../3rd_floor_stateManagement/hooks/useAuth';
import { CustomButton } from '../../components/shared/CustomButton';
import { authStyles } from '../../layouts/AuthLayout';

const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { registerUser, loading } = useAuth();
    const onFinish = async (values: any) => {
        try {
            const { confirm, ...submitData } = values;
            const success = await registerUser(submitData);
            if (success) {
                message.success('Đăng ký thành công! Hãy đăng nhập.');
                navigate('/login');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message
                                          || err.response?.data
                                          || 'Đăng ký thất bại! Vui lòng thử lại.';
            message.error(err.message || 'Tên đăng nhập hoặc Email đã tồn tại!');
        }
    };

    return (
        <>
            <Title level={2} className={authStyles.title}>
                <ArrowLeftOutlined className="absolute left-8 cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate('/login')} />
                ĐĂNG KÝ
            </Title>

            <Form onFinish={onFinish} layout="vertical" size="large">
                <Form.Item name="name" rules={[{ required: true, message: 'Nhập họ và tên!' }]}>
                    <Input className={authStyles.input} prefix={<IdcardOutlined className="text-[#FFB400]"/>} placeholder="Họ và tên" />
                </Form.Item>

                <Form.Item name="username" rules={[{ required: true, message: 'Nhập tên đăng nhập!' }]}>
                    <Input className={authStyles.input} prefix={<UserOutlined className="text-[#FFB400]"/>} placeholder="Tên đăng nhập" />
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input className={authStyles.input} prefix={<MailOutlined className="text-[#FFB400]"/>} placeholder="Địa chỉ Email" />
                </Form.Item>

                <Form.Item name="phone" rules={[{ required: true }]}>
                    <Input className={authStyles.input} prefix={<PhoneOutlined className="text-[#FFB400]"/>} placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password className={authStyles.input} prefix={<LockOutlined className="text-[#FFB400]"/>} placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item name="confirm" dependencies={['password']} rules={[{ required: true }, ({ getFieldValue }) => ({
                    validator(_, value) { return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('Mật khẩu không khớp!')); }
                })]}>
                    <Input.Password className={authStyles.input} prefix={<LockOutlined className="text-[#FFB400]"/>} placeholder="Xác nhận mật khẩu" />
                </Form.Item>

                <CustomButton className={authStyles.goldBtn} htmlType="submit" loading={loading}>
                    TẠO TÀI KHOẢN
                </CustomButton>
            </Form>
        </>
    );
};

export default RegisterPage;