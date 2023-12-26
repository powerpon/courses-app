import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Author } from 'src/components/Courses/components/CourseCard/CourseCard';

interface AuthorsState {
	authors: Author[];
}

const initialAuthorsState: AuthorsState = { authors: [] };

const authorsSlice = createSlice({
	name: 'authors',
	initialState: initialAuthorsState,
	reducers: {
		saveAuthor: (state: AuthorsState, action: PayloadAction<Author>) => {
			state.authors = [...state.authors, action.payload];
		},
		fetchAllAuthors: (state: AuthorsState, action: PayloadAction<Author[]>) => {
			state.authors = action.payload;
		},
	},
});

export const { saveAuthor, fetchAllAuthors } = authorsSlice.actions;

export default authorsSlice.reducer;

export type { AuthorsState };
