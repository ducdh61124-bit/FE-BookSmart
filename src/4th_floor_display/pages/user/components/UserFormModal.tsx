import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

interface Props {
    open: boolean;
    editingUser: any | null;
    onCancel: () => void;
    onSave: (values: any) => void;
    loading: boolean;
}

export const UserFormModal: React.FC<Props> = ({ open, editingUser, onCancel, onSave, loading }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingUser) form.setFieldsValue(editingUser);
            else form.resetFields();
        }
    }, [open, editingUser, form]);

    return (
        <Modal
            title={<span className="text-blue-600 font-bold">👤 Thông tin người dùng</span>}
            open={open}
            onOk={() => form.submit()}
            onCancel={onCancel}
            confirmLoading={loading}
            okText="Lưu thông tin"
        >
            <Form form={form} layout="vertical" onFinish={onSave}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
                            <Input placeholder="Nguyễn Văn A" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]}>
                            <Input placeholder="admin123" disabled={!!editingUser} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input placeholder="example@gmail.com" />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                    <Input placeholder="09xxxxxxx" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: !editingUser, message: 'Vui lòng nhập mật khẩu' }]}
                >
                    <Input.Password placeholder={editingUser ? "(Để trống nếu không đổi)" : "Nhập mật khẩu mới"} />
                </Form.Item>
            </Form>
        </Modal>
    );
};