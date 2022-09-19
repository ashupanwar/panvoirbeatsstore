import axios from "axios";
import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { restoreCart } from "./cartRedux"
import { SERVER_URL } from '../requestMethods';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        //console.log(res.data._id);
        restoreCartContent(dispatch, res.data._id);
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const register = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/register", user);
        dispatch(loginSuccess(res.data));
        //console.log("registered user ", res.data);
        createCartForUser(dispatch, res.data._id)
    } catch (error) {
        dispatch(loginFailure());
    }
}

export const updateCart = async (user, cart) => {

    try {
        await userRequest.get(SERVER_URL + "/api/carts/find/" + user._id)
            .then(async (res) => {
                //console.log(res.data)
                await userRequest.put(SERVER_URL + "/api/carts/" + res.data._id, cart)
                    .then(res => { })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
    } catch (error) {
        console.log(error)
    }
}

export const restoreCartContent = async (dispatch, userId) => {
    try {
        await userRequest.get(SERVER_URL + "/api/carts/find/" + userId)
            .then(response => {
                //console.log(response.data)
                dispatch(restoreCart(response.data));
            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error)
    }
}
export const createCartForUser = async (dispatch, userId) => {
    try {
        let cart = {
            total: 0,
            quantity: 0,
            tracks: [],
            userId: userId
        }
        await publicRequest.post(SERVER_URL + "/api/carts/", cart)
            .then(response => {
                //console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error)
    }
} 
