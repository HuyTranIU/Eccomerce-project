import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import './App.css';
import Home from './component/Home/Home';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Droid Serif']
      }
    });
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
