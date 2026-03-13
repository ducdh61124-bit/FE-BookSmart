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
            title={<span className="text-lg font-bold text-blue-600">📚 Quản lý thông tin sách</span>}
            open={open}
            onOk={() => form.submit()}
            onCancel={onCancel}
            confirmLoading={loading}
            width={650}
            className="rounded-2xl"
            okText="Lưu dữ liệu"
            cancelText="Hủy bỏ"
            centered
        >
            <Divider className="my-4" />
            <Form form={form} layout="vertical" onFinish={onSave}>
                <Row gutter={24}>
                    <Col span={8} className="flex flex-col items-center">
                        <Form.Item name="image" label={<span className="font-semibold">Ảnh bìa</span>} rules={[{ required: true }]}>
                            <ImageUpload />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item name="title" label={<span className="font-semibold">Tên cuốn sách</span>} rules={[{ required: true }]}>
                            <Input placeholder="Ví dụ: Đắc Nhân Tâm..." className="h-10 rounded-md" />
                        </Form.Item>
                        <Form.Item name="author" label={<span className="font-semibold">Tác giả</span>} rules={[{ required: true }]}>
                            <Input placeholder="Nhập tên tác giả..." className="h-10 rounded-md" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="price" label={<span className="font-semibold">Giá bán (VNĐ)</span>}>
                            <InputNumber className="w-full h-10 leading-10 rounded-md" min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="stock" label={<span className="font-semibold">Tồn kho</span>}>
                            <InputNumber className="w-full h-10 leading-10 rounded-md" min={0} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}