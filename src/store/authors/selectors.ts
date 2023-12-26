import { RootState } from '..';

export const getAuthorsSelector = (state: RootState) =>
	state.default.authorsReducer;
