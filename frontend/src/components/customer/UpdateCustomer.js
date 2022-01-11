import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { updateCustomer, clearError, getCustomerDetails } from '../../actions/custumerAction'
import { useAlert } from 'react-alert'
import { customerConstants } from '../../constants/customerConstants'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateCustomer = ({ history, match }) => {

    const [namacus, setNamacus] = useState("")
    const [notlp, setNotlp] = useState("")
    const [labelalamat, setLabelalamat] = useState("")
    const [kota, setKota] = useState("")
    const [kodepos, setKodepos] = useState("")

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, customer } = useSelector(state => state.customerDetails)
    const { error: updateError, isUpdated } = useSelector(state => state.customer)
    const customerId = match.params.id

    useEffect(() => {
        if (customer && customer._id !== customerId) {
            dispatch(getCustomerDetails(customerId))
        } else {
            setNamacus(customer.namacus)
            setNotlp(customer.notlp)
            setLabelalamat(customer.labelalamat)
            setKota(customer.kota)
            setKodepos(customer.kodepos)
        }
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearError())
        }
        if (isUpdated) {
            history.push('/Customer')
            alert.success('Customer updated successfully')
            dispatch({
                type: customerConstants.UPDATE_CUSTOMER_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, customer, customerId])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('namacus', namacus);
        formData.set('notlp', notlp);
        formData.set("labelalamat", labelalamat)
        formData.set("kota", kota)
        formData.set("kodepos", kodepos)
        dispatch(updateCustomer(customer._id, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Update Customer'} />
            <div className="content">
                <h2>Update Customer</h2>
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
                            Ubah
                        </Button>
                    </div>
                </form>
            </div>
        </Fragment >
    )
}

export default UpdateCustomer
