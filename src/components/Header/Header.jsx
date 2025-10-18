import React, { useState } from 'react';
import UserMenu from '../UserMenu/UserMenu';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <div className="headerTitle">Kanban board</div>

      <div className="userBlock" onClick={toggleMenu}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
          alt="avatar"
          className="avatar"
        />
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span>
        {isOpen && <UserMenu />}
      </div>
    </header>
  );
}
