import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard1 from './components/Dashboard1';
import Dashboard2 from './components/Dashboard2';
import './styles.css';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Today's Sales</Link></li>
          <li><Link to="/comparison">Sales Comparison</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard1 />} />
        <Route path="/comparison" element={<Dashboard2 />} />
      </Routes>
    </div>
  </Router>
);

export default App;
