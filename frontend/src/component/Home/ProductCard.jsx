import Rating from '@material-ui/lab/Rating';
import React from 'react';
import { Link } from "react-router-dom";

function ProductCard({ product }) {

    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 1
    }
    console.log("product Card: ", product)
    return (
        <div>
            <Link to={`/product/${product._id}`} className="productCard">
                <img src={product && product?.images[0]?.url} alt={product && product.name} />
                <p>{product && product.name}</p>
                <div>
                    <Rating {...options} />
                    <span className='productCardSpan'>({product && product.numOfReviews} Review)</span>
                </div>
                <span>{`$${product && product.price}`}</span>
            </Link>
        </div>
    )
}

export default ProductCard
