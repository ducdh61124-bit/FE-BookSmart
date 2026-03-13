import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Row, Col, Divider } from 'antd';
import type { Book } from '../../../../1st_floor_dataAccess/api/endpoints/book.api';
import { ImageUpload } from '../../../components/shared/ImageUpload';

interface Props {
    open: boolean;
    editingBook: Book | null;
    onCancel: () => void;
    onSave: (values: any) => void;
    loading: boolean;
}

export const BookFormModal: React.FC<Props> = ({ open, editingBook, onCancel, onSave, loading }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
        if (editingBook) form.setFieldsValue(editingBook);
        else form.resetFields();
    }
    }, [open, editingBook, form]);

    return (
        <Modal
            title={editingBook ? "📚 Chỉnh sửa thông tin sách" : "Thêm sách mới vào kho"}
            open={open}
            onOk={() => form.submit()}
            onCancel={onCancel}
            confirmLoading={loading}
            width={600}
            okText="Lưu dữ liệu"
            cancelText="Đóng"
            centered
        >
        <Divider style={{ marginTop: '10px' }} />
        <Form form={form} layout="vertical" onFinish={onSave} initialValues={{ stock: 1, price: 1000 }}>
        <Row gutter={24}>
            {/* Cột trái: Upload ảnh */}
            <Col span={8}>
                <Form.Item
                    name="image"
                    label="Ảnh bìa"
                    rules={[{ required: true, message: 'Thiếu ảnh bìa!' }]}
                >
                <ImageUpload />
                </Form.Item>
            </Col>

            {/* Cột phải: Thông tin chữ */}
            <Col span={16}>
                <Form.Item name="title" label="Tên cuốn sách" rules={[{ required: true, message: 'Tên sách không được để trống!' }]}>
                    <Input placeholder="Nhập tên sách..." />
                </Form.Item>

                <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Ai là tác giả thế ông?' }]}>
                    <Input placeholder="Nhập tên tác giả..." />
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col span={12}>
                <Form.Item name="price" label="Giá bán (VNĐ)" rules={[{ required: true }]}>
                    <InputNumber
                        style={{ width: '100%' }}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="stock" label="Số lượng trong kho" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
            </Col>
        </Row>
        </Form>
        </Modal>
    );
};