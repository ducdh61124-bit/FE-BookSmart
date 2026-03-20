import React from 'react';
import { Card, List, Avatar, Typography, Tag } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ActivityListProps {
    activities: any[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
    return (
        <Card title={<span className="font-bold text-lg">Nhật ký hoạt động</span>} className="shadow-sm rounded-xl h-[500px]">
            <List
                itemLayout="horizontal"
                dataSource={activities}
                className="overflow-y-auto h-[400px] pr-2 custom-scrollbar"
                renderItem={(item: any) => (
                    <List.Item className="!px-0 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{ backgroundColor: item.action === 'DELETE' ? '#fff1f0' : '#f6ffed' }}
                                    icon={<HistoryOutlined style={{ color: item.action === 'DELETE' ? '#f5222d' : '#52c41a' }} />}
                                />
                            }
                            title={
                                <div className="flex justify-between items-center">
                                    <Text strong className="text-blue-600">@{item.performedBy}</Text>
                                    <Tag color={item.action === 'CREATE' ? 'green' : item.action === 'DELETE' ? 'red' : 'blue'}>
                                        {item.action}
                                    </Tag>
                                </div>
                            }
                            description={
                                <div className="flex flex-col">
                                    <Text className="text-xs text-gray-800">{item.entityName}</Text>
                                    <Text type="secondary" style={{ fontSize: '11px' }}>
                                        {new Date(item.timestamp).toLocaleTimeString('vi-VN')} - {new Date(item.timestamp).toLocaleDateString('vi-VN')}
                                    </Text>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};