import React, { useEffect } from 'react';
import { Modal, Form, Input, Switch } from 'antd';
import type { Category } from '../../../../../5th_floor_core/core/types/category.type';

interface CategoryFormModalProps {
    open: boolean;
    loading: boolean;
    editingCategory: Category | null;
    onCancel: () => void;
    onSave: (values: any) => void;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
    open,
    loading,
    editingCategory,
    onCancel,
    onSave,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (editingCategory) {
                form.setFieldsValue(editingCategory);
            } else {
                form.resetFields();
            }
        }
    }, [open, editingCategory, form]);

    return (
        <Modal
            title={editingCategory ? "Chỉnh sửa Danh mục" : "Thêm Danh mục mới"}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading}
            okText="Lưu lại"
            cancelText="Hủy bỏ"
            okButtonProps={{ className: "bg-blue-600" }}
        >
            <Form form={form} layout="vertical" onFinish={onSave}>
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
                >
                    <Input placeholder="Ví dụ: Tiểu thuyết, Khoa học..." />
                </Form.Item>

                <Form.Item name="description" label="Mô tả chi tiết">
                    <Input.TextArea rows={4} placeholder="Nhập mô tả ngắn gọn cho danh mục này..." />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Trạng thái hiển thị"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch checkedChildren="Hoạt động" unCheckedChildren="Tạm ẩn" />
                </Form.Item>
            </Form>
        </Modal>
    );
};