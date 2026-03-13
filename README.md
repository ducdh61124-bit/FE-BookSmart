# Project Book Management Tuần 2 (React + TypeScript + Ant Design + TailwindCSS)

Tài liệu này tổng hợp rõ ràng những gì đã học và đã làm trong project, các lỗi thường gặp khi làm bài, và cách khắc phục.

## Cấu trúc 5 tầng: 

- src/1st_floor_dataAccess: Truy cập dữ liệu qua API, chỉ quan tâm lấy dữ liệu về hoặc gửi dữ liệu thô đi.
- src/2nd_floor_professionalSkill: Chuyên nhào nặn dữ liệu. VD: Backend gửi 1 số lượng dữ liệu, tầng này sẽ kiểm tra lại xem user có quyền làm việc này không trước khi vứt lên giao diện.
- src/3rd_floor_stateManagement: Nơi lưu trữ bộ nhớ ứng dụng.
- src/4th_floor_display: Nhận dữ liệu đã được xử lý và hiển thi ra màn hình.
- src/5th_floor_core: Chứa các công cụ, kiểu dữ liệu, hằng số,.. được xài ở 4 tầng 

## Chức năng:

- Đăng nhập, đăng ký.
- Xem, thêm, sửa, xóa sách.
- Tìm kiếm theo tên sách.
- Tìm kiếm sách theo tác giả, thể loại.
- Sắp xếp sách theo tên sách, tồn kho và giá tiền

## Vấn đề phát sinh & cách xử lý

Trong quá trình thực hiện, hệ thống gặp một số lỗi đặc thù do sự thay đổi phiên bản công nghệ:

- **Xung đột phiên bản** *(Vite 7 & RTK 2.0)*: 

    - **Vấn đề:** Lỗi SyntaxError khi import các kiểu dữ liệu *(PayloadAction, TypedUseSelectorHook)*.

    - **Xử lý:** Đã nghiên cứu và áp dụng cú pháp import type và phương thức `.withTypes<RootState>()` mới nhất của năm 2026 để đảm bảo tính chặt chẽ của TypeScript.

- **Chuyển đổi thư viện State Management:**

    - **Vấn đề:** Gặp lỗi is not a function và undefined khi chuyển đổi từ Zustand sang Redux Toolkit do sự khác biệt về cách dispatch action và quản lý middleware.

    - **Xử lý:** Đã tái cấu trúc lại toàn bộ "Tầng 3" *(State Management)*, tách biệt rõ ràng giữa Hook điều hướng và Slice lưu trữ dữ liệu.

- **Trải nghiệm người dùng (UI/UX):** 

    - **Vấn đề:** Layout bị co rút *(shrinking)* khi bảng dữ liệu có ít bản ghi *(khi Filter)*, gây mất thẩm mỹ.

    - **Xử lý:** Sử dụng kỹ thuật Dynamic Calculation *(calc(100vh - 140px))* kết hợp Flexbox để ép chiều cao tối thiểu cho khung giao diện, đảm bảo tính ổn định của layout.

- ***Bảo mật SQL (Safe Update Mode):** 

    - **Vấn đề:** Không thể thực hiện lệnh `DELETE` trên MySQL Workbench do chế độ an toàn chặn các truy vấn không sử dụng Primary Key.

    - **Xử lý:** Đã sử dụng `SET SQL_SAFE_UPDATES = 0` để xử lý tạm thời và cấu hình lại Preferences để tối ưu quy trình thao tác dữ liệu mẫu.

- **Kết nối API tính năng Quên mật khẩu (Forgot Password):**

    - **Vấn đề:** Đã hoàn thiện giao diện (UI) cho trang khôi phục mật khẩu. Tuy nhiên, luồng gửi yêu cầu từ Frontend chưa kết nối được với API Backend. Khi thực hiện gửi Email, hệ thống chưa trả về phản hồi hoặc gặp lỗi kết nối (Connection Refused).

    - **Xử lý** Chưa xử lý xong.

    - **Lý do** Đang gặp khó khăn trong việc xác định chính xác cấu trúc dữ liệu mà API yêu cầu (Payload) và chưa cấu hình xong SMTP/Mail Service ở phía Server để kiểm thử luồng gửi mail thực tế.
 
## Kết quả đạt được
Kết thúc tuần làm việc thứ 02, dự án Book Management System đã đạt được các cột mốc quan trọng sau:

### Về Hệ thống & Kiến trúc
- Hoàn thiện cấu trúc 5 tầng (5-Layer Architecture): Tổ chức mã nguồn khoa học, tách biệt rõ ràng giữa logic nghiệp vụ (Services), quản lý trạng thái (Redux) và giao diện (UI).

- Chuyển đổi thành công sang Redux Toolkit: Thiết lập Store tập trung cho toàn bộ ứng dụng, giúp quản lý thông tin người dùng và danh sách sách một cách đồng bộ, dễ dàng mở rộng.

### Về Tính năng (Features)
- Hệ thống xác thực (Authentication): Hoàn thiện luồng Đăng nhập và Đăng xuất. Tích hợp cơ chế bảo vệ Route (Protected Routes), ngăn chặn người dùng chưa đăng nhập truy cập vào trang quản trị.

- Quản lý Kho sách (CRUD Operations):

  - Hiển thị danh sách sách từ API với tốc độ xử lý nhanh.

  - Xây dựng tính năng Tìm kiếm thông minh: Lọc dữ liệu theo tên sách và tác giả với độ trễ cực thấp (gần như tức thì).

  - Hoàn thiện cơ chế tương tác dữ liệu: Thêm, Sửa, Xóa sách thông qua Modal và thông báo (Message) trực quan.

### Về Giao diện & Trải nghiệm (UI/UX)
- Layout chuyên nghiệp: Sử dụng Ant Design kết hợp Tailwind CSS xây dựng Dashboard chuẩn doanh nghiệp, ổn định về mặt hiển thị (không bị co rút giao diện khi dữ liệu thay đổi).

- Tính ổn định cao: Hệ thống xử lý tốt các trạng thái chờ (Loading) và thông báo lỗi từ Backend, mang lại cảm giác tin cậy cho người dùng.

