import * as React from 'react';
import { SHOW_COURSE_BUTTON_TEXT } from '../../../../constants';
import './CourseCard.scss';
import { formatCreationDate, getCourseDuration } from '../../../../helpers';
import { Button } from '../../../../common';
import { Link } from 'react-router-dom';
import AuthorsMetaData from 'src/common/AuthorsMetaData/AuthorsMetaData';

interface Course {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

interface Author {
	id: string;
	name: string;
}

interface Props {
	course: Course;
	authorIds: string[];
	className?: string;
}

export default function CourseCard(props: Props) {
	return (
		<article className={'card ' + props.className}>
			<p className='card-title'>{props.course.title}</p>
			<div className='card-main-section'>
				<blockquote className='card-description'>
					{props.course.description}
				</blockquote>
				<div className='card-meta-data-btn'>
					<ul className='card-meta-data'>
						<li className='meta-data-info'>
							<AuthorsMetaData authorIds={props.course.authors} />
						</li>
						<li className='meta-data-info'>
							<pre className='meta-data-title'>Duration: </pre>
							{getCourseDuration(props.course.duration) + ' hours'}
						</li>
						<li className='meta-data-info'>
							<pre className='meta-data-title'>Created: </pre>
							{formatCreationDate(props.course.creationDate)}
						</li>
					</ul>
					<Link to={`/courses/${props.course.id}`}>
						<Button buttonText={SHOW_COURSE_BUTTON_TEXT} />
					</Link>
				</div>
			</div>
		</article>
	);
}

export type { Course, Author };
