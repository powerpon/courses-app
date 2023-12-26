import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from 'src/components/Courses/components/CourseCard/CourseCard';

interface CoursesState {
	courses: Course[];
}

const initialCoursesState: CoursesState = { courses: [] };

const coursesSlice = createSlice({
	name: 'courses',
	initialState: initialCoursesState,
	reducers: {
		saveCourse: (state: CoursesState, action: PayloadAction<Course>) => {
			state.courses = [...state.courses, action.payload];
		},
		deleteCourse: (state: CoursesState, action: PayloadAction<string>) => {
			state.courses = state.courses.filter(
				(course: Course) => course.id !== action.payload
			);
		},
		updateCourse: (state: CoursesState, action: PayloadAction<Course>) => {
			const courseToUpdate = state.courses.find(
				(course) => course.id === action.payload.id
			);
			for (const key of Object.keys(courseToUpdate)) {
				courseToUpdate[key] = action.payload[key];
			}
		},
		fetchAllCourses: (state: CoursesState, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
		},
	},
});

export const { saveCourse, deleteCourse, updateCourse, fetchAllCourses } =
	coursesSlice.actions;

export default coursesSlice.reducer;

export type { CoursesState };
