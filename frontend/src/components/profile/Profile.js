import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/authAction'
import { authConstants } from '../../constants/authConstants';
import { Button } from '@mui/material';


const Profile = ({ history }) => {

    const [oldPassword, setOldpassword] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, isUpdated } = useSelector(state => state.user)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Password updated successfully')
            history.push('/Setting')
            dispatch({
                type: authConstants.UPDATE_PASSWORD_RESET
            })
        }
    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)
        dispatch(updatePassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Settings'} />
            <div className="content">
                <h2>Settings</h2>
                <div className="setting">
                    <h2>Profile Details</h2>
                    <div className="profile-details">
                        <div className="input">
                            <label htmlFor="barang_field">
                                Nama Pengguna
                            </label>
                            <p>{user.namapengguna}</p>
                        </div>
                        <div className="input">
                            <label htmlFor="barang_field">
                                Username
                            </label>
                            <p>{user.username}</p>
                        </div>
                        <div className="input">
                            <label htmlFor="barang_field">
                                Role
                            </label>
                            <p>{user.role}</p>
                        </div>
                        <div className="input">
                            <label htmlFor="barang_field">
                                Join At
                            </label>
                            <p>{String(user.createdAt).substring(0, 10)}</p>
                        </div>
                    </div>
                </div>

                {/* PASSWORD SETTING */}

                <div className="setting-password">
                    <h2>Profile Details</h2>
                    <form className="password-details" onSubmit={submitHandler}>
                        <div className="input-password">
                            <label htmlFor="barang_field">
                                Password Lama
                            </label>
                            <TextField
                                id="standard-password-input"
                                label="Password Lama"
                                variant="standard"
                                type="password"
                                autoComplete="current-password"
                                value={oldPassword}
                                onChange={(e) => setOldpassword(e.target.value)}
                            />
                        </div>
                        <div className="input-password">
                            <label htmlFor="barang_field">
                                Password Baru
                            </label>
                            <TextField
                                id="standard-password-input"
                                label="Password Baru"
                                variant="standard"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            type='submit'
                            variant="contained"
                        >
                            Ubah Password
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile
