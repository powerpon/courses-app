import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'src/services';

export const login = createAsyncThunk('user/login', async (token: string) => {
	try {
		const response = await endpoints.getUser(token);
		return response.data.result;
	} catch (error) {
		console.log(error);
	}
});

export const logout = createAsyncThunk('user/logout', async (token: string) => {
	try {
		await endpoints.logoutUser(token);
	} catch (error) {
		console.log(error);
	}
});
