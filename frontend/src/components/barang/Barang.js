import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { getProducts, clearError, deleteProduct } from '../../actions/productActions'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { FiTrash, FiEdit, FiShoppingCart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { productConstants } from '../../constants/productConstants'

const Barang = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getProducts());

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearError())
        }

        if (isDeleted) {
            alert.success('Barang Telah Dihapus')
            history.push('/List-Barang')
            dispatch({
                type: productConstants.DELETE_PRODUCT_RESET
            })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Kode Barang',
                    field: 'kdbrg',
                    sort: 'asc',
                    width: 175
                },
                {
                    label: 'Nama Barang',
                    field: 'name',
                    sort: 'asc',
                    width: 350
                },
                {
                    label: 'Nama Vendor',
                    field: 'namavendor',
                    sort: 'asc',
                    width: 250
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Kategori',
                    field: 'kdgroup',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Harga Jual',
                    field: 'hjual',
                    sort: 'asc',
                    width: 125
                },
                {
                    label: 'Harga Beli',
                    field: 'hbeli',
                    sort: 'asc',
                    width: 125
                },
                {
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                kdbrg: product.kdbrg,
                name: product.name,
                namavendor: product.namavendor,
                stock: product.stock,
                kdgroup: product.kdgroup,
                hjual: product.hjual,
                hbeli: product.hbeli,
                status:
                    <div>
                        <span className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'Ready' : 'Barang kosong'}</span>
                    </div>,
                actions:
                    <div >
                        {
                            !loading && (!isAuthenticated || user.role !== 'checker') && (
                                <div className="edit-btn" style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Link to={`/Barang/${product._id}`} style={{ textDecoration: "none", color: "#000" }}><FiShoppingCart /></Link>
                                    <Link to={`/Barang/Edit/${product._id}`} style={{ textDecoration: "none", color: "#000" }}><FiEdit /></Link>
                                    <button style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        padding: "0px"
                                    }}
                                        onClick={() => deleteProductHandler(product._id)}
                                        className="trash"><FiTrash /></button>
                                </div>
                            )
                        }
                    </div>
            })
        })
        return data
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <MetaData title={'Barang'} />
            <div className="content">
                <h2>Daftar Barang</h2>
                <MDBDataTable
                    data={setProducts()}
                    bordered
                    hover
                    responsive
                    maxHeight='75vh'
                    minWidth='100vh'
                    scrollX
                    scrollY
                />
            </div>
        </Fragment>
    )
}

export default Barang
