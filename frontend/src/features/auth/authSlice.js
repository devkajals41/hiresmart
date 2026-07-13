import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAPI";

const initialState = {
	user: null,
	token: null,
	isAuthenticated: false,
	loading: false,
	error: null,
};

// Register
export const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			return await registerUser(userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.detail || "Registration failed",
			);
		}
	},
);

// Login
export const login = createAsyncThunk(
	"auth/login",
	async (credentials, thunkAPI) => {
		try {
			return await loginUser(credentials);
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.detail || "Login failed",
			);
		}
	},
);

const authSlice = createSlice({
	name: "auth",

	initialState,

	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			state.error = null;

			localStorage.removeItem("token");
		},
	},

	extraReducers: (builder) => {
		builder

			// Register
			.addCase(register.pending, (state) => {
				state.loading = true;
			})

			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;

				state.user = action.payload.user;
				state.token = action.payload.token.access_token;
				state.isAuthenticated = true;

				localStorage.setItem("token", action.payload.token.access_token);
			})

			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Login
			.addCase(login.pending, (state) => {
				state.loading = true;
			})

			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;

				state.user = action.payload.user;
				state.token = action.payload.token.access_token;
				state.isAuthenticated = true;

				localStorage.setItem("token", action.payload.token.access_token);
			})

			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
