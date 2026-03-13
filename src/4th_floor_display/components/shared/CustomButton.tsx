import { Button, type ButtonProps } from 'antd';
import React from 'react';

export const CustomButton: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <Button
            {...props}
            className={`rounded-full h-11 font-bold shadow-sm transition-all active:scale-95 ${className || ''}`}
        >
            {children}
        </Button>
    );
};