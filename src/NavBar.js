import React from 'react';
import './styles.css'; // Import styles if needed

const NavBar = ({ toggleNav, isOpen }) => {
  return (
    <div className={`navbar ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleNav} className="navbar-toggle">
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <div className="navbar-links">
        <a href="/">Home</a>
      </div>
    </div>
  );
};

export default NavBar; 