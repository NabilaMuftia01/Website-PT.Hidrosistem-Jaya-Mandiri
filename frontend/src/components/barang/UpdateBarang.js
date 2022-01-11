import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, clearError, getProductDetails } from '../../actions/productActions'
import { useAlert } from 'react-alert'
import { productConstants } from '../../constants/productConstants'
import { getVendors } from '../../actions/vendorAction'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateBarang = ({ match, history }) => {

    const [kdbrg, setKdbrg] = useState('')
    const [name, setName] = useState('')
    const [namavendor, setNamavendor] = useState('')
    const [stock, setStock] = useState(0)
    const [satuan, setSatuan] = useState('')
    const [kdgroup, setKdGroup] = useState('')
    const [hjual, setHjual] = useState(0)
    const [hbeli, setHbeli] = useState(0)

    const kdgroups = [
        'Common Part',
        'PTO',
        'Hydraulic Tank',
        'Pump',
        'Valve',
        'Motor',
        'Fitting',
        'Hose',
        'Adaptor',
        'Accessories'
    ]

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, product } = useSelector(state => state.productDetails)
    const { error: updateError, isUpdated } = useSelector(state => state.product)
    const { vendors } = useSelector(state => state.vendors)

    const productId = match.params.id

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setKdbrg(product.kdbrg)
            setName(product.name)
            setNamavendor(product.namavendor)
            setStock(product.stock)
            setSatuan(product.satuan)
            setKdGroup(product.kdgroup)
            setHjual(product.hjual)
            setHbeli(product.hbeli)
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
            history.push('/List-Barang')
            alert.success('Product updated successfully')
            dispatch({
                type: productConstants.UPDATE_PRODUCT_RESET
            })
        }
        dispatch(getVendors())
    }, [dispatch, alert, error, isUpdated, history, updateError, product, productId])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('kdbrg', kdbrg);
        formData.set('name', name);
        formData.set('namavendor', namavendor);
        formData.set('stock', stock);
        formData.set('satuan', satuan);
        formData.set('kdgroup', kdgroup);
        formData.set('hjual', hjual);
        formData.set('hbeli', hbeli);
        dispatch(updateProduct(product._id, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Ubah Barang'} />
            <div className="content">
                <h2>Update Barang</h2>
                <form className="Tambah" encType='multipart/form-data' onSubmit={submitHandler}>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Kode Barang
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Kode Barang"
                            variant="standard"
                            value={kdbrg}
                            onChange={(e) => setKdbrg(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Nama Barang
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Nama Barang"
                            variant="standard"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Vendor
                        </label>
                        <FormControl
                            sx={{
                                minWidth: 100
                            }}
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Vendor</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={namavendor}
                                onChange={(e) => setNamavendor(e.target.value)}
                            >
                                {
                                    vendors.map(vendor => (
                                        <MenuItem key={vendor.namavendor} value={vendor.namavendor}>{vendor.namavendor}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Satuan Barang
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Satuan Barang"
                            variant="standard"
                            value={satuan}
                            onChange={(e) => setSatuan(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Stock Barang
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Stock Barang"
                            variant="standard"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Kategori
                        </label>
                        <FormControl
                            sx={{
                                minWidth: 100
                            }}
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Kategori</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={kdgroup}
                                onChange={(e) => setKdGroup(e.target.value)}
                            >
                                {
                                    kdgroups.map(kdgroup => (
                                        <MenuItem key={kdgroup} value={kdgroup}>{kdgroup}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Harga Jual
                        </label>
                        <TextField
                            id="standard-disabled"
                            label="Harga Beli"
                            variant="standard"
                            value={hjual}
                            onChange={(e) => setHjual(e.target.value)}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="barang_field">
                            Harga Beli
                        </label>
                        <TextField
                            id="standard-basic"
                            label="Harga Beli"
                            variant="standard"
                            value={hbeli}
                            onChange={(e) => setHbeli(e.target.value)}
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

export default UpdateBarang
