import { sellConstant } from "../constants/sellConstant";
import axios from 'axios'

//CREATE SELL
export const createSell = (sell) => async (dispatch) => {
    try {
        dispatch({
            type: sellConstant.CREATE_SELL_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/backend/admin/sell/new', sell, config)
        dispatch({
            type: sellConstant.CREATE_SELL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: sellConstant.CREATE_SELL_FAILURE,
            payload: error.response.data.message
        })
    }
}

//get all sells
export const allSells = () => async (dispatch) => {
    try {
        dispatch({
            type: sellConstant.ALL_SELL_REQUEST
        })
        const { data } = await axios.get('/backend/sells/list')
        dispatch({
            type: sellConstant.ALL_SELL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: sellConstant.ALL_SELL_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DETAIL SELL
export const getSellDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: sellConstant.SELL_DETAILS_REQUEST });
        const { data } = await axios.get(`/backend/sell/${id}`)
        dispatch({
            type: sellConstant.SELL_DETAILS_SUCCESS,
            payload: data.sell,
        })
    } catch (error) {
        dispatch({
            type: sellConstant.SELL_DETAILS_FAILURE,
            payload: error.response.data.message
        })
    }
}

//UPDATE SELL
export const updateSell = (id, sellData) => async (dispatch) => {
    try {
        dispatch({
            type: sellConstant.UPDATE_SELL_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/backend/admin/sell/${id}`, sellData, config)
        dispatch({
            type: sellConstant.UPDATE_SELL_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: sellConstant.UPDATE_SELL_FAILURE,
            payload: error.response.data.message
        })
    }
}

//DELETE SELL
export const deleteSell = (id) => async (dispatch) => {
    try {
        dispatch({
            type: sellConstant.DELETE_SELL_REQUEST
        })
        const { data } = await axios.delete(`/backend/admin/sell/${id}`)
        dispatch({
            type: sellConstant.DELETE_SELL_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: sellConstant.DELETE_SELL_FAILURE,
            payload: error.response.data.message
        })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({
        type: sellConstant.CLEAR_ERRORS
    })
}