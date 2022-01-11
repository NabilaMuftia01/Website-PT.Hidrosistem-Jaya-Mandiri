import React, { Fragment } from 'react'
import { logoHJM } from '../images/images'

const Header = () => {
    return (
        <Fragment>
            <div className="header">
                <h1>Dashboard Gudang</h1>
                <img src={logoHJM} alt="logo" />
            </div>
        </Fragment>
    )
}

export default Header
