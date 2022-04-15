import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import './ProductDetails.css';
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import { clearError } from './../../actions/productAction';


function ProductDetails() {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(state => state.productDetails)
    const params = useParams()

    const options = {
        edit: false,
        color: "rgba(20,20, 20, 0.1)",
        value: product.ratings,
        count: 5,
        size: window.innerWidth < 600 ? 20 : 22,
        activeColor: "tomato",
        isHalf: true,
    }
    console.log('productDetails: ', product);

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getProductDetails(params.id))
    }, [dispatch, params.id, error, alert])

    return (
        <>
            {loading ?
                <Loader />
                : (
                    <>
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
                                    <ReactStars {...options} />
                                    <span>({product.numOfReviews}) Reviews</span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`$${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button>+</button>
                                            <input type="number" defaultValue="1" />
                                            <button>-</button>
                                        </div>
                                        <button>Add to Cart</button>
                                    </div>
                                    <p>
                                        Status:{" "}
                                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutofStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>

                                <div className="detailsBlock-4">
                                    Description: <p>{product.description}</p>
                                </div>
                                <button className="submitReview">Submit Review</button>
                            </div>
                        </div>
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
