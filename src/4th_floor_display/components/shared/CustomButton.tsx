import { Button, type ButtonProps } from 'antd';
import React from 'react';

export const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            {...props}
            style={{
                borderRadius: '25px',
                height: '45px',
                fontWeight: 'bold',
                ...props.style
            }}
        >
        {children}
        </Button>
    );
};