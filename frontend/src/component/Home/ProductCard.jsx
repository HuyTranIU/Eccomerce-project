import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { Link } from "react-router-dom";

function ProductCard({ product }) {

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 1
    }
    return (
        <div>
            <Link to={`/product/${product._id}`} className="productCard">
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <Rating {...options} />
                    <span className='productCardSpan'>({product.numOfReviews} Review)</span>
                </div>
                <span>{`$${product.price}`}</span>
            </Link>
        </div>
    )
}

export default ProductCard
