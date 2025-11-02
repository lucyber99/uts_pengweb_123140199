import React from 'react';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🐾 Animal Gallery</h1>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'dog' ? 'active' : ''}`}
            onClick={() => onTabChange('dog')}
          >
            Dogs
          </button>
          <button
            className={`nav-tab ${activeTab === 'cat' ? 'active' : ''}`}
            onClick={() => onTabChange('cat')}
          >
            Cats
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
