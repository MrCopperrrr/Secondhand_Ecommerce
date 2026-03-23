# Secondhand Ecommerce Platform

Chào mừng bạn đến với dự án thương mại điện tử chuyên đồ cũ. Dự án được xây dựng với cấu trúc chuyên nghiệp, thực tế nhất dành cho Fullstack application (MERN Stack).

## Cấu Trúc Dự Án (Project Structure)

Dự án được chia thành 2 phần chính: `client` (Frontend) và `server` (Backend).

### 1. Server (Node.js & Express)
- `src/config/`: Lưu cấu hình hệ thống, kết nối DB (MongoDB), biến môi trường.
- `src/controllers/`: Xử lý logic nghiệp vụ cho từng feature (Product, Order, User).
- `src/middleware/`: Các bộ lọc (Authorization, Error Handling, Logging).
- `src/models/`: Định nghĩa lược đồ dữ liệu (Schemas) dùng Mongoose.
- `src/routes/`: Quản lý các điểm cuối (Endpoints) của API.
- `src/services/`: (Optional) Xử lý logic phức tạp hơn như tích hợp Payment, Email.
- `src/utils/`: Các hàm tiện ích dùng chung (Generate tokens, Formatters).
- `index.js`: Điểm bắt đầu của ứng dụng Backend.

### 2. Client (React & Vite)
- `src/assets/`: Hình ảnh, icons, font chữ và global CSS.
- `src/components/`: Các UI components nhỏ tái sử dụng (Button, Card, Input).
- `src/layouts/`: Các khung giao diện chung (Header + Footer + Content area).
- `src/pages/`: Các trang chính của ứng dụng (Home, Product details, Cart, Profile).
- `src/hooks/`: Các custom hooks xử lý logic frontend (useAuth, useCart).
- `src/context/`: Quản lý trạng thái toàn cục (State Management) thông qua React Context API.
- `src/services/`: Nơi thực hiện các API calls (sử dụng Axios).
- `src/utils/`: Các hằng số (constants) và hàm trợ giúp phía client.

##  Công Nghệ Sử Dụng (Tech Stack)

- **Frontend:** React, Vite, React Router, Tailwind CSS, Axios.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt.

##  Bắt Đầu (Getting Started)

### Cài đặt Server:
```bash
cd server
npm install
npm run dev
```

### Cài đặt Client:
```bash
cd client
npm install
npm run dev
```

---
