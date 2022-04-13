import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import Product from './Product'
import MetaData from './../layout/MetaData';


const product = {
    name: "Lee Jieun",
    images: [{ url: "https://image.thanhnien.vn/w1024/Uploaded/2022/lxwpcqjwp/2022_02_26/anh-1-8702.jpg" }],
    price: "$3000",
    _id: "1"
}

function Home() {
    return (
        <Fragment>
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
    )
}

export default Home
