import React, { Fragment, useEffect, useState } from 'react'
import { bgLogin, logoHJM } from '../images/images'
import { login, clearErrors } from '../../actions/authAction'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { useHistory, useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField'

const Masuk = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error } = useSelector(state => state.auth)
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isAuthenticated, error, history, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }
    return (
        <Fragment>
            <MetaData title={`Login`} />
            <div className="masuk-content">
                <img src={bgLogin} alt="masuk" />
                <div className="masuk-box">
                    <img src={logoHJM} alt="logo" />
                    <h1>Login</h1>
                    <form className="input" onSubmit={submitHandler}>
                        <div className="Input-form">
                            <label htmlFor="username">Username</label>
                            <TextField
                                id="standard-basic"
                                label="Username"
                                variant="standard"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="Input-form">
                            <label htmlFor="password_field">Password</label>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="Input-button">
                            <button
                                type='submit'>
                                Masuk
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment >
    )
}

export default Masuk
