import React from 'react';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Our Secondhand Marketplace</h1>
      <p>Discover unique treasures at affordable prices.</p>
      
      <div style={{ marginTop: '30px' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Explore Products
        </button>
      </div>
    </div>
  );
};

export default Home;
