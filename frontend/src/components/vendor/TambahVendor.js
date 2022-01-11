import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { clearError, newVendor } from '../../actions/vendorAction'
import { vendorConstants } from '../../constants/vendorConstants'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const TambahVendor = ({ history }) => {

    const { error, success } = useSelector(state => state.newVendor)

    const [kdvndr, setKdvndr] = useState("")
    const [namavendor, setNamavendor] = useState("")
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
            history.push('/Vendor')
            alert.success('Vendor added successfully')
            dispatch({
                type: vendorConstants.NEW_VENDOR_RESET
            })
        }
    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('kdvndr', kdvndr);
        formData.set('namavendor', namavendor);
        formData.set('notlp', notlp);
        formData.set("labelalamat", labelalamat)
        formData.set("kota", kota)
        formData.set("kodepos", kodepos)
        dispatch(newVendor(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Tambah Vendor'} />
            <div className="content">
                <h2>Tambah Vendor</h2>
                <form className="Tambah" encType='multipart/form-data' onSubmit={submitHandler}>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Kode Vendor
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Kode Vendor"
                            variant="standard"
                            value={kdvndr}
                            onChange={(e) => setKdvndr(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Nama Vendor
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Nama Vendor"
                            variant="standard"
                            value={namavendor}
                            onChange={(e) => setNamavendor(e.target.value)}
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
        </Fragment>
    )
}

export default TambahVendor
