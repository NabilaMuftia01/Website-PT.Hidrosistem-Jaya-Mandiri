import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getSellDetails, clearError, updateSell } from '../../actions/sellAction'
import { sellConstant } from '../../constants/sellConstant'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';
import Button from '@mui/material/Button'

const ProcessSell = ({ match }) => {

    const [status, setStatus] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { sell = {} } = useSelector(state => state.sellDetails)
    const { seller, Items, totalPrice, orderStatus } = sell
    const { error, isUpdated } = useSelector(state => state.sell)

    const sellId = match.params.id

    useEffect(() => {
        dispatch(getSellDetails(sellId))
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isUpdated) {
            alert.success('Sell updated successfully')
            dispatch({
                type: sellConstant.UPDATE_SELL_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, sellId])

    const updateSellHandler = (id) => {
        const formData = new FormData()
        formData.set('status', status)
        dispatch(updateSell(id, formData))
    }

    return (
        <Fragment>
            <MetaData title={`Proses Penjualan ${sell && sell._id}`} />
            <div className="content">
                <h2>Barang Status</h2>
                <form className="barang-confirm">
                    <div className="Barang_Confirm">
                        <ul className="list-barang">
                            <li>
                                <h4>Penjualan {sell && sell._id}</h4>
                            </li>
                            <li>
                                <h4>{Items && Items.name}</h4>
                            </li>
                            <li>
                                <h5>{Items && Items.kdbrg}</h5>
                            </li>
                            <li>
                                <h6>{seller && seller.namacus}</h6>
                            </li>
                            <li>
                                <h6>{seller && `${seller.labelalamat}, ${seller.kota}, ${seller.kodepos}`}</h6>
                            </li>
                            <li>
                                <h6>{seller && seller.notlp}</h6>
                            </li>
                            <hr />
                            <h4 className="my-4">Status:</h4>
                            <p className={sell.orderStatus && String(orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>
                            <hr />
                            <li>
                                <b>Harga Item:</b>
                                <p>Rp. {Items && Items.hjual}</p>
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
                            onClick={() => updateSellHandler(sell._id)}
                            variant="contained">
                            Ubah Status
                        </Button>
                    </div>
                </form>
            </div >
        </Fragment>
    )
}

export default ProcessSell
