import React from 'react';
import { Space } from 'antd';
import { FacebookOutlined, TwitterOutlined, GooglePlusOutlined } from '@ant-design/icons';

export const SocialLogin: React.FC = () => {
  const iconStyle = {
    fontSize: '24px',
    color: '#fff',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '8px',
    borderRadius: '8px'
  };

  return (
    <Space size="large" style={{ width: '100%', justifyContent: 'center', marginBottom: '20px' }}>
      <FacebookOutlined style={iconStyle} />
      <TwitterOutlined style={iconStyle} />
      <GooglePlusOutlined style={iconStyle} />
    </Space>
  );
};