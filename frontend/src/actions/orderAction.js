import { orderCosntants } from "../constants/orderConstant";
import axios from 'axios';

//CREATE ORDER
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: orderCosntants.CREATE_ORDER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/backend/admin/order/new', order, config)
        dispatch({
            type: orderCosntants.CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: orderCosntants.CREATE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//get all orders
export const allOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: orderCosntants.ALL_ORDERS_REQUEST
        })
        const { data } = await axios.get('/backend/orders/list')
        dispatch({
            type: orderCosntants.ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: orderCosntants.ALL_ORDERS_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DETAIL ORDER
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: orderCosntants.ORDER_DETAILS_REQUEST });
        const { data } = await axios.get(`/backend/order/${id}`)
        dispatch({
            type: orderCosntants.ORDER_DETAILS_SUCCESS,
            payload: data.order,
        })
    } catch (error) {
        dispatch({
            type: orderCosntants.ORDER_DETAILS_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE ORDER
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({
            type: orderCosntants.UPDATE_ORDER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/backend/admin/order/${id}`, orderData, config)
        dispatch({
            type: orderCosntants.UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: orderCosntants.UPDATE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DELETE ORDER
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({
            type: orderCosntants.DELETE_ORDER_REQUEST
        })
        const { data } = await axios.delete(`/backend/admin/order/${id}`)
        dispatch({
            type: orderCosntants.DELETE_ORDER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: orderCosntants.DELETE_ORDER_FAILURE,
            payload: error.response.data.message
        })
    }
}

//clear errors
export const clearError = () => async (dispatch) => {
    dispatch({
        type: orderCosntants.CLEAR_ERRORS
    })
}