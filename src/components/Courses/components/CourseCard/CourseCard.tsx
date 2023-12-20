import * as React from 'react';
import { SHOW_COURSE_BUTTON_TEXT } from '../../../../constants';
import './CourseCard.scss';
import { formatCreationDate, getCourseDuration } from '../../../../helpers';
import { Button } from '../../../../common';

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
	authors: Author[];
	className?: string;
	setCourseInfoId: React.Dispatch<React.SetStateAction<string>>;
}

export default function CourseCard(props: Props) {
	const handleShowCourseInfo = () => {
		props.setCourseInfoId(props.course.id);
	};

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
							<pre className='meta-data-title'>Authors: </pre>
							{props.authors
								.filter((author: Author) =>
									props.course.authors.includes(author.id)
								)
								.map((author: Author) => author.name)
								.join(', ')}
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
					<Button
						buttonText={SHOW_COURSE_BUTTON_TEXT}
						onClick={handleShowCourseInfo}
					/>
				</div>
			</div>
		</article>
	);
}

export type { Course, Author };
