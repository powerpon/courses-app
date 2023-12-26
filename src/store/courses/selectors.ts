import { RootState } from '..';

export const getCoursesSelector = (state: RootState) =>
	state.default.coursesReducer;
