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
	Login,
	Registration,
} from './components';
import { Provider } from 'react-redux';
import { store } from './store';

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
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
