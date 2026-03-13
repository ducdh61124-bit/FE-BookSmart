export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}

// Cấu trúc phân trang
export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

// Dùng cho API trả về danh sách có phân trang
export interface PaginatedResponse<T> {
    items: T[];
    pagination: Pagination;
}

// Cấu trúc chuẩn khi gửi params lên API để tìm kiếm/lọc
export interface FilterParams {
    keyword?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}