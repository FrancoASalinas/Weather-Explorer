import { useState } from 'react';
import Header from './components/Header';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  async function handleSearch() {
    navigate(`/search?q=${searchInput}`);
  }

  return (
    <>
      <Header
        onSearch={handleSearch}
        onChange={e => setSearchInput(e.target.value)}
        inputValue={searchInput}
      />
      <main className='location-search'>
        <Outlet />
      </main>
    </>
  );
}

export default App;
