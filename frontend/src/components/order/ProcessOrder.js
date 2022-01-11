import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearError, updateOrder } from '../../actions/orderAction'
import { orderCosntants } from '../../constants/orderConstant'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';
import Button from '@mui/material/Button'

const ProcessOrder = ({ match }) => {

    const [status, setStatus] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { order = {} } = useSelector(state => state.orderDetails)
    const { buyer, Items, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.order)

    const orderId = match.params.id

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success('Order updated successfully')
            dispatch({
                type: orderCosntants.UPDATE_ORDER_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, orderId])

    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set('status', status);
        dispatch(updateOrder(id, formData))
    }

    return (
        <Fragment>
            <MetaData title={`Proses Pembelian ${order && order._id}`} />
            <div className="content">
                <h2>Barang Status</h2>
                <form className="barang-confirm">
                    <div className="Barang_Confirm">
                        <ul className="list-barang">
                            <li>
                                <h4>Pembeliam {order && order._id}</h4>
                            </li>
                            <li>
                                <h4>{Items && Items.name}</h4>
                            </li>
                            <li>
                                <h5>{Items && Items.kdbrg}</h5>
                            </li>
                            <li>
                                <h6>{Items && Items.namavendor}</h6>
                            </li>
                            <li>
                                <h6>{buyer && `${buyer.labelalamat}, ${buyer.kota}, ${buyer.kodepos}`}</h6>
                            </li>
                            <li>
                                <h6>{buyer && buyer.notlp}</h6>
                            </li>
                            <hr />
                            <h4 className="my-4">Status:</h4>
                            <p className={order.orderStatus && String(orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>
                            <hr />
                            <li>
                                <b>Harga Item:</b>
                                <p>Rp. {Items && Items.hbeli}</p>
                            </li>
                            <li>
                                <b>Quantity: </b>
                                <p>{Items && Items.quantity}</p>
                            </li>
                            <li>
                                <b>Total Harga : </b>
                                <p>Rp. {totalPrice}</p>
                            </li>
                            <FormControl
                                sx={{
                                    width: 1
                                }}
                                variant="standard">
                                <InputLabel htmlFor="demo-customized-select-native">Status</InputLabel>
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="PreOrder">Pre Order</option>
                                    <option value="Delivered">Delivered</option>
                                </NativeSelect>
                            </FormControl>
                        </ul>
                        <Button
                            type="submit"
                            onClick={() => updateOrderHandler(order._id)}
                            variant="contained">
                            Ubah Status
                        </Button>
                    </div>
                </form>
            </div >
        </Fragment>
    )
}

export default ProcessOrder
