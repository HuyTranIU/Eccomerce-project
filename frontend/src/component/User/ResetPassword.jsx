import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import './ResetPassword.css';
function ResetPassword() {

    const dispatch = useDispatch()
    const alert = useAlert()
    let navigate = useNavigate()
    const { error, loading, success } = useSelector(state => state.forgotPassword)
    let { token } = useParams();

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Reset Password Successfully")
            navigate("/login")

        }
    }, [dispatch, alert, error, navigate, success])

    return (
        <>
            {
                loading ? (<Loader />) : (
                    <>
                        <MetaData title="Reseet Password" />
                        <div className="resetPasswordContainer">
                            <div className="resetPasswordBox">
                                <h2 className='resetPasswordHeading'>Update Profile</h2>
                                <form
                                    className="resetPasswordForm"
                                    onSubmit={resetPasswordSubmit}
                                >

                                    <div>
                                        <LockOpenIcon />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                        value="Reset Password"
                                        className="resetPasswordBtn"
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

export default ResetPassword