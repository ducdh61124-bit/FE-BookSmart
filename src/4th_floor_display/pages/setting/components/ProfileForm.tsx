import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface ProfileFormProps {
    initialValues: any;
    onUpdate: (values: any) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues, onUpdate }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    return (
        <Form layout="vertical" form={form} onFinish={onUpdate} size="large">
            <Row gutter={32}>

                <Col xs={24} md={12}>
                    <Title level={5} className="text-gray-600 mb-4">Thông tin cá nhân</Title>

                    <Form.Item label="Họ và tên hiển thị" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input placeholder="Nhập họ và tên..." />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone">
                        <Input placeholder="Nhập số điện thoại..." />
                    </Form.Item>

                    <Form.Item
                        label="Email liên kết"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Email!' },
                            { type: 'email', message: 'Sai định dạng Email!' }
                        ]}
                    >
                        <Input placeholder="Nhập email..." />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Title level={5} className="text-gray-600 mb-4">Đổi mật khẩu (Tùy chọn)</Title>

                    <Form.Item label="Mật khẩu cũ" name="oldPassword">
                        <Input.Password placeholder="Nhập mật khẩu hiện tại..." />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới..." />
                    </Form.Item>

                    <Form.Item
                        label="Nhập lại mật khẩu mới"
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value && !getFieldValue('newPassword')) {
                                        return Promise.resolve();
                                    }
                                    if (getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                                },
                            })
                        ]}
                    >
                        <Input.Password placeholder="Xác nhận mật khẩu mới..." />
                    </Form.Item>
                </Col>
            </Row>

            <Divider className="my-4" />

            <Form.Item className="text-right mb-0">
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} className="bg-blue-600 px-8">
                    Lưu thay đổi
                </Button>
            </Form.Item>
        </Form>
    );
};