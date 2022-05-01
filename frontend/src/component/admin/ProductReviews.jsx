import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import { clearError, deleteReviews, getAllReview } from './../../actions/productAction';
import MetaData from './../layout/MetaData';
import "./ProductReviews.css";
import Sidebar from './Sidebar';
import StarIcon from '@material-ui/icons/Star';
import { useState } from 'react';


function ProductReviews() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { error, reviews } = useSelector(state => state.productReviews)
    const { error: deleteError, isDeleted } = useSelector(state => state.review)
    const [productId, setProductId] = useState("")

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId))
    }

    const productReviewSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(getAllReview(productId))
    }

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReview(productId))
        }
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success("Review Delete Successfully")
            navigate("/admin/reviews")
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [error, dispatch, alert, deleteError, isDeleted, navigate, productId])

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            minWidth: 180,
            type: "number",
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor"
            }
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            type: "number",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
    ]

    const rows = []

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name
        })
    })

    return (
        <>
            <MetaData title="ALL REVIEWS - ADMIN" />
            <div className="dashboard">
                <Sidebar />

                <div className="productReviewsContainer">
                    <form
                        className='productReviewsForm'
                        encType='multipart/form-data'
                        onSubmit={productReviewSubmitHandler}
                    >
                        <h1 className='productReviewsFormHeading'>All Reviews</h1>
                        <div>
                            <StarIcon />
                            <input
                                type="text"
                                placeholder='Name'
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id='createProductBtn'
                            type='submit'
                        // disabled={loading ? true : false || productId ? true : false}
                        >
                            Update
                        </Button>

                    </form>
                    {
                        reviews && reviews.length > 0 ? (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className='productListTable'
                                autoHeight
                            />
                        ) : (<h1>No Review Found</h1>)
                    }
                </div>
            </div>
        </>
    )
}

export default ProductReviews