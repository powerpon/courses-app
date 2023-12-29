import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Author } from 'src/components/Courses/components/CourseCard/CourseCard';
import { fetchAllAuthors, saveAuthor } from './thunk';

interface AuthorsState {
	authors: Author[];
}

const initialAuthorsState: AuthorsState = { authors: [] };

const authorsSlice = createSlice({
	name: 'authors',
	initialState: initialAuthorsState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				saveAuthor.fulfilled,
				(state: AuthorsState, action: PayloadAction<Author>) => {
					state.authors = [...state.authors, action.payload];
				}
			)
			.addCase(
				fetchAllAuthors.fulfilled,
				(state: AuthorsState, action: PayloadAction<Author[]>) => {
					state.authors = action.payload;
				}
			);
	},
});

export default authorsSlice.reducer;

export type { AuthorsState };
