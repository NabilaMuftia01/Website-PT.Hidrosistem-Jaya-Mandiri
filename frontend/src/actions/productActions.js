import axios from 'axios'
import { productConstants, clearErrors } from '../constants/productConstants'

//GET PRODUCT
export const getProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: productConstants.ALL_PRODUCT_REQUEST
        })
        const { data } = await axios.get('/backend/products')
        dispatch({
            type: productConstants.ALL_PRODUCT_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: productConstants.ALL_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DETAIL PRODUCT
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productConstants.PRODUCT_DETAIL_REQUEST
        })
        const { data } = await axios.get(`/backend/product/${id}`)
        dispatch({
            type: productConstants.PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: productConstants.PRODUCT_DETAIL_FAILURE,
            payload: error.response.data.message
        })
    }
}

//NEW PRODUCT
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: productConstants.NEW_PRODUCT_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/backend/admin/product/new', productData, config);
        dispatch({
            type: productConstants.NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: productConstants.NEW_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE PRODUCT
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type: productConstants.UPDATE_PRODUCT_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/backend/admin/product/${id}`, productData, config);
        dispatch({
            type: productConstants.UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: productConstants.UPDATE_PRODUCT_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productConstants.DELETE_PRODUCT_REQUEST
        })
        const { data } = await axios.delete(`/backend/admin/product/${id}`)
        dispatch({
            type: productConstants.DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: productConstants.DELETE_PRODUCT_FAILURE,
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