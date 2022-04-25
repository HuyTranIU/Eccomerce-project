import React from 'react'
import "./Cart.css"
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from './../../actions/cartAction';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const navigate = useNavigate()


    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1
        if (stock <= quantity) return
        dispatch(addItemsToCart(id, newQuantity))
    }
    const decreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1
        if (1 >= quantity) return
        dispatch(addItemsToCart(id, newQuantity))
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id))
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping", { replace: true })
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product In Your Cart</Typography>
                    <Link to="/products" >View Product</Link>
                </div>
            ) : (
                <>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Stock</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map(item => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className='cartStock'>{item.stock}</p>
                                <p className='cartSubtotal'>{`$${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`$${cartItems.reduce((acc, item) => (
                                    acc + item.price * item.quantity
                                ), 0)}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Cart