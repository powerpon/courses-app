import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { login, logout } from './thunk';

interface UserState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
}

const initialUserState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				login.fulfilled,
				(
					state: UserState,
					action: PayloadAction<{
						name: string;
						email: string;
						role: string;
					}>
				) => {
					state.email = action.payload.email;
					state.name = action.payload.name;
					state.token = localStorage.getItem('accessToken');
					state.role = action.payload.role;
					state.token !== null ? (state.isAuth = true) : (state.isAuth = false);
				}
			)
			.addCase(logout.fulfilled, (state: UserState) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				state = initialUserState;
			});
	},
});

export default userSlice.reducer;

export type { UserState };
