import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Placeholder Navbar */}
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          <h1 style={{ margin: 0 }}>Secondhand Shop</h1>
        </nav>
        
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
