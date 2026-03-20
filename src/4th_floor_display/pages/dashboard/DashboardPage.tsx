import React, { useEffect, useState } from 'react';
import { Spin, Typography, Tag, Row, Col } from 'antd';
import { RiseOutlined } from '@ant-design/icons';
import { dashboardService } from '../../../2nd_floor_professionalSkill/services/dashboardService';

import { StatCards } from './components/StatCards';
import { CategoryChart } from './components/CategoryChart';
import { ActivityList } from './components/ActivityList';

const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardService.fetchStats().then(res => {
            setData(res);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="h-full flex justify-center items-center"><Spin size="large" tip="Đang tải số liệu..." /></div>;
    }

    if (!data) return <div>Không có dữ liệu</div>;

    return (
        <div className="p-2 sm:p-6 bg-[#f8f9fa] min-h-full overflow-y-auto">
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <Title level={2} className="!mb-1">Thống kê hiệu sách của hệ thống hôm nay!</Title>
                </div>
                <Tag color="gold" icon={<RiseOutlined />} className="px-4 py-1 text-base font-medium rounded-full">
                    Hệ thống ổn định
                </Tag>
            </div>

            <StatCards data={data} />

            <Row gutter={[20, 20]}>
                <Col xs={24} xl={16}>
                    <CategoryChart distribution={data.categoryDistribution} />
                </Col>

                <Col xs={24} xl={8}>
                    <ActivityList activities={data.recentActivities} />
                </Col>
            </Row>
        </div>
    );
};

export default DashboardPage;