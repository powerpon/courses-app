export const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                    has been the industry's standard dummy text ever since the 1500s, when an unknown 
                    printer took a galley of type and scrambled it to make a type specimen book. It has survived 
                    not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                    nchanged.`,
		creationDate: '08/03/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                    has been the industry's standard dummy text ever since the 1500s, when an unknown 
                    printer took a galley of type and scrambled it to make a type specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];

export const LOGIN_BUTTON_TEXT = 'LOGIN';
export const SHOW_COURSE_BUTTON_TEXT = 'SHOW COURSE';
export const ADD_NEW_COURSE_BUTTON_TEXT = 'ADD NEW COURSE';
export const INPUT_BAR_PLACEHOLDER_TEXT = 'Input text';
export const SEARCH_BUTTON_TEXT = 'SEARCH';
export const BACK_BUTTON_TEXT = 'BACK';
export const REGISTER_BUTTON_TEXT = 'REGISTER';
export const LOGOUT_BUTTON_TEXT = 'LOGOUT';
export const CREATE_AUTHOR_BUTTON_TEXT = 'CREATE AUTHOR';
export const CANCEL_BUTTON_TEXT = 'CANCEL';
export const CREATE_COURSE_BUTTON_TEXT = 'CREATE COURSE';

export const SERVER_BASE_URL = 'http://localhost:4000/';
export const SERVER_FETCH_ALL_COURSES_URL = SERVER_BASE_URL + 'courses/all';
export const SERVER_FETCH_COURSE_BY_ID_URL = SERVER_BASE_URL + 'courses/';
export const SERVER_FETCH_ALL_AUTHORS_URL = SERVER_BASE_URL + 'authors/all';
export const SERVER_FETCH_AUTHOR_BY_ID_URL = SERVER_BASE_URL + 'authors/';
export const SERVER_POST_REGISTER_URL = SERVER_BASE_URL + 'register';
export const SERVER_POST_LOGIN_URL = SERVER_BASE_URL + 'login';
export const SERVER_FETCH_USER_URL = SERVER_BASE_URL + 'users/me';
export const SERVER_POST_LOGOUT_URL = SERVER_BASE_URL + 'logout';
export const SERVER_CREATE_AUTHOR_URL = SERVER_BASE_URL + 'authors/add';
export const SERVER_CREATE_COURSE_URL = SERVER_BASE_URL + 'courses/add';
export const SERVER_DELETE_COURSE_URL = SERVER_FETCH_COURSE_BY_ID_URL;
export const SERVER_UPDATE_COURSE_URL = SERVER_FETCH_COURSE_BY_ID_URL;
