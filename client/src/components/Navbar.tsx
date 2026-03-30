import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar flex justify-between p-4 bg-gray-800 text-white">
            <div className="logo">
                <Link to="/" className="font-bold text-xl">SECONDHAND</Link>
            </div>
            <ul className="flex gap-4">
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
