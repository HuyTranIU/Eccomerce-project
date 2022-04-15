import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { CgMouse } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import { clearError } from './../../actions/productAction';
import Loader from './../layout/Loader/Loader';
import MetaData from './../layout/MetaData';
import './Home.css';
import ProductCard from './ProductCard';

function Home() {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, products, productsCount } = useSelector(state => state.products)
    console.log('products', products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getProduct())

    }, [dispatch, error, alert])
    return (
        <>
            {loading ?
                (<Loader />) :
                (<>
                    <MetaData title="IU" />
                    <div className="banner">
                        <p>Welcome to ECOMMERCE</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products && products.map(product => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                    </div>
                </>)
            }
        </>
    )
}

export default Home
