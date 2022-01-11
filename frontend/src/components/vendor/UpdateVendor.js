import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { updateVendor, clearError, getVendorDetails } from '../../actions/vendorAction'
import { useAlert } from 'react-alert'
import { vendorConstants } from '../../constants/vendorConstants'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateVendor = ({ match, history }) => {

    const [kdvndr, setKdvndr] = useState("")
    const [namavendor, setNamavendor] = useState("")
    const [notlp, setNotlp] = useState("")
    const [labelalamat, setLabelalamat] = useState("")
    const [kota, setKota] = useState("")
    const [kodepos, setKodepos] = useState("")

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, vendor } = useSelector(state => state.vendorDetails)
    const { error: updateError, isUpdated } = useSelector(state => state.vendor)
    const vendorId = match.params.id

    useEffect(() => {
        if (vendor && vendor._id !== vendorId) {
            dispatch(getVendorDetails(vendorId))
        } else {
            setKdvndr(vendor.kdvndr)
            setNamavendor(vendor.namavendor)
            setNotlp(vendor.notlp)
            setLabelalamat(vendor.labelalamat)
            setKota(vendor.kota)
            setKodepos(vendor.kodepos)
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
            history.push('/Vendor')
            alert.success('Vendor updated successfully')
            dispatch({
                type: vendorConstants.UPDATE_VENDOR_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, vendor, vendorId])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('kdvndr', kdvndr);
        formData.set('namavendor', namavendor);
        formData.set('notlp', notlp);
        formData.set("labelalamat", labelalamat)
        formData.set("kota", kota)
        formData.set("kodepos", kodepos)
        dispatch(updateVendor(vendor._id, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Update Vendor'} />
            <div className="content">
                <h2>Update Vendor</h2>
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

export default UpdateVendor
