import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { getCustomers, clearError, deleteCustomer } from '../../actions/custumerAction'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { customerConstants } from '../../constants/customerConstants'

const Customer = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, customers } = useSelector(state => state.customers)
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)
    const { error: deleteError, isDeleted } = useSelector(state => state.customer)

    useEffect(() => {
        dispatch(getCustomers());

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError())
        }

        if (isDeleted) {
            alert.success('Customer Telah Dihapus')
            history.push('/Customer')
            dispatch({
                type: customerConstants.DELETE_CUSTOMER_RESET
            })
        }
    }, [dispatch, error, alert, deleteError, isDeleted, history])

    const setCustomers = () => {
        const data = {
            columns: [
                {
                    label: 'Kode Customer',
                    field: 'id',
                    sort: 'asc',
                    width: 300
                },
                {
                    label: 'Nama Customer',
                    field: 'namacus',
                    sort: 'asc',
                    width: 250
                },
                {
                    label: 'Nomor Telepon',
                    field: 'notlp',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Alamat',
                    field: 'labelalamat',
                    sort: 'asc',
                    width: 350
                },
                {
                    label: 'Kota',
                    field: 'kota',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Kode Pos',
                    field: 'kodepos',
                    sort: 'asc',
                    width: 150
                },
                {
                    field: 'actions',
                },
            ],
            rows: []
        }

        customers.forEach(customer => {
            data.rows.push({
                id: customer._id,
                namacus: customer.namacus,
                notlp: customer.notlp,
                labelalamat: customer.labelalamat,
                kota: customer.kota,
                kodepos: customer.kodepos,
                actions:
                    <div >
                        {
                            !loading && (!isAuthenticated || user.role !== 'checker') && (
                                <div className="edit-btn" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Link to={`/Customer/Edit/${customer._id}`} style={{ textDecoration: "none", color: "#000" }}><FiEdit /></Link>
                                    <button style={{
                                        border: "none",
                                        backgroundColor: "transparent"
                                    }}
                                        onClick={() => deleteCustomerHandler(customer._id)}
                                        className="trash"><FiTrash /></button>
                                </div>
                            )
                        }
                    </div>
            })
        })
        return data
    }

    const deleteCustomerHandler = (id) => {
        dispatch(deleteCustomer(id))
    }

    return (
        <Fragment>
            <MetaData title={'Customer'} />
            <div className="content">
                <h2>Daftar Customer</h2>
                <MDBDataTable
                    data={setCustomers()}
                    bordered
                    striped
                    hover
                    responsive
                    maxHeight='500px'
                    scrollX
                />
            </div>
        </Fragment>
    )
}

export default Customer
