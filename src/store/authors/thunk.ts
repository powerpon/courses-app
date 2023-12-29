import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from '../../services';

interface SaveAuthorParams {
	authorName: string;
	token: string;
}

export const saveAuthor = createAsyncThunk(
	'authors/saveAuthor',
	async (params: SaveAuthorParams) => {
		try {
			const response = await endpoints.saveAuthor(
				params.authorName,
				params.token
			);
			return response.data.result;
		} catch (error) {
			console.log(error);
		}
	}
);

export const fetchAllAuthors = createAsyncThunk(
	'authors/fetchAllAuthors',
	async () => {
		try {
			const response = await endpoints.getAllAuthors();
			return response.data.result;
		} catch (error) {
			console.log(error);
		}
	}
);
