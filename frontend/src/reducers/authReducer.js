import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    token: '',
    loading: false,
    error: ''
};

const url = `http://localhost:3001`;

const fetchUrl = async (api, body, token = "") => {
    const res = await fetch(url + api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": await AsyncStorage.getItem('token')
        },
        body: JSON.stringify(body)
    });
    return await res.json()
};

export const signupUser = createAsyncThunk(
    'signupuser',
    async (body) => {
        const result = await fetchUrl('/users/register', body);
        return result;
    }
);

export const loginUser = createAsyncThunk(
    'loginuser',
    async (body) => {
        const result = await fetchUrl('/users/login', body);
        return result;
    }
);

export const addToken = createAsyncThunk(
    'addtoken',
    async () => {
        const result = await AsyncStorage.getItem('token');
        return result;
    }
)

const authReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.token = null
            AsyncStorage.removeItem('token')
            console.log(state.token);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.fulfilled, (state, { payload: { error, message } }) => {
                state.loading = false;
                error
                    ? (state.error = error)
                    : (state.error = message);
            })
            .addCase(signupUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                console.log('hello');
            })
            .addCase(loginUser.fulfilled, (state, { payload: { error, token } }) => {
                state.loading = false;
                if (error) {
                    state.error = error;
                    console.log(state.error);
                } else {
                    state.token = token;
                    AsyncStorage.setItem('token', token);
                    console.log(state.token);
                }
            })
            .addCase(addToken.fulfilled, (state, action) => {
                state.token = action.payload;
            });
    },
});


export const { logout } = authReducer.actions
export default authReducer.reducer;