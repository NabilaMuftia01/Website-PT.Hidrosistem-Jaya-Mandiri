import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { VscFilePdf } from 'react-icons/vsc'
import Link from '@mui/material/Link'
import MetaData from '../layout/MetaData'
import { allSells, clearError, deleteSell } from '../../actions/sellAction'
import { sellConstant } from '../../constants/sellConstant'

const Sell = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, sells } = useSelector(state => state.allSell)
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)
    const { isDeleted } = useSelector(state => state.sell)

    useEffect(() => {
        dispatch(allSells())

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success('Penjualan berhasil dihapus')
            history.push('/Penjualan')
            dispatch({
                type: sellConstant.DELETE_SELL_RESET
            })
        }
    }, [dispatch, alert, error, history, isDeleted])

    const deleteSellHandler = (id) => {
        dispatch(deleteSell(id))
    }

    const setSells = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                    width: 250
                },
                {
                    label: 'Nama Barang',
                    field: 'name',
                    sort: 'asc',
                    width: 300
                },
                {
                    label: 'Quantity',
                    field: 'quantity',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Harga satuan',
                    field: 'hargasatuan',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Total Harga',
                    field: 'amount',
                    sort: 'asc',
                    width: 130
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 130
                },
                {
                    label: 'Tanggal',
                    field: 'tanggal',
                    sort: 'asc',
                    width: 130
                },
                {
                    label: 'Nama Customer',
                    field: 'namacus',
                    sort: 'asc',
                    width: 230
                },
                {
                    field: 'actions',
                },
            ],
            rows: []
        }

        sells.forEach(sell => {
            data.rows.push({
                id: sell._id,
                name: `${sell.Items.name}`,
                quantity: `${sell.Items.quantity}`,
                hargasatuan: `Rp. ${sell.Items.hjual}`,
                amount: `Rp. ${sell.totalPrice}`,
                status: sell.orderStatus && String(sell.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{sell.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{sell.orderStatus}</p>,
                tanggal: String(sell.createAt).substring(0, 10),
                namacus: `${sell.seller.namacus}`,
                actions:
                    <div >
                        {
                            !loading && (!isAuthenticated || user.role !== 'checker') && (
                                <div className="edit-btn" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {
                                        sell.orderStatus && String(sell.orderStatus).includes('Delivered')
                                            ? <Link href="#" style={{
                                                textDecoration: "none",
                                                color: "#000"
                                            }}>
                                                <VscFilePdf />
                                            </Link>
                                            : <Link href={`/Penjualan/${sell._id}`} style={{
                                                textDecoration: "none",
                                                color: "#000"
                                            }}>
                                                <FiEdit />
                                            </Link>
                                    }
                                    <button style={{
                                        border: "none",
                                        backgroundColor: "transparent"
                                    }}
                                        onClick={() => deleteSellHandler(sell._id)}
                                        className="trash"><FiTrash /></button>
                                </div>
                            )
                        }
                    </div>
            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={'Penjualan'} />
            <div className="content">
                <h2>Daftar Penjualan</h2>
                <MDBDataTable
                    data={setSells()}
                    bordered
                    hover
                    responsive
                    maxHeight='500px'
                    scrollX
                />
            </div>
        </Fragment>
    )
}

export default Sell
