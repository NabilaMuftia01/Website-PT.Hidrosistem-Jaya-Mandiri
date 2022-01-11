import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { allUsers, clearErrors, deleteUser } from '../../actions/authAction'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import { FiTrash, FiEdit } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { authConstants } from '../../constants/authConstants'

const ListUser = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, users } = useSelector(state => state.allUsers)
    const { error: deleteError, isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User Telah Dihapus')
            history.push('/User')
            dispatch({
                type: authConstants.DELETE_USER_RESET
            })
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID User',
                    field: 'id',
                    sort: 'asc',
                    width: 450
                },
                {
                    label: 'Nama User',
                    field: 'name',
                    sort: 'asc',
                    width: 450
                },
                {
                    label: 'username',
                    field: 'username',
                    sort: 'asc',
                    width: 250
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc',
                    width: 250
                },
                {
                    field: 'actions',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.namapengguna,
                username: user.username,
                role: user.role,
                actions:
                    <div className="edit-btn" style={{ display: "flex", justifyContent: "space-between" }}>
                        <Link to='#' style={{ textDecoration: "none", color: "#000" }}><FiEdit /></Link>
                        <button style={{
                            border: "none",
                            backgroundColor: "transparent"
                        }}
                            onClick={() => deleteUserHandler(user._id)}
                            className="trash"><FiTrash /></button>
                    </div>
            })
        })
        return data
    }

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    return (
        <Fragment>
            <MetaData title={'Daftar User'} />
            <div className="content">
                <h2>Daftar User</h2>
                <MDBDataTable
                    data={setUsers()}
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

export default ListUser
