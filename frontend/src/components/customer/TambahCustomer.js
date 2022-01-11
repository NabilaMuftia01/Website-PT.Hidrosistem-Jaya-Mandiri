import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { customerConstants } from '../../constants/customerConstants'
import { newCustomer, clearError } from '../../actions/custumerAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const TambahCustomer = ({ history }) => {

    const { error, success } = useSelector(state => state.newCustomer)

    const [namacus, setNamacus] = useState("")
    const [notlp, setNotlp] = useState("")
    const [labelalamat, setLabelalamat] = useState("")
    const [kota, setKota] = useState("")
    const [kodepos, setKodepos] = useState("")

    const alert = useAlert()
    const dispatch = useDispatch()

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (success) {
            history.push('/Customer')
            alert.success('Customer added successfully')
            dispatch({
                type: customerConstants.NEW_CUSTOMER_RESET
            })
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('namacus', namacus);
        formData.set('notlp', notlp);
        formData.set("labelalamat", labelalamat)
        formData.set("kota", kota)
        formData.set("kodepos", kodepos)
        dispatch(newCustomer(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Tambah Customer'} />
            <div className="content">
                <h2>Tambah Customer</h2>
                <form className="Tambah" encType='multipart/form-data' onSubmit={submitHandler}>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Nama Customer
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Nama Customer"
                            variant="standard"
                            value={namacus}
                            onChange={(e) => setNamacus(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Nomor Telepon
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Nomor Telepon"
                            variant="standard"
                            value={notlp}
                            onChange={(e) => setNotlp(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Alamat
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Alamat"
                            variant="standard"
                            value={labelalamat}
                            onChange={(e) => setLabelalamat(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Kota
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Kota"
                            variant="standard"
                            value={kota}
                            onChange={(e) => setKota(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Kodepos
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Kodepos"
                            variant="standard"
                            value={kodepos}
                            onChange={(e) => setKodepos(e.target.value)}
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
        </Fragment >
    )
}

export default TambahCustomer
