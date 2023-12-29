import React from 'react';
import './EmptyCourseList.scss';
import { Link } from 'react-router-dom';
import { UserState } from 'src/store/user/slice';
import { useSelector } from 'react-redux';
import { getUserSelector } from 'src/store/user/selectors';
import { Button } from 'src/common';
import { ADD_NEW_COURSE_BUTTON_TEXT } from 'src/constants';

export default function EmptyCourseList() {
	const user: UserState = useSelector(getUserSelector);

	return (
		<main className='empty-list'>
			<h3 className='empty-list-heading'>Your List Is Empty</h3>
			<p className='empty-list-instruction'>
				Please use 'Add New Course' button to add your first course
			</p>
			{user.role === 'admin' ? (
				<Link to={'/courses/add'}>
					<Button buttonText={ADD_NEW_COURSE_BUTTON_TEXT} />
				</Link>
			) : (
				<p className='empty-list-instruction'>
					You don't have permissions to create a course. Please log in as ADMIN
				</p>
			)}
		</main>
	);
}
