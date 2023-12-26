import axios from 'axios';
import {
	SERVER_CREATE_AUTHOR_URL,
	SERVER_CREATE_COURSE_URL,
	SERVER_DELETE_COURSE_URL,
	SERVER_FETCH_ALL_AUTHORS_URL,
	SERVER_FETCH_ALL_COURSES_URL,
	SERVER_FETCH_AUTHOR_BY_ID_URL,
	SERVER_FETCH_COURSE_BY_ID_URL,
	SERVER_FETCH_USER_URL,
	SERVER_POST_LOGIN_URL,
	SERVER_POST_LOGOUT_URL,
	SERVER_POST_REGISTER_URL,
} from './constants';

export default {
	getAllCourses: async () => {
		return await axios.get(SERVER_FETCH_ALL_COURSES_URL);
	},
	getAllAuthors: async () => {
		return await axios.get(SERVER_FETCH_ALL_AUTHORS_URL);
	},
	saveCourse: async (
		title: string,
		description: string,
		duration: number,
		authorIds: string[],
		token: string
	) => {
		return await axios.post(
			SERVER_CREATE_COURSE_URL,
			{
				title: title,
				description: description,
				duration: duration,
				authors: authorIds,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		);
	},
	saveAuthor: async (name: string, token: string) => {
		return await axios.post(
			SERVER_CREATE_AUTHOR_URL,
			{
				name: name,
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		);
	},
	logoutUser: async (token: string) => {
		await axios.delete(SERVER_POST_LOGOUT_URL, {
			headers: { Authorization: 'Bearer ' + token },
		});
	},
	getUser: async (token: string) => {
		return await axios.get(SERVER_FETCH_USER_URL, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
	},
	loginUser: async (email: string, password: string) => {
		return await axios.post(SERVER_POST_LOGIN_URL, {
			email: email,
			password: password,
		});
	},
	registerUser: async (name: string, email: string, password: string) => {
		await axios.post(SERVER_POST_REGISTER_URL, {
			name: name,
			email: email,
			password: password,
		});
	},
	getAuthorById: async (id: string) => {
		return await axios.get(SERVER_FETCH_AUTHOR_BY_ID_URL + id);
	},
	getCourseById: async (id: string) => {
		return await axios.get(SERVER_FETCH_COURSE_BY_ID_URL + id);
	},
	deleteCourseById: async (id: string, token: string) => {
		await axios.delete(SERVER_DELETE_COURSE_URL + id, {
			headers: { Authorization: 'Bearer ' + token },
		});
	},
};
