import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import './App.css';
import Home from './component/Home/Home';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Droid Serif']
      }
    });

    store.dispatch(loadUser())

  }, [])

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />

        <Route path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />
        <Route path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />

        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
