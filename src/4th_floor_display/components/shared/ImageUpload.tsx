import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';

interface Props {
    value?: string; // Nhận giá trị string từ Form (Base64)
    onChange?: (imageUrl: string) => void; // Đẩy giá trị về Form
}

// Component upload ảnh
export const ImageUpload: React.FC<Props> = ({ value, onChange }) => {
    const [loading, setLoading] = useState(false);

    // 1. Hàm biến file ảnh thành chuỗi Base64
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    // 2️. Hàm xử lý khi người dùng upload ảnh
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.originFileObj) {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                if (onChange) onChange(url); // Cập nhật chuỗi Base64 vào Form
            });
        }
    };

    return (
        <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={(file) => {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) message.error('Vui lòng upload file JPG/PNG thôi!');
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) message.error('Ảnh phải nhỏ hơn 2MB nhé!');
                return isJpgOrPng && isLt2M;
            }}
            onChange={handleChange}
        >
        {value ? (
            <img src={value} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        ) : (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Ảnh bìa</div>
            </div>
        )}
        </Upload>
    );
};