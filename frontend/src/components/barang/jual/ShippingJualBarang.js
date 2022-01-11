import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../../layout/MetaData'
import Button from '@mui/material/Button';
import { saveShippingSellerInfo } from '../../../actions/cartAction';
import { getCustomers } from '../../../actions/custumerAction';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from '@mui/material';

const ShippingJualBarang = ({ history }) => {

    const { sellItems = {}, shippingSellerInfo } = useSelector(state => state.sellCart)
    const { customers } = useSelector(state => state.customers)
    const { product } = sellItems
    const [namacus, setNamacus] = useState(shippingSellerInfo.namacus)
    const [labelalamat, setLabelalamat] = useState(shippingSellerInfo.labelalamat)
    const [kota, setKota] = useState(shippingSellerInfo.kota)
    const [kodepos, setKodepos] = useState(shippingSellerInfo.kodepos)
    const [notlp, setNotlp] = useState(shippingSellerInfo.notlp)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCustomers())
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingSellerInfo({ namacus, labelalamat, kota, kodepos, notlp }))
        history.push(`/Barang/Jual/Confirm/${product}`)
    }

    return (
        <Fragment>
            <MetaData title={'Pengiriman Barang'} />
            <div className="content">
                <h2>Pengiriman Barang</h2>
                <div className="Barang_Shipping">
                    <form className="barang-shipping" onSubmit={submitHandler}>
                        <label>Nama Customer</label>
                        <FormControl
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Nama Customer</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={namacus ? namacus : ""}
                                onChange={(e) => setNamacus(e.target.value)}
                            >
                                {
                                    customers.map(customer => (
                                        <MenuItem key={customer.namacus} value={customer.namacus}>{customer.namacus}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <hr />
                        <label>Telepon</label>
                        <FormControl
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Nomor Telepon</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={notlp ? notlp : ""}
                                onChange={(e) => setNotlp(e.target.value)}
                            >
                                {
                                    customers.map(customer => (
                                        <MenuItem key={customer.notlp} value={customer.notlp}>{customer.notlp}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <hr />
                        <label>Alamat</label>
                        <FormControl
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Alamat</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={labelalamat ? labelalamat : ""}
                                onChange={(e) => setLabelalamat(e.target.value)}
                            >
                                {
                                    customers.map(customer => (
                                        <MenuItem key={customer.labelalamat} value={customer.labelalamat}>{customer.labelalamat}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <hr />
                        <label>Kota</label>
                        <FormControl
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Kota</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={kota ? kota : ""}
                                onChange={(e) => setKota(e.target.value)}
                            >
                                {
                                    customers.map(customer => (
                                        <MenuItem key={customer.kota} value={customer.kota}>{customer.kota}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <hr />
                        <label>Kode Pos</label>
                        <FormControl
                            variant="standard">
                            <InputLabel htmlFor="demo-customized-select-native">Kode Pos</InputLabel>
                            <Select
                                defaultValue=""
                                id="demo-customized-select-native"
                                value={kodepos ? kodepos : ""}
                                onChange={(e) => setKodepos(e.target.value)}
                            >
                                {
                                    customers.map(customer => (
                                        <MenuItem key={customer.kodepos} value={customer.kodepos}>{customer.kodepos}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <hr />
                        <Button
                            type="submit"
                            variant="contained">Isi Alamat</Button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ShippingJualBarang
