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
                if (onChange) onChange(url);
            });
        }
    };

    return (
        <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChange}
        >
        {value ? (
            <img src={value} referrerPolicy="no-referrer" alt="cover" className="w-full h-full object-cover rounded-lg p-1" />
        ) : (
            <div className="flex flex-col items-center">
                {loading ? <LoadingOutlined className="text-blue-500" /> : <PlusOutlined className="text-gray-400 text-lg" />}
                <div className="mt-2 text-gray-500 font-medium">Ảnh bìa</div>
            </div>
        )}
        </Upload>
    );
};