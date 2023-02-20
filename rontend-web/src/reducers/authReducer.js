import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    loading: false,
    error: ''
};

const fetch1 = async (api, body, token = "") => {
    const res = await fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem('token')
        },
        body: JSON.stringify(body)
    });
    return await res.json()
};

export const signupUser = createAsyncThunk(
    'signupuser',
    async (body) => {
        const result = await fetch1('/users/register', body);
        return result;
    }
);

export const loginUser = createAsyncThunk(
    'loginuser',
    async (body) => {
        const result = await fetch1('/users/login', body);
        return result;
    }
);

const authReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken:(state,action)=>{
            state.token = localStorage.getItem('token')
        },
        logout:(state,action)=>{
            state.token = null
            localStorage.removeItem('token')
        }
    },
    extraReducers: {
        [signupUser.fulfilled] : (state, {payload:{error,message}}) => {
            state.loading = false;
            error ? (
                state.error = error
            ) : (
                state.error = message
            )
        },
        [signupUser.pending] : (state, action) => {
            state.loading = true;
        },
        [loginUser.pending] : (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled] : (state, {payload:{error,token}}) => {
            state.loading = false;
            if (error) {
                state.error = error
            } else {
                state.token = token;
                localStorage.setItem('token',token);
            }
        },
    },
});


export const {addToken, logout}  = authReducer.actions
export default authReducer.reducer;