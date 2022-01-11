import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearError } from '../../actions/productActions'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { Button } from '@mui/material'

const BarangDetails = ({ match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, product } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, alert, error, match.params.id]);

    return (
        <Fragment>
            <MetaData title={'Barang'} />
            <div className="content">
                <h2>Detail Barang</h2>
                <div className="barang-details">
                    <div className="barang-name">
                        <b>Nama Barang<h5>{product.name}</h5></b>
                        <b>Kode Barang<h5>{product.kdbrg}</h5></b>
                        <b>Stock Barang<h5>{product.stock}</h5></b>
                        <b>Group Barang<h5>{product.kdgroup}</h5></b>
                        <b>Vendor<h5>{product.namavendor}</h5></b>
                        <b>Harga Beli<h5>Rp. {product.hbeli}</h5></b>
                        <b>Harga Jual<h5>Rp. {product.hjual}</h5></b>
                    </div>
                    <div className="barang-button">
                        <Button href={`/Barang/Jual/${product._id}`} variant="outlined" disabled={product.stock === 0}>Jual Barang</Button>
                        <Button variant="outlined" href={`/Barang/Beli/${product._id}`} >Beli Barang</Button>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default BarangDetails
