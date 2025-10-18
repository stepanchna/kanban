import React from 'react';
import './UserMenu.css';

export default function UserMenu() {
  const items = ['Profile', 'Settings', 'Log out'];

  return (
    <ul className="userMenu">
      {items.map((text) => (
        <li key={text} className="menuItem">
          {text}
        </li>
      ))}
    </ul>
  );
}
