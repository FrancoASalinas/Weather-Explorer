import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { input, button } from '../constants/Searchbar';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  return (
    <div className='header__searchbar'>
      <input
        className='header__searchbar__input'
        type='text'
        placeholder={input.placeholder}
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <button
        disabled={searchInput.trim() === ''}
        onClick={() => navigate(`/search?q=${searchInput}`)}
        className='header__searchbar__button'
      >
        {button.text}
      </button>
    </div>
  );
}
