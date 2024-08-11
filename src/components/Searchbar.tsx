import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { input, button } from '../constants/Searchbar';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  function searchLocation() {
    navigate(`/search?q=${searchInput}`);
  }

  return (
    <div className='header__searchbar'>
      <input
        className='header__searchbar__input'
        type='text'
        placeholder={input.placeholder}
        onChange={e => setSearchInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && searchLocation()}
        value={searchInput}
      />
      <button
        disabled={searchInput.trim() === ''}
        onClick={searchLocation}
        className='header__searchbar__button'
      >
        {button.text}
      </button>
    </div>
  );
}
