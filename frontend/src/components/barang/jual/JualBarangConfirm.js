import React, { Fragment, useEffect } from 'react'
import { Button } from '@mui/material'
import { createSell, clearError } from '../../../actions/sellAction';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';
import { logoHJM } from '../../images/images';
import MetaData from '../../layout/MetaData';

const JualBarangConfirm = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { shippingSellerInfo, sellItems } = useSelector(state => state.sellCart)
    const totalPrice = (sellItems.quantity * sellItems.hjual)
    const { error } = useSelector(state => state.newSell)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [dispatch, alert, error])

    const sell = {
        Items: sellItems,
        seller: shippingSellerInfo,
        totalPrice
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createSell(sell))
        localStorage.removeItem("shippingSellerInfo");
        localStorage.removeItem("sellItems");
        history.push("/Penjualan")
    }

    return (
        <Fragment>
            <MetaData title={"Comfirm Barang"} />
            <div className="content">
                <h2>Barang Confirm</h2>
                <form className="barang-confirm" onSubmit={submitHandler}>
                    <div className="Barang_Confirm">
                        <div>
                            <img src={logoHJM} alt="logo" />
                        </div>
                        <ul className="list-barang">
                            <li>
                                <h4>{sellItems && sellItems.name}</h4>
                            </li>
                            <li>
                                <h5>{sellItems && sellItems.kdbrg}</h5>
                            </li>
                            <li>
                                <h6>{shippingSellerInfo && shippingSellerInfo.namacus}</h6>
                            </li>
                            <li>
                                <h6>{shippingSellerInfo && `${shippingSellerInfo.labelalamat}, ${shippingSellerInfo.kota}, ${shippingSellerInfo.kodepos}`}</h6>
                            </li>
                            <li>
                                <h6>{shippingSellerInfo && shippingSellerInfo.notlp}</h6>
                            </li>
                            <hr />
                            <li>
                                <b>Harga Item:</b>
                                <p>Rp. {sellItems.hjual}</p>
                            </li>
                            <li>
                                <b>Quantity: </b>
                                <p>{sellItems.quantity}</p>
                            </li>
                            <li>
                                <b>Total Harga : </b>
                                <p>Rp. {totalPrice}</p>
                            </li>
                        </ul>
                        <Button
                            type="submit"
                            variant="contained">
                            Jual
                        </Button>
                    </div>
                </form>
            </div >
        </Fragment>
    )
}

export default JualBarangConfirm
