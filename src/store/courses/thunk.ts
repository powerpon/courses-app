import { createAsyncThunk } from '@reduxjs/toolkit';
import endpoints from 'src/services';

interface DeleteCourseParams {
	courseId: string;
	token: string;
}

interface SaveCourseParams {
	courseTitle: string;
	courseDescription: string;
	courseDuration: number;
	courseAuthorIds: string[];
	token: string;
}

type UpdateCourseParams = SaveCourseParams & { courseId: string };

export const deleteCourse = createAsyncThunk(
	'courses/deleteCourse',
	async (params: DeleteCourseParams) => {
		try {
			await endpoints.deleteCourseById(params.courseId, params.token);
			return params.courseId;
		} catch (error) {
			console.log(error);
		}
	}
);

export const saveCourse = createAsyncThunk(
	'courses/saveCourse',
	async (params: SaveCourseParams) => {
		try {
			const response = await endpoints.saveCourse(
				params.courseTitle,
				params.courseDescription,
				params.courseDuration,
				params.courseAuthorIds,
				params.token
			);
			return response.data.result;
		} catch (error) {
			console.log(error);
		}
	}
);

export const fetchAllCourses = createAsyncThunk(
	'courses/fetchAllCourses',
	async () => {
		try {
			const response = await endpoints.getAllCourses();
			return response.data.result;
		} catch (error) {
			console.log(error);
		}
	}
);

export const updateCourse = createAsyncThunk(
	'courses/updateCourse',
	async (params: UpdateCourseParams) => {
		try {
			const response = await endpoints.updateCourseById(
				params.courseId,
				params.token,
				params.courseTitle,
				params.courseDescription,
				params.courseDuration,
				params.courseAuthorIds
			);
			return response.data.result;
		} catch (error) {
			console.log(error);
		}
	}
);
