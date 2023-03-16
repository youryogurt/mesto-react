import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <a href="#">
        <img className="logo" src={logo} alt="Надпись Mesto Russia"/>
      </a>
    </header>
  );
}

export default Header;