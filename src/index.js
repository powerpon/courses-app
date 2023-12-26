import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';
import {
	CourseInfo,
	Courses,
	CreateCourse,
	EmptyCourseList,
	Login,
	Registration,
} from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/courses',
				element: <Courses />,
			},
			{
				path: '/courses/:courseId',
				element: <CourseInfo />,
			},
			{
				path: '/courses/add',
				element: <CreateCourse />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/registration',
				element: <Registration />,
			},
			{
				path: '*',
				element: <Navigate to='/courses' />,
			},
		],
	},
]);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
