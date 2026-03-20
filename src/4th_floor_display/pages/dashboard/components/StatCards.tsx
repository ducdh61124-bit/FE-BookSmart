import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { BookOutlined, FolderOutlined, UserOutlined, HistoryOutlined } from '@ant-design/icons';

interface StatCardsProps {
    data: {
        totalBooks: number;
        totalCategories: number;
        totalUsers: number;
        totalLogs: number;
    };
}

export const StatCards: React.FC<StatCardsProps> = ({ data }) => {
    const cards = [
        { title: 'Tổng đầu sách', value: data.totalBooks, icon: <BookOutlined />, color: '#d4af37', bg: '#fffbea' },
        { title: 'Danh mục', value: data.totalCategories, icon: <FolderOutlined />, color: '#b8860b', bg: '#fff7e6' },
        { title: 'Người dùng', value: data.totalUsers, icon: <UserOutlined />, color: '#1890ff', bg: '#e6f7ff' },
        { title: 'Lượt tác động', value: data.totalLogs, icon: <HistoryOutlined />, color: '#52c41a', bg: '#f6ffed' },
    ];

    return (
        <Row gutter={[20, 20]} className="mb-8">
            {cards.map((item, idx) => (
                // Dùng xl={6} thay vì lg={6} để thích ứng với cái Sidebar 380px
                <Col xs={24} sm={12} lg={12} xl={6} key={idx}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl" style={{ backgroundColor: item.bg }}>
                        <Statistic
                            title={<span className="text-gray-500 font-medium">{item.title}</span>}
                            value={item.value}
                            valueStyle={{ color: item.color, fontWeight: 800, fontSize: '28px' }}
                            prefix={React.cloneElement(item.icon as React.ReactElement, { className: "mr-2" })}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};