import React from 'react';
import { Typography, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface DangerZoneProps {
    onDelete: () => void;
}

export const DangerZone: React.FC<DangerZoneProps> = ({ onDelete }) => {
    return (
        <div className="bg-red-50 p-4 rounded-lg flex justify-between items-center border border-red-100">
            <div>
                <Title level={5} className="!text-red-600 !mb-0">Xóa tài khoản</Title>
                <Text className="text-red-400 text-sm">Hành động này sẽ xóa toàn bộ dữ liệu và không thể khôi phục.</Text>
            </div>

            <Popconfirm
                title="Xóa tài khoản vĩnh viễn?"
                description="Bạn có chắc chắn muốn rời bỏ hệ thống không?"
                onConfirm={onDelete}
                okText="Xóa ngay"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
                placement="topLeft"
            >
                <Button danger type="primary" icon={<DeleteOutlined />}>
                    Xóa tài khoản
                </Button>
            </Popconfirm>
        </div>
    );
};