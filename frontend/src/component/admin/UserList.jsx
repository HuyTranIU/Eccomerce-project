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
import { getAllUsers, clearErrors, deleteUser } from './../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';

function UserList() {
    const dispatch = useDispatch()
    const { error, users } = useSelector(state => state.allUsers)
    const alert = useAlert()
    const navigate = useNavigate()
    const { error: deleteError, isDeleted, message } = useSelector(state => state.profile)

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success(message)
            navigate("/admin/users")
            dispatch({ type: DELETE_USER_RESET })
        }

        dispatch(getAllUsers())
    }, [error, dispatch, alert, deleteError, isDeleted, navigate, message])

    const columns = [
        {
            field: "id",
            headerName: "User ID",
            minWidth: 180,
            flex: 0.8
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            flex: 1,

        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
            type: "number"
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 150,
            type: "number",
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor"
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
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </>
                )
            }
        },
    ]

    const rows = []

    users && users.forEach((item) => {
        rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
        })
    })

    return (
        <>
            <MetaData title="ALL USERS - ADMIN" />
            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 id="productListHeading">All Users</h1>
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

export default UserList