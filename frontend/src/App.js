import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import './App.css';
import Home from './component/Home/Home';
import Footer from './component/layout/Footer/Footer';
import Header from './component/layout/Header/Header';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserOptions from './component/layout/Header/UserOptions';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store';
import axios from 'axios';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UserList from './component/admin/UserList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import NotFound from './component/layout/Not Found/NotFound';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState()

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")

    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Droid Serif']
      }
    });

    store.dispatch(loadUser())
    getStripeApiKey()
  }, [])

  const stripePromise = loadStripe(stripeApiKey)
  window.addEventListener("contextmenu", e => e.preventDefault())

  return (
    <>

      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />

        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />

        <Route path='/account' element={<ProtectedRoute component={Profile} />} />
        <Route path='/me/update' element={<ProtectedRoute component={UpdateProfile} />} />


        <Route path='/password/update' element={<ProtectedRoute component={UpdatePassword} />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<ResetPassword />} />

        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />

        <Route path='/cart' element={<Cart />} />

        <Route path='/login/shipping' element={<ProtectedRoute component={Shipping} />} />
        <Route path='/order/confirm' element={<ProtectedRoute component={ConfirmOrder} />} />

        <Route path='/process/payment' element={
          <Elements stripe={stripePromise}>
            <ProtectedRoute component={Payment} />
          </Elements>

        } />

        <Route path='/success' element={<ProtectedRoute component={OrderSuccess} />} />
        <Route path='/orders' element={<ProtectedRoute component={MyOrders} />} />
        <Route path='/order/:id' element={<ProtectedRoute component={OrderDetails} />} />

        <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true} component={Dashboard} />} />
        <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} component={ProductList} />} />
        <Route path='/admin/product' element={<ProtectedRoute isAdmin={true} component={NewProduct} />} />
        <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} component={UpdateProduct} />} />
        <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true} component={OrderList} />} />
        <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />} />
        <Route path='/admin/users' element={<ProtectedRoute isAdmin={true} component={UserList} />} />
        <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true} component={UpdateUser} />} />
        <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true} component={ProductReviews} />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
