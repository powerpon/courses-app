import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
}

const initialUserState: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		login: (
			state: UserState,
			action: PayloadAction<{ name: string; email: string; token: string }>
		) => {
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.token = action.payload.token;
			action.payload.token === ''
				? (state.isAuth = false)
				: (state.isAuth = true);
		},
		logout: (state: UserState) => {
			state = initialUserState;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

export type { UserState };
