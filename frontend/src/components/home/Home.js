import React, { Fragment, useEffect } from 'react'
import { BsInboxes } from 'react-icons/bs'
import { FiUser, FiUsers, FiAlertCircle } from 'react-icons/fi'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import { getVendors } from '../../actions/vendorAction'
import { getCustomers } from '../../actions/custumerAction'
import { allOrders } from '../../actions/orderAction'
import { allSells } from '../../actions/sellAction'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Home = () => {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const { vendors } = useSelector(state => state.vendors)
    const { user } = useSelector(state => state.auth)
    const { customers } = useSelector(state => state.customers)
    const { orders } = useSelector(state => state.allOrder)
    const { sells } = useSelector(state => state.allSell)

    let outOfStock = 0
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1
        }
    })

    useEffect(() => {
        dispatch(allOrders())
        dispatch(getProducts())
        dispatch(getVendors())
        dispatch(getCustomers())
        dispatch(allSells())
    }, [dispatch]);

    return (
        <Fragment>
            <MetaData title={`Dashboard`} />
            <div className="home-content">
                <div className="welcome">
                    <h1>Selamat Datang, {user.namapengguna}!!</h1>
                    <h2>Halaman Pengelolaan Stok Barang PT. Hidrosistem Jaya Mandiri</h2>
                </div>
                <div className="box-list">
                    <div className="box-up">
                        <div className="box">
                            <div className="Info">
                                <p>Barang</p>
                                <b>{products && products.length} Items</b>
                            </div>
                            <div className="icon">
                                <BsInboxes />
                            </div>
                        </div>
                        <div className="box">
                            <div className="Info">
                                <p>Vendor</p>
                                <b>{vendors && vendors.length} Vendor</b>
                            </div>
                            <div className="icon">
                                <FiUser />
                            </div>
                        </div>
                        <div className="box">
                            <div className="Info">
                                <p>Customer</p>
                                <b>{customers && customers.length} Customer</b>
                            </div>
                            <div className="icon">
                                <FiUsers />
                            </div>
                        </div>
                        <div className="box">
                            <div className="Info">
                                <p>Pembelian</p>
                                <b>{orders && orders.length} Pembelian</b>
                            </div>
                            <div className="icon">
                                <AiOutlineShoppingCart />
                            </div>
                        </div>
                        <div className="box">
                            <div className="Info">
                                <p>Penjualan</p>
                                <b>{sells && sells.length} Terjual</b>
                            </div>
                            <div className="icon">
                                <AiOutlineShoppingCart />
                            </div>
                        </div>
                        <div className="box">
                            <div className="Info">
                                <p>Barang Kosong</p>
                                <b>{outOfStock} Items</b>
                            </div>
                            <div className="icon">
                                <FiAlertCircle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
