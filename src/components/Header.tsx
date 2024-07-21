import React, { useState } from 'react';
import { nav } from '../contents/Header';
import SearchBar from './Searchbar';
import { NavLink } from 'react-router-dom';

type Props = {
  onSearch: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
};

function Header({ onSearch, onChange, inputValue }: Props) {
  const [toggleNav, setToggleNav] = useState(false);

  const CustomNavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode | string;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? 'header__nav__link--active' : 'header__nav__link'
      }
      onClick={() => {
        setToggleNav(false);
      }}
    >
      {children}
    </NavLink>
  );

  const NavLinks = () => (
    <>
      <CustomNavLink to='/map'>{nav.map.text}</CustomNavLink>
      <CustomNavLink to='/'>{nav.currentLocation.text}</CustomNavLink>
    </>
  );

  return (
    <header className='header'>
      <button
        className='header__bars'
        onClick={() => setToggleNav(prev => !prev)}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
          <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
        </svg>
      </button>
      <nav className='header__nav--wide'>
        <NavLinks />
      </nav>
      <nav
        className={
          toggleNav ? 'header__nav--narrow--active' : 'header__nav--narrow'
        }
      >
        <NavLinks />
      </nav>
      <SearchBar onClick={onSearch} onChange={onChange} value={inputValue} />
    </header>
  );
}

export default Header;
