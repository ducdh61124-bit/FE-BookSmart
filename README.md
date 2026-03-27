# Project Book Management 


## Cấu trúc 5 tầng: 

- src/1st_floor_dataAccess: Truy cập dữ liệu qua API, chỉ quan tâm lấy dữ liệu về hoặc gửi dữ liệu thô đi.
- src/2nd_floor_professionalSkill: Chuyên nhào nặn dữ liệu. VD: Backend gửi 1 số lượng dữ liệu, tầng này sẽ kiểm tra lại xem user có quyền làm việc này không trước khi vứt lên giao diện.
- src/3rd_floor_stateManagement: Nơi lưu trữ bộ nhớ ứng dụng.
- src/4th_floor_display: Nhận dữ liệu đã được xử lý và hiển thi ra màn hình.
- src/5th_floor_core: Chứa các công cụ, kiểu dữ liệu, hằng số,.. được xài ở 4 tầng 

## Chức năng:

- Đăng nhập, đăng ký, quên mật khẩu.
- Xem, thêm, sửa, xóa sách.
- Tìm kiếm theo tên sách.
- Tìm kiếm sách theo tác giả, thể loại.
- Sắp xếp sách theo tên sách, tồn kho và giá tiền
- Xem, thêm, sửa, xóa thể loại.
- Xem, sửa danh sách người dùng
- Tự xóa người dùng
- Lịch sử log
- Thống kê

## Setup môi trường FE

- **Công nghệ dự án:** 

    - **Vite + React + TypeScript *(package.json)***
    - **UI:** Ant Design, chart: Recharts
    - **HTTP:** Axios
    - **state:** Redux Toolkit + React-Redux
    - **styling:** TailwindCSS.

- **Yêu cầu môi trường:**
    
    - **Node.js:** dự án chạy tốt với Node hiện tại đang dùng trong môi trường kiểm tra là v24.11.0.

    - **Package manager:** dự án đang cấu hình script theo chuẩn npm.

- **Cài đặt dependencies:** ` npm install `

- **Scripts chính:** `npm run dev` *(chạy development)*

## Component đơn giản 

- **Mapping theo kiến trúc dự án *(để thao tác component/feature tương đương)*:**

    - **Component dùng chung:** `src/4th_floor_display/components/shared/` *(ví dụ: CustomButton.tsx, ImageUpload.tsx)*.

    - **Feature theo nghĩa module trang:** `src/4th_floor_display/pages/*` *(auth/books/category/user/history/dashboard/setting)*.

- **Kết quả đọc rà soát mẫu:**

    - `CustomButton.tsx`: wrapper antd/Button nhằm đồng bộ style UI.

    - `AuthPage.tsx`: form login + “remember email” + gọi hook useAuth.

    - `BookPage.tsx`: hiển thị danh sách sách + modal CRUD + search local.

### Tổ chức Redux store, actions, reducers

- **Store:** `src/3rd_floor_stateManagement/redux/store.ts`

    - `configureStore` với 4 slice reducers: `auth`, `book`, `category`, `user`.

    - Có type `RootState`, `AppDispatch` phục vụ typing.

- **Typed hooks chuẩn RTK/React-Redux:** `src/3rd_floor_stateManagement/redux/hooks.ts`

    - Dùng API `.withTypes<>()` cho `useDispatch/useSelector`.

- **Slices (actions + reducers):** `src/3rd_floor_stateManagement/redux/slices/*.ts`

    - `authSlice.ts`: quản lý `user`, `isAuthenticated`; actions `setCredentials`, `logout`.

    - `bookSlice.ts`: quản lý `books`, `loading`; có reducers thêm/sửa/xóa, nhưng hiện export actions đang giới hạn ở `setBooks`, `setLoading`.

- **Hooks thao tác nghiệp vụ trên state:** `src/3rd_floor_stateManagement/hooks/*`

    - Ví dụ `useAuth.ts`: gọi `authService`, dispatch `setCredentials`, lưu token/user vào localStorage.

    - Ví dụ `useBooks.ts`: fetch qua service rồi dispatch vào slice.

## Gọi API

- **Vị trí tương đương trong dự án:**

    - **API layer:** `src/1st_floor_dataAccess/api/`

        - **`axiosClient.ts`:** tạo axios instance, interceptors request/response.

        - **`endpoints/*.api.ts`:** gom các hàm gọi API theo domain *(auth/book/category/user/history/dashboard)*.

    - **Config/Constants:**

        - **`src/5th_floor_core/core/config/env.config.ts`:** đọc VITE_API_BASE_URL và fallback.

        - **`src/5th_floor_core/core/constants/app.constant.ts`:** `API_BASE_URL` và cấu hình mặc định.

- **Cách gọi API thực tế:**

    - UI/Hook → **Service layer** *(2nd_floor_professionalSkill/services/*)* → **Endpoint layer** *(1st_floor_dataAccess/api/endpoints/*)* → **axiosClient**.


