import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className='main-content'>
        <Outlet />
      </main>
    </>
  );
}

export default App;
