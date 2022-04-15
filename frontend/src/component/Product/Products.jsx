import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import { getProduct } from './../../actions/productAction';
import './Products.css';
import Pagination from "react-js-pagination";

function Products() {
    const dispatch = useDispatch()
    const params = useParams()
    const keyword = params.keyword
    const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products)
    const [currentPage, setCurrentPage] = useState(1)

    console.log('productsCount', productsCount);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    useEffect(() => {
        dispatch(getProduct(keyword, currentPage))
    }, [dispatch, keyword, currentPage])
    return (
        <>
            {loading ?
                <Loader />
                : (
                    <>
                        <h2 className="productsHeading">Products</h2>
                        <div className="products">
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

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
                    </>
                )
            }
        </>
    )
}

export default Products
