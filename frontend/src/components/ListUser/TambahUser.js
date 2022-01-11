import { Button, TextField } from '@mui/material'
import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../../actions/authAction'
import MetaData from '../layout/MetaData'


const TambahUser = ({ history }) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [namapengguna, setNamapengguna] = useState("")

    const alert = useAlert()
    const dispatch = useDispatch()

    const { success, error } = useSelector(state => state.registerUser)

    useEffect(() => {
        if (success) {
            history.push('/Login')
            alert.success('User Berhasil Ditambah')
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
    }, [dispatch, success, error, alert, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('email', email)
        formData.set('username', username)
        formData.set('password', password)
        formData.set('namapengguna', namapengguna)
        dispatch(register(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Tambah User'} />
            <div className="content">
                <h2>Tambah User</h2>
                <form className="Tambah" encType='multipart/form-data' onSubmit={submitHandler}>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Email
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Username
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Username"
                            variant="standard"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Password
                        </label>
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
                    <div className="input">
                        <label htmlFor="barang_field">
                            Nama Pengguna
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Nama Pengguna"
                            variant="standard"
                            value={namapengguna}
                            onChange={(e) => setNamapengguna(e.target.value)}
                        />
                    </div>
                    <div className="button">
                        <Button
                            type='submit'
                            variant="contained"
                        >
                            Tambah
                        </Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default TambahUser
