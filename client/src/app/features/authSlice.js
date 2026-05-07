import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for authentication
const authSlice = createSlice({
    name: "auth", // The name of the slice
    initialState: {
        token: null, // Stores the authentication token
        user: null, // Stores user information
        loading: true // Indicates if authentication state is being loaded
    },
    reducers: {
        /**
         * Reducer to handle user login.
         * Sets the authentication token and user information.
         */
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        /**
         * Reducer to handle user logout.
         * Clears the authentication token and user information, and removes the token from local storage.
         */
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
        /**
         * Reducer to set the loading state.
         */
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

// Export the individual action creators
export const { login, logout, setLoading } = authSlice.actions;

// Export the reducer function to be used in the Redux store
export default authSlice.reducer;