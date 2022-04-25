import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import { getProduct, clearError } from './../../actions/productAction';
import './Products.css';
import Pagination from "react-js-pagination";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { useAlert } from 'react-alert';
import MetaData from './../layout/MetaData';
import Rating from '@material-ui/lab/Rating';

const categoties = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones"
]

function Products() {
    const dispatch = useDispatch()
    const params = useParams()
    const keyword = params.keyword
    const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products)
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 250000000000000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)
    const alert = useAlert()


    const ratingChanged = (newRating) => {
        setRatings(newRating)
    }

    // const options = {
    //     color: "rgba(20,20, 20, 0.1)",
    //     value: ratings,
    //     onChange: ratingChanged,
    //     count: 5,
    //     size: window.innerWidth < 600 ? 20 : 22,
    //     activeColor: "tomato",
    //     isHalf: true,
    // }

    const options = {
        value: ratings,
        onChange: ratingChanged,
        readOnly: true,
        precision: 0.5
    }

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice)
    }

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings, error, alert])
    return (
        <>
            {loading ?
                <Loader />
                : (
                    <>
                        <MetaData title="PRODUCTS -- ECOMMERCE" />
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />
                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {categoties.map((category) => (
                                    <li
                                        className='category-link'
                                        key={category}
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                {/* <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => setRatings(newRating)}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="continuous-slider"
                                    min={0}
                                    max={5}
                                /> */}
                                <Rating {...options} />
                            </fieldset>
                        </div>


                        {
                            resultPerPage < productsCount && (
                                <div className="paginationBox">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText="1st"
                                        lastPageText="Last"
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        activeClass='pageItemActive'
                                        activeLinkClass='pageLinkActive'
                                    />
                                </div>

                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default Products
