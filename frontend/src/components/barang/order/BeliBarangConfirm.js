import React, { Fragment, useEffect } from 'react'
import { Button } from '@mui/material'
import { createOrder, clearError } from '../../../actions/orderAction'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { logoHJM } from '../../images/images';

const BeliBarangConfirm = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { shippingInfo, listItems } = useSelector(state => state.cart)
    const totalPrice = (listItems.quantity * listItems.hbeli)
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, alert, error])

    const order = {
        Items: listItems,
        buyer: shippingInfo,
        totalPrice
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createOrder(order))
        localStorage.removeItem("shippingInfo");
        localStorage.removeItem("listItems");
        history.push("/Pembelian")
    }

    return (
        <Fragment>
            <div className="content">
                <h2>Barang Confirm</h2>
                <form className="barang-confirm" onSubmit={submitHandler}>
                    <div className="Barang_Confirm">
                        <div>
                            <img src={logoHJM} alt="logo" />
                        </div>
                        <ul className="list-barang">
                            <li>
                                <h4>{listItems && listItems.name}</h4>
                            </li>
                            <li>
                                <h5>{listItems && listItems.kdbrg}</h5>
                            </li>
                            <li>
                                <h6>{listItems && listItems.namavendor}</h6>
                            </li>
                            <li>
                                <h6>{shippingInfo && `${shippingInfo.labelalamat}, ${shippingInfo.kota}, ${shippingInfo.kodepos}`}</h6>
                            </li>
                            <li>
                                <h6>{shippingInfo && shippingInfo.notlp}</h6>
                            </li>
                            <hr />
                            <li>
                                <b>Harga Item:</b>
                                <p>Rp. {listItems.hbeli}</p>
                            </li>
                            <li>
                                <b>Quantity: </b>
                                <p>{listItems.quantity}</p>
                            </li>
                            <li>
                                <b>Total Harga : </b>
                                <p>Rp. {totalPrice}</p>
                            </li>
                        </ul>
                        <Button
                            type="submit"
                            variant="contained">
                            Beli
                        </Button>
                    </div>
                </form>
            </div >
        </Fragment >
    )
}

export default BeliBarangConfirm
