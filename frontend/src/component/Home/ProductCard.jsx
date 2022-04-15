import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const options = {
        edit: false,
        color: "rgba(20,20, 20, 0.1)",
        value: product.ratings,
        count: 5,
        size: window.innerWidth < 600 ? 20 : 22,
        activeColor: "tomato",
        isHalf: true,
    }
    return (
        <div>
            <Link to={`/product/${product._id}`} className="productCard">
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Review)</span>
                </div>
                <span>{`$${product.price}`}</span>
            </Link>
        </div>
    )
}

export default ProductCard
