# Uni2hand

**A peer-to-peer secondhand marketplace dedicated to university students.**

Uni2hand is a production-ready ecommerce platform built with the **MERN Stack** and **TypeScript**. It's designed specifically for campus communities to trade pre-owned items safely and sustainably among fellow students, excluding external commerce.

<div align="center">

[![Project Status: Active](https://img.shields.io/badge/Project%20Status-Active-brightgreen.svg)](https://github.com/MrCopperrrr/Secondhand_Ecommerce)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>


## Core Features

This platform is a complete ecosystem for buyers, sellers, and administrators, featuring:

### User Management & Authentication
- **Secure Authentication:** Full login, registration, and password recovery flow.
- **Data Security:** Implemented using JWT (JSON Web Tokens) and Bcrypt for password hashing.
- **User Profiles:** Personalized profiles with customizable avatars and activity tracking.

### Marketplace & Personalization
- **Shopping Experience:** Intuitive product browsing with advanced search and filtering.
- **Seller Empowerment:** Users can become sellers, listing items and managing their own personalized shops.
- **Seller Dashboard:** Tools for inventory management and sales performance tracking.

### Cart & Transactions
- **Unified Checkout:** A streamlined, multi-step checkout process with a dynamic shopping cart.
- **Order Tracking:** Real-time transaction history and shipment status updates.

### Communication & Support
- **In-App Messaging:** Direct messaging between buyers and sellers to facilitate product inquiries.
- **Resolution Center:** A built-in dispute management system to handle and resolve issues transparently.

### User Interface & Experience
- **Modern Design:** Built with **Tailwind CSS** and **Radix UI** for a high-quality look and feel.
- **Fluid Interactions:** Integrated with **Framer Motion** for smooth, meaningful animations.
- **Responsive Layout:** fully optimized for mobile, tablet, and desktop environments.

## Tech Stack

### Frontend
- **Framework:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Context API & Hooks
- **Animation:** [Framer Motion](https://www.framer.com/motion/)

### Backend
- **Framework:** [Express.js](https://expressjs.com/)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (TSX/Nodemon for development)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Security:** JWT Authentication, Bcryptjs encryption, Express Validator


## Project Structure

```bash
Secondhand_Ecommerce
 ┣ client                     # Frontend Project (Vite + React)
 ┃ ┣ src
 ┃ ┃ ┣ components             # Main UI primitives and shared components
 ┃ ┃ ┣ layouts                # Page structures (Header, Footer, Sidebar)
 ┃ ┃ ┣ pages                  # Feature-specific pages (Auth, Shop, Profile, etc.)
 ┃ ┃ ┣ hooks                  # Custom React hooks logic
 ┃ ┃ ┣ context                # Global application state management
 ┃ ┃ ┗ services               # Axios instances and API definitions
 ┃ ┗ package.json
 ┣ server                     # Backend APIs (Node.js + Express)
 ┃ ┣ src
 ┃ ┃ ┣ config                 # Database connection and system env setup
 ┃ ┃ ┣ controllers            # Business logic and Request/Response handling
 ┃ ┃ ┣ models                 # Data schemas and TypeScript interfaces
 ┃ ┃ ┣ routes                 # API endpoint route definitions
 ┃ ┃ ┣ middleware             # Auth guards, Error parsers, Loggers
 ┃ ┃ ┗ utils                  # Shared utility functions
 ┃ ┣ index.ts                 # Server entry point
 ┃ ┗ package.json
 ┗ LICENSE                    # MIT Open-source license
```


## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/MrCopperrrr/Secondhand_Ecommerce.git
cd Secondhand_Ecommerce
```

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file based on .env.example
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Environment Variables

Ensure your `server/.env` is configured correctly:

- `PORT`: Backend server port (default: 4000)
- `DB_USERNAME`: Database user
- `DB_PASSWORD`: Database user password
- `DB_NAME`: MongoDB database name
- `JWT_SECRET`: Secret key for token signing
- `NODE_ENV`: Application environment (development/production)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.


## License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute as needed.


**If you find this project useful, please consider giving it a star!**
