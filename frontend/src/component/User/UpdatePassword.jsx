import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { loadUser } from './../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from './../../constants/userConstants';
import './UpdatePassword.css';

function UpdatePassword() {

    const dispatch = useDispatch()
    const alert = useAlert()
    let navigate = useNavigate()
    const { error, loading, isUpdated } = useSelector(state => state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        console.log('form Submit', e)

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Update Password Successfully")
            dispatch(loadUser())
            navigate("/account")

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, alert, error, navigate, isUpdated])

    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <MetaData title="Update/Change Password" />
                        <div className="updatePasswordContainer">
                            <div className="updatePasswordBox">
                                <h2 className='updatePasswordHeading'>Update Profile</h2>
                                <form
                                    className="updatePasswordForm"
                                    onSubmit={updatePasswordSubmit}
                                >
                                    <div>
                                        <VpnKeyIcon />
                                        <input
                                            type="password"
                                            placeholder="Old Password"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <LockIcon />
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        value="Change Password"
                                        className="updatePasswordBtn"
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default UpdatePassword