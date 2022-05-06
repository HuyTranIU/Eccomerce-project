import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import './ProductDetails.css';
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import { clearError, newReview } from './../../actions/productAction';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from './../../actions/cartAction';
import Rating from '@material-ui/lab/Rating';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


function ProductDetails() {
    const alert = useAlert()
    const dispatch = useDispatch()
    const params = useParams()
    const [quantity, setQuantity] = useState(1)

    const { product, loading, error } = useSelector(state => state.productDetails)
    const { success, error: reviewError } = useSelector(state => state.newReview)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [open, setOpen] = useState(false)

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData()

        myForm.set("rating", rating)
        myForm.set("comment", comment)
        myForm.set("productId", params.id)

        dispatch(newReview(myForm))
        setOpen(false)
    }

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return

        let qty = quantity + 1
        setQuantity(qty)
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return

        let qty = quantity - 1
        setQuantity(qty)
    }

    const options = {
        size: "small",
        value: product?.ratings,
        readOnly: true,
        precision: 0.5
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity))
        alert.success("Item Added To Cart")
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearError())
        }

        if (success) {
            alert.success("Review Submitted Successfully")
            dispatch({ type: NEW_REVIEW_RESET })
        }

        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id, error, alert, reviewError, success])

    return (
        <>
            {loading ?
                <Loader />
                : (
                    <>
                        <MetaData title={`${product.name} -- ECOMMERCE`} />
                        <div className="ProductDetails">
                            <div>
                                <Carousel>
                                    {product.images &&
                                        product.images.map((item, i) => (
                                            <img
                                                className="CarouselImage"
                                                src={item.url}
                                                key={item.url}
                                                alt={`${i} Slide`}
                                            />

                                        ))
                                    }
                                </Carousel>
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product #{product._id}</p>
                                </div>
                                <div className="detailsBlock-2">
                                    <Rating {...options} />
                                    <span className='detailsBlock-2-span'>({product.numOfReviews}) Reviews</span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`$${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input readOnly type="number" value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                    </div>
                                    <p>
                                        Status:{" "}
                                        <b className={product.Stock < quantity ? "redColor" : "greenColor"}>
                                            {product.Stock < quantity ? `OutofStock (${product.Stock})` : `InStock (${product.Stock})`}
                                        </b>
                                    </p>
                                </div>

                                <div className="detailsBlock-4">
                                    Description: <p>{product.description}</p>
                                </div>
                                <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                            </div>
                        </div>

                        <h3 className='reviewsHeading'>REVIEWS</h3>
                        <Dialog
                            aria-labelledby='simple-dialog-title'
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className='submitDialog'>
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />
                                <textarea
                                    className='submitDialogTextArea'
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="secondary"
                                    onClick={submitReviewToggle}
                                >Cancel</Button>
                                <Button onClick={reviewSubmitHandler} color="primary" >Submit</Button>
                            </DialogActions>
                        </Dialog>

                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews && product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                        ) : (<p className='noReviews'>No Reviews Yet</p>)}
                    </>
                )
            }
        </>
    )
}

export default ProductDetails
