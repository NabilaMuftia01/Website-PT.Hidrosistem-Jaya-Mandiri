import { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'

import './App.scss';
import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/authAction';
import store from './store'
import Header from './components/layout/Header';

import Home from './components/home/Home';
import Masuk from './components/user/Masuk'
import Barang from './components/barang/Barang';
import Vendor from './components/vendor/Vendor';
import Customer from './components/customer/Customer';
import TambahVendor from './components/vendor/TambahVendor';
import TambahCustomer from './components/customer/TambahCustomer';
import TambahBarang from './components/barang/TambahBarang';
import ListUser from './components/ListUser/ListUser';
import Order from './components/order/Order';
import TambahUser from './components/ListUser/TambahUser';
import BarangDetails from './components/barang/BarangDetails';
import BeliBarang from './components/barang/order/BeliBarang'
import ShippingBeliBarang from './components/barang/order/ShippingBeliBarang';
import BeliBarangConfirm from './components/barang/order/BeliBarangConfirm';
import Sidebar from './components/layout/Sidebar';
import Sell from './components/sell/Sell';
import JualBarang from './components/barang/jual/JualBarang';
import ShippingJualBarang from './components/barang/jual/ShippingJualBarang';
import JualBarangConfirm from './components/barang/jual/JualBarangConfirm';
import UpdateBarang from './components/barang/UpdateBarang';
import UpdateVendor from './components/vendor/UpdateVendor';
import UpdateCustomer from './components/customer/UpdateCustomer';
import ProcessOrder from './components/order/ProcessOrder';
import ProcessSell from './components/sell/ProcessSell';
import Profile from './components/profile/Profile';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  const { isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        {
          !loading && (isAuthenticated) && (<Sidebar />)
        }
        <div className="index">
          {
            !loading && (isAuthenticated) && (<Header />)
          }
          <Route path="/Login" exact component={Masuk} />
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/Barang/Edit/:id" exact isAdmin={true} component={UpdateBarang} />
          <ProtectedRoute path="/Barang/Jual/Confirm/:id" exact isAdmin={true} component={JualBarangConfirm} />
          <ProtectedRoute path="/Barang/Jual/Pengiriman/:id" exact isAdmin={true} component={ShippingJualBarang} />
          <ProtectedRoute path="/Barang/Jual/:id" exact isAdmin={true} component={JualBarang} />
          <ProtectedRoute path="/Barang/Beli/Confirm/:id" exact isAdmin={true} component={BeliBarangConfirm} />
          <ProtectedRoute path="/Barang/Beli/Pengiriman/:id" exact isAdmin={true} component={ShippingBeliBarang} />
          <ProtectedRoute path="/Barang/Beli/:id" exact isAdmin={true} component={BeliBarang} />
          <ProtectedRoute path="/Barang/:id" exact isAdmin={true} component={BarangDetails} />
          <ProtectedRoute path="/List-Barang/Tambah" isAdmin={true} component={TambahBarang} />
          <ProtectedRoute path="/List-Barang" exact component={Barang} />
          <ProtectedRoute path="/Vendor/Edit/:id" exact isAdmin={true} component={UpdateVendor} />
          <ProtectedRoute path="/Vendor/Tambah" exact isAdmin={true} component={TambahVendor} />
          <ProtectedRoute path="/Vendor" exact component={Vendor} />
          <ProtectedRoute path="/Customer/Edit/:id" isAdmin={true} component={UpdateCustomer} />
          <ProtectedRoute path="/Customer/Tambah" isAdmin={true} component={TambahCustomer} />
          <ProtectedRoute path="/Customer" exact component={Customer} />
          <ProtectedRoute path="/User" exact isSuperAdmin={true} component={ListUser} />
          <ProtectedRoute path="/User/Tambah" isSuperAdmin={true} component={TambahUser} />
          <ProtectedRoute path="/Pembelian/:id" exact component={ProcessOrder} />
          <ProtectedRoute path="/Pembelian" exact component={Order} />
          <ProtectedRoute path="/Penjualan/:id" exact component={ProcessSell} />
          <ProtectedRoute path="/Penjualan" exact component={Sell} />
          <ProtectedRoute path="/Setting" exact component={Profile} />
        </div>
      </div>
    </Router>
  );
}

export default App;
