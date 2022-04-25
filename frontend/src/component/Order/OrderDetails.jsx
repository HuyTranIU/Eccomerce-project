import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { clearErrors } from './../../actions/userAction';
import MetaData from './../layout/MetaData';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from './../../actions/orderAction';
import Loader from './../layout/Loader/Loader';
import { Typography } from '@material-ui/core';
import "./OrderDetails.css"

function OrderDetails() {
  const { order, error, loading } = useSelector(state => state.orderDetails)
  const dispatch = useDispatch()
  const alert = useAlert()
  const params = useParams()


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getOrderDetails(params.id))

  }, [dispatch, error, alert, params.id])

  return (
    <>
      {loading ? (<Loader />) : (
        <>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1" >
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>{order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state},${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                </div>
              </div>
              <Typography >Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p className={
                    order.paymentInfo &&
                      order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"
                  }>
                    {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"
                    }
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className='orderDetailsContainerBox'>
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                        order.paymentInfo.status === "Delivered" ? "greenColor" : "redColor"}
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`} >{item.name}</Link>
                      <span>
                        {`${item.quantity} x $${item.price} = `}
                        <b>{`$${item.price * item.quantity}`}</b>
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default OrderDetails