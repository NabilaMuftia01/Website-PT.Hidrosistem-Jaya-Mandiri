import React, { Fragment, useState } from 'react'
import MetaData from '../../layout/MetaData'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { saveShippingInfo } from '../../../actions/cartAction';

import { useDispatch, useSelector } from 'react-redux';

const ShippingBeliBarang = ({ history }) => {

    const { listItems = {}, shippingInfo } = useSelector(state => state.cart)
    const { product } = listItems
    const [labelalamat, setLabelalamat] = useState(shippingInfo.labelalamat)
    const [kota, setKota] = useState(shippingInfo.kota)
    const [kodepos, setKodepos] = useState(shippingInfo.kodepos)
    const [notlp, setNotlp] = useState(shippingInfo.notlp)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ labelalamat, kota, kodepos, notlp }))
        history.push(`/Barang/Beli/Confirm/${product}`)
    }

    return (
        <Fragment>
            <MetaData title={'Pengiriman Barang'} />
            <div className="content">
                <h2>Pengiriman Barang</h2>
                <div className="Barang_Shipping">
                    <form className="barang-shipping" onSubmit={submitHandler}>
                        <label>No Telepon</label>
                        <TextField
                            value={notlp}
                            onChange={(e) => setNotlp(e.target.value)}
                            id="standard-basic" label="Nomor Telepon" variant="standard"
                        />
                        <hr />
                        <label>Isi Alamat</label>
                        <TextField
                            value={labelalamat}
                            onChange={(e) => setLabelalamat(e.target.value)}
                            id="standard-basic" label="Alamat" variant="standard"
                        />
                        <hr />
                        <label>Isi Kota</label>
                        <TextField
                            value={kota}
                            onChange={(e) => setKota(e.target.value)}
                            id="standard-basic" label="Kota" variant="standard"
                        />
                        <hr />
                        <label>Isi Kode Pos</label>
                        <TextField
                            value={kodepos}
                            onChange={(e) => setKodepos(e.target.value)}
                            id="standard-basic" label="Kode Pos" variant="standard"
                        />
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

export default ShippingBeliBarang
