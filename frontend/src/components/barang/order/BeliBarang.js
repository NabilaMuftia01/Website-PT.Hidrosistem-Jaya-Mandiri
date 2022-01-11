import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearError } from '../../../actions/productActions'
import { useAlert } from 'react-alert'
import MetaData from '../../layout/MetaData'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import { addItemToCart } from '../../../actions/cartAction'
import { cartConstant } from '../../../constants/cartConstants'


const BeliBarang = ({ history, match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, product } = useSelector(state => state.productDetails)
    const [hbeli, setHbeli] = useState(product.hbeli)

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, alert, error, match.params.id]);

    const addToOrder = (e) => {
        e.preventDefault()
        dispatch(addItemToCart(match.params.id, quantity, hbeli))
        history.push(`/Barang/Beli/Pengiriman/${product._id}`)
        dispatch({
            type: cartConstant.ADD_TO_CART
        })
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return
        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return
        const qty = count.valueAsNumber - 1
        setQuantity(qty)
    }

    return (
        <Fragment>
            <MetaData title={'Beli Barang'} />
            <div className="content">
                <h2>Detail Barang</h2>
                <div className="beli-barang-details"
                    style={{
                        width: "45%",
                        backgroundColor: "#fff",
                        margin: "0px 80px",
                        borderRadius: "15px",
                    }}>
                    <div className="beli-barang-name"
                        style={{
                            padding: "30px",
                        }}>
                        <b>Nama Barang<h5>{product.name}</h5></b>
                        <hr />
                        <b>Kode Barang<h5>{product.kdbrg}</h5></b>
                        <hr />
                        <b>Stock
                            <div className="stockCounter "
                                style={{
                                    width: "50%",
                                    display: "flex"
                                }}
                            >
                                <span className='btn btn-light border-dark minus' onClick={decreaseQty}>
                                    -
                                </span>
                                <input
                                    type='number'
                                    className='form-control count d-inline'
                                    value={quantity}
                                    readOnly
                                />
                                <span className='btn btn-primary plus' onClick={increaseQty}>
                                    +
                                </span>
                            </div>
                        </b>
                        <hr />
                        <b>Group Barang<h5>{product.kdgroup}</h5></b>
                        <hr />
                        <b>Vendor<h5>{product.namavendor}</h5></b>
                        <hr />
                        <div className="harga-input" style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <label style={{
                                fontWeight: 'bold',
                            }}>
                                Harga Beli
                            </label>
                            <TextField
                                value={hbeli}
                                onChange={(e) => setHbeli(e.target.value)}
                                id="standard-basic" label="Harga Beli" variant="standard" />
                        </div>
                    </div>
                    <hr />
                    <div className="barang-button" style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "15px",
                    }}>
                        <Button variant="contained" onClick={addToOrder}>Isi Alamat Vendor</Button>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default BeliBarang
