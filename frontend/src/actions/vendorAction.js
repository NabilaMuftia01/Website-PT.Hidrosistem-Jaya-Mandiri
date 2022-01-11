import { vendorConstants, clearErrors } from '../constants/vendorConstants'
import axios from 'axios'

export const getVendors = () => async (dispatch) => {
    try {
        dispatch({
            type: vendorConstants.ALL_VENDOR_REQUEST
        })
        const { data } = await axios.get('/backend/vendors')
        dispatch({
            type: vendorConstants.ALL_VENDOR_SUCCESS,
            payload: data.vendors
        })
    } catch (error) {
        dispatch({
            type: vendorConstants.ALL_VENDOR_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DETAIL VENDOR
export const getVendorDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: vendorConstants.VENDOR_DETAIL_REQUEST
        })
        const { data } = await axios.get(`/backend/vendor/${id}`)
        dispatch({
            type: vendorConstants.VENDOR_DETAIL_SUCCESS,
            payload: data.vendor
        })
    } catch (error) {
        dispatch({
            type: vendorConstants.VENDOR_DETAIL_FAILURE,
            payload: error.response.data.message
        })
    }
}

//NEW VENDOR
export const newVendor = (vendorData) => async (dispatch) => {
    try {
        dispatch({ type: vendorConstants.ALL_VENDOR_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/backend/admin/vendor/new', vendorData, config);
        dispatch({
            type: vendorConstants.NEW_VENDOR_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: vendorConstants.NEW_VENDOR_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE VENDOR
export const updateVendor = (id, vendorData) => async (dispatch) => {
    try {
        dispatch({ type: vendorConstants.UPDATE_VENDOR_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/backend/admin/vendor/${id}`, vendorData, config);
        dispatch({
            type: vendorConstants.UPDATE_VENDOR_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: vendorConstants.UPDATE_VENDOR_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DELETE VENDOR
export const deleteVendor = (id) => async (dispatch) => {
    try {
        dispatch({
            type: vendorConstants.DELETE_VENDOR_REQUEST
        })
        const { data } = await axios.delete(`/backend/admin/vendor/${id}`)
        dispatch({
            type: vendorConstants.DELETE_VENDOR_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: vendorConstants.DELETE_VENDOR_FAILURE,
            payload: error.response.data.message
        })
    }
}

//clear errors
export const clearError = () => async (dispatch) => {
    dispatch({
        type: clearErrors.CLEAR_ERRORS
    })
}