import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import Navigation from '../Navigation/Navigation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(true);
  }
  const handleClose = () => {
    setIsMenuOpen(false);
  }
  // function handleMenuClick() {
  //   setIsMenuOpen(true);
  // }
  return (
    <div className='page font-smoothed'>
      <Routes>
        <Route path='/' element={
          <>
          <Header loggedIn={true} onMenuClick={handleMenuClick}/>
          <Main />
          <Navigation isOpen={isMenuOpen} onClose={handleClose} />
          <Footer />
          </>
        } />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
