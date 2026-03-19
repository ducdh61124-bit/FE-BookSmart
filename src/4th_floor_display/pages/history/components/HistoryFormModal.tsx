import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import type { HistoryLog } from '../../../../5th_floor_core/core/types/history.type';

interface HistoryFormModalProps {
    visible: boolean;
    onClose: () => void;
    log: HistoryLog | null;
}

const HistoryFormModal: React.FC<HistoryFormModalProps> = ({ visible, onClose, log }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (log && visible) {
            form.setFieldsValue({
                ...log,
                timestamp: new Date(log.timestamp).toLocaleString('vi-VN'),
            });
        }
    }, [log, visible, form]);

    return (
        <Modal
            title="Chi tiết Lịch sử Hệ thống"
            open={visible}
            onCancel={onClose}
            footer={null}
            destroyOnHidden
            centered
        >
            <Form form={form} layout="vertical" disabled>
                <div className="flex gap-4">
                    <Form.Item label="Người thực hiện" name="performedBy" className="w-1/2">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Thời gian" name="timestamp" className="w-1/2">
                        <Input />
                    </Form.Item>
                </div>

                <div className="flex gap-4">
                    <Form.Item label="Hành động" name="action" className="w-1/2">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phân hệ" name="entityType" className="w-1/2">
                        <Input />
                    </Form.Item>
                </div>

                <Form.Item label="Đối tượng tác động" name="entityName">
                    <Input />
                </Form.Item>

                <Form.Item label="Chi tiết bổ sung" name="details">
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default HistoryFormModal;