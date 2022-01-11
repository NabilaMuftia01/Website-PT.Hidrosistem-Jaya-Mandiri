import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { getVendors, clearError, deleteVendor } from '../../actions/vendorAction'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { vendorConstants } from '../../constants/vendorConstants'

const Vendor = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, vendors } = useSelector(state => state.vendors)
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)
    const { error: deleteError, isDeleted } = useSelector(state => state.vendor)

    useEffect(() => {
        dispatch(getVendors())

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError())
        }

        if (isDeleted) {
            alert.success('Vendor Telah Dihapus')
            history.push('/Vendor')
            dispatch({
                type: vendorConstants.DELETE_VENDOR_RESET
            })
        }
    }, [dispatch, error, alert, deleteError, isDeleted, history])

    const setVendors = () => {
        const data = {
            columns: [
                {
                    label: 'Kode Vendor',
                    field: 'kdvndr',
                    sort: 'asc',
                    width: 175
                },
                {
                    label: 'Nama Vendor',
                    field: 'name',
                    sort: 'asc',
                    width: 400
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

        vendors.forEach(vendor => {
            data.rows.push({
                kdvndr: vendor.kdvndr,
                name: vendor.namavendor,
                notlp: vendor.notlp,
                labelalamat: vendor.labelalamat,
                kota: vendor.kota,
                kodepos: vendor.kodepos,
                actions:
                    <div >
                        {
                            !loading && (!isAuthenticated || user.role !== 'checker') && (
                                <div className="edit-btn" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Link to={`/Vendor/Edit/${vendor._id}`} style={{ textDecoration: "none", color: "#000" }}><FiEdit /></Link>
                                    <button style={{
                                        border: "none",
                                        backgroundColor: "transparent"
                                    }}
                                        onClick={() => deleteVendorHandler(vendor._id)}
                                        className="trash"><FiTrash /></button>
                                </div>
                            )
                        }
                    </div>
            })
        })
        return data
    }

    const deleteVendorHandler = (id) => {
        dispatch(deleteVendor(id))
    }

    return (
        <Fragment>
            <MetaData title={'Vendor'} />
            <div className="content">
                <h2>Daftar Vendor</h2>
                <MDBDataTable
                    data={setVendors()}
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

export default Vendor
