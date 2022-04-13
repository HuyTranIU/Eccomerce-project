import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function Product({ product }) {
    // const [rating, setRating] = useState(0)
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    return (
        <div>
            <Link to={product._id} className="productCard">
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars
                        color="rgba(20,20, 20, 0.1)"
                        // value={rating}
                        count={5}
                        onChange={ratingChanged}
                        size={window.innerWidth < 600 ? 20 : 22}
                        activeColor="tomato"
                        isHalf={true}
                    />
                    <span>(256 Review)</span>
                </div>
                <span>{product.price}</span>
            </Link>
        </div>
    )
}

export default Product
