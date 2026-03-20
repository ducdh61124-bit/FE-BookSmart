import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CategoryChartProps {
    distribution: { name: string; value: number }[];
}

const COLORS = ['#d4af37', '#b8860b', '#daa520', '#ffd700', '#cfb53b'];

export const CategoryChart: React.FC<CategoryChartProps> = ({ distribution }) => {
    return (
        <Card title={<span className="font-bold text-lg">Phân bổ sách theo danh mục</span>} className="shadow-sm rounded-xl h-[500px]">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={distribution} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={80}
                        tick={{ fontSize: 11, fill: '#666' }}
                    />
                    <YAxis />
                    <Tooltip cursor={{ fill: '#f0f0f0' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {distribution?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};