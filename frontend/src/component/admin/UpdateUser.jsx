import React, { useState } from 'react'
import MetaData from './../layout/MetaData';
import Sidebar from './Sidebar';
import { Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { UPDATE_USER_RESET } from './../../constants/userConstants';
import { clearErrors, getDetailsUsers, updateUser } from '../../actions/userAction';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loader from './../layout/Loader/Loader';


const roles = [
    "admin",
    "user"
]
function UpdateUser() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const alert = useAlert()
    const params = useParams()

    const { user, error, loading } = useSelector(state => state.userDetails)

    const { error: updateError, isUpdated, loading: updateLoading } = useSelector(state => state.profile)

    const [name, setName] = useState('')
    const [email, setEmail] = useState(0)
    const [role, setRole] = useState("")

    const userId = params.id


    useEffect(() => {

        if (user && user._id !== userId) {
            dispatch(getDetailsUsers(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Update User Successfully")
            navigate("/admin/users")
            dispatch({ type: UPDATE_USER_RESET })
        }
    }, [error, updateError, isUpdated, alert, dispatch, navigate, user, userId])


    const updateUserSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("role", role)

        dispatch(updateUser(userId, myForm))

    }

    return (
        <>
            <MetaData title="Update User" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? (<Loader />) : (

                        <form
                            className='createProductForm'
                            encType='multipart/form-data'
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>
                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder='Name'
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option>Choose Role</option>
                                    {roles.map((role) => (
                                        <option value={role} key={role}>{role}</option>
                                    ))}
                                </select>
                            </div>


                            <Button
                                id='createProductBtn'
                                type='submit'
                                disabled={updateLoading ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>

                        </form>
                    )}
                </div>
            </div>
        </>
    )
}


export default UpdateUser