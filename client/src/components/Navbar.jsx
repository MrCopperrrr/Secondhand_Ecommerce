import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#333', color: '#fff' }}>
            <div className="logo">
                <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>SECONDHAND</Link>
            </div>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0 }}>
                <li><Link to="/products" style={{ color: '#fff' }}>Products</Link></li>
                <li><Link to="/cart" style={{ color: '#fff' }}>Cart</Link></li>
                <li><Link to="/login" style={{ color: '#fff' }}>Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
