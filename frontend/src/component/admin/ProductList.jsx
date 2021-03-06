import React from 'react'
import "./ProductList.css"
import MetaData from './../layout/MetaData';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { clearError, deleteProduct, getAdminProduct } from './../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

function ProductList() {
    const dispatch = useDispatch()
    const { error, products } = useSelector(state => state.products)
    const alert = useAlert()
    const navigate = useNavigate()
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success("Product Delete Successfully")
            navigate("/admin/products")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

        dispatch(getAdminProduct())
    }, [error, dispatch, alert, deleteError, isDeleted, navigate])

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
            // cellClassName: (params) => {
            //     return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
            // }
        },
        {
            field: "stock",
            headerName: "Stock",
            minWidth: 150,
            flex: 0.3,
            type: "number"
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 270,
            type: "number",
            flex: 0.5
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
    ]

    const rows = []

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name
        })
    })

    return (
        <>
            <MetaData title="ALL PRODUCT - ADMIN" />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 id="productListHeading">All Products</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList