import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { allOrders, clearError, deleteOrder } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { VscFilePdf } from 'react-icons/vsc'
import Link from '@mui/material/Link'
import { orderCosntants } from '../../constants/orderConstant'

const Order = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, orders } = useSelector(state => state.allOrder)
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success('Pembelian berhasil dihapus')
            history.push('/Pembelian')
            dispatch({
                type: orderCosntants.DELETE_ORDER_RESET
            })
        }
    }, [dispatch, alert, error, history, isDeleted])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
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
                    label: 'Nama Vendor',
                    field: 'namavendor',
                    sort: 'asc',
                    width: 230
                },
                {
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                name: `${order.Items.name}`,
                quantity: `${order.Items.quantity}`,
                hargasatuan: `Rp. ${order.Items.hbeli}`,
                amount: `Rp. ${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                tanggal: String(order.createAt).substring(0, 10),
                namavendor: `${order.Items.namavendor}`,
                actions:
                    <div >
                        {
                            !loading && (!isAuthenticated || user.role !== 'checker') && (
                                <div className="edit-btn" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {
                                        order.orderStatus && String(order.orderStatus).includes('Delivered')
                                            ? <VscFilePdf

                                            />
                                            : <Link href={`/Pembelian/${order._id}`} style={{
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
                                        onClick={() => deleteOrderHandler(order._id)}
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
            <MetaData title={'Pembelian'} />
            <div className="content">
                <h2>Daftar Pembelian</h2>
                <MDBDataTable
                    data={setOrders()}
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

export default Order
