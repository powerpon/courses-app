import * as React from 'react';
import './EmptyCourseList.scss';
import { Button } from '../../common';
import { ADD_NEW_COURSE_BUTTON_TEXT } from '../../constants';

export default function EmptyCourseList() {
	return (
		<main className='empty-list'>
			<h3 className='empty-list-heading'>Your List Is Empty</h3>
			<p className='empty-list-instruction'>
				Please use 'Add New Course' button to add your first course
			</p>
			<Button buttonText={ADD_NEW_COURSE_BUTTON_TEXT} />
		</main>
	);
}
