import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from 'src/components/Courses/components/CourseCard/CourseCard';
import {
	deleteCourse,
	fetchAllCourses,
	saveCourse,
	updateCourse,
} from './thunk';

interface CoursesState {
	courses: Course[];
}

const initialCoursesState: CoursesState = { courses: [] };

const coursesSlice = createSlice({
	name: 'courses',
	initialState: initialCoursesState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(
				deleteCourse.fulfilled,
				(state: CoursesState, action: PayloadAction<string>) => {
					state.courses = state.courses.filter(
						(course: Course) => course.id !== action.payload
					);
				}
			)
			.addCase(
				saveCourse.fulfilled,
				(state: CoursesState, action: PayloadAction<Course>) => {
					state.courses = [...state.courses, action.payload];
				}
			)
			.addCase(
				fetchAllCourses.fulfilled,
				(state: CoursesState, action: PayloadAction<Course[]>) => {
					state.courses = action.payload;
				}
			)
			.addCase(
				updateCourse.fulfilled,
				(state: CoursesState, action: PayloadAction<Course>) => {
					const courseToUpdate = state.courses.find(
						(course) => course.id === action.payload.id
					);
					for (const key of Object.keys(courseToUpdate)) {
						courseToUpdate[key] = action.payload[key];
					}
				}
			);
	},
});

export default coursesSlice.reducer;

export type { CoursesState };
