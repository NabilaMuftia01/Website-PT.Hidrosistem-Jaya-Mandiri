import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isSuperAdmin, isAdmin, component: Component, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/Login' />
                        }
                        if (isAdmin === true && user.role === 'checker') {
                            return <Redirect to="/" />
                        }
                        if (isSuperAdmin === true && user.role !== 'superadmin')
                            return <Redirect to='/' />
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute
