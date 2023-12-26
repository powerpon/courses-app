import * as React from 'react';
import './CreateCourse.scss';
import { Button, Input, TextArea } from '../../common';
import {
	CANCEL_BUTTON_TEXT,
	CREATE_AUTHOR_BUTTON_TEXT,
	CREATE_COURSE_BUTTON_TEXT,
} from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { Author } from '../Courses/components/CourseCard/CourseCard';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { getCourseDuration, sanitizeFormInput } from 'src/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {
	AuthorsState,
	fetchAllAuthors,
	saveAuthor,
} from 'src/store/authors/slice';
import { getAuthorsSelector } from 'src/store/authors/selectors';
import endpoints from '../../services';
import { UserState } from 'src/store/user/slice';
import { getUserSelector } from 'src/store/user/selectors';
import { saveCourse } from 'src/store/courses/slice';

export default function CreateCourse() {
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const authorsState: AuthorsState = useSelector(getAuthorsSelector);
	const user: UserState = useSelector(getUserSelector);
	const [courseAuthorList, setCourseAuthorList]: [
		Author[],
		React.Dispatch<React.SetStateAction<Author[]>>,
	] = React.useState([]);
	const [formInputAuthorName, setFormInputAuthorName]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [formInputCourseTitle, setFormInputCourseTitle]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [formInputCourseDescription, setFormInputCourseDescription]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [formInputCourseDuration, setFormInputCourseDuration]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [isMissingAuthorName, setIsMissingAuthorName]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);
	const [isMissingInputCourseTitle, setIsMissingInputCourseTitle]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);
	const [isMissingInputCourseDescription, setIsMissingInputCourseDescription]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);
	const [isMissingInputCourseDuration, setIsMissingInputCourseDuration]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);

	const handleCreateCourseFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		sanitizeFormInput(
			formInputCourseTitle,
			setFormInputCourseTitle,
			setIsMissingInputCourseTitle,
			3
		);
		sanitizeFormInput(
			formInputCourseDescription,
			setFormInputCourseDescription,
			setIsMissingInputCourseDescription,
			3
		);
		sanitizeFormInput(
			formInputCourseDuration,
			setFormInputCourseDuration,
			setIsMissingInputCourseDuration
		);
		if (
			!isMissingInputCourseTitle &&
			!isMissingInputCourseDescription &&
			!isMissingInputCourseDuration
		) {
			endpoints
				.saveCourse(
					formInputCourseTitle,
					formInputCourseDescription,
					Number.parseInt(formInputCourseDuration),
					courseAuthorList.map((author) => author.id),
					user.token
				)
				.then((response) => {
					dispatch(saveCourse(response.data.result));
					navigation('/courses');
				})
				.catch((error) => console.log(error));
		}
	};

	const handleCreateAuthorFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		sanitizeFormInput(
			formInputAuthorName,
			setFormInputAuthorName,
			setIsMissingAuthorName,
			3
		);
		if (!isMissingAuthorName) {
			endpoints
				.saveAuthor(formInputAuthorName, user.token)
				.then((response) => {
					dispatch(saveAuthor(response.data.result));
					setFormInputAuthorName('');
				})
				.catch((error) => console.log(error));
		}
	};

	React.useEffect(() => {
		endpoints
			.getAllAuthors()
			.then((response) => dispatch(fetchAllAuthors(response.data.result)))
			.catch((error) => console.log(error));
	}, []);

	return (
		<main className='course-create'>
			<h3 className='course-create-title'>Course Edit/Create Page</h3>
			<div className='course-create-form-wrapper'>
				<form
					onSubmit={handleCreateCourseFormSubmit}
					id='course-create-form'
					method='POST'
				></form>
				<form
					onSubmit={handleCreateAuthorFormSubmit}
					id='author-create-form'
					method='POST'
				></form>
				<ul className='create-course-main-sections'>
					<li className='create-course-main-info'>
						<p className='create-course-section-title'>Main Info</p>
						<label className='form-label' htmlFor='input-title'>
							Title
						</label>
						<Input
							id='input-title'
							value={formInputCourseTitle}
							setValue={setFormInputCourseTitle}
							className={
								'course-create-form-input' +
								(isMissingInputCourseTitle ? ' missing-input' : '')
							}
							form='course-create-form'
						/>
						<p
							style={{ display: isMissingInputCourseTitle ? 'block' : 'none' }}
							className='input-required-text'
						>
							Title must contain at least 2 characters
						</p>
						<label className='form-label' htmlFor='input-description'>
							Description
						</label>
						<TextArea
							id='input-description'
							value={formInputCourseDescription}
							setValue={setFormInputCourseDescription}
							className={
								'course-create-form-textarea' +
								(isMissingInputCourseDescription ? ' missing-input' : '')
							}
							form='course-create-form'
						/>
						<p
							style={{
								display: isMissingInputCourseDescription ? 'block' : 'none',
							}}
							className='input-required-text'
						>
							Description must contain at least 2 characters
						</p>
					</li>
					<li className='create-course-duration'>
						<p className='create-course-section-title'>Duration</p>
						<label className='form-label' htmlFor='input-duration'>
							Duration
						</label>
						<Input
							id='input-duration'
							value={formInputCourseDuration}
							setValue={setFormInputCourseDuration}
							className={
								'course-create-form-input-duration' +
								(isMissingInputCourseDuration ? ' missing-input' : '')
							}
							form='course-create-form'
							type='number'
							min={1}
						/>
						<label className='duration-label' htmlFor='input-duration'>
							{getCourseDuration(Number.parseInt(formInputCourseDuration))}{' '}
							hours
						</label>
						<p
							style={{
								display: isMissingInputCourseDuration ? 'block' : 'none',
							}}
							className='input-required-text'
						>
							Duration required
						</p>
					</li>
					<li className='create-course-authors'>
						<div className='create-author-wrapper'>
							<p className='create-course-section-title'>Authors</p>
							<label className='form-label' htmlFor='input-author-name'>
								Author Name
							</label>
							<Input
								id='input-author-name'
								value={formInputAuthorName}
								setValue={setFormInputAuthorName}
								className={
									'course-create-form-input-author-name' +
									(isMissingAuthorName ? ' missing-input' : '')
								}
								form='author-create-form'
							/>
							<Button
								className='author-create-form-btn'
								form='author-create-form'
								buttonText={CREATE_AUTHOR_BUTTON_TEXT}
							/>
							<p
								style={{ display: isMissingAuthorName ? 'block' : 'none' }}
								className='input-required-text'
							>
								Author Name must contain at least 2 characters
							</p>
						</div>
						<ul className='course-author-list'>
							<li className='create-course-section-title'>Course Authors</li>
							<ul>
								{courseAuthorList.length !== 0 ? (
									courseAuthorList.map((author) => (
										<li key={author.id}>
											<AuthorItem
												handleRemove={() => {
													setCourseAuthorList(
														courseAuthorList.filter(
															(auth) => auth.id !== author.id
														)
													);
												}}
												name={author.name}
											/>
										</li>
									))
								) : (
									<p>Author list empty</p>
								)}
							</ul>
						</ul>
					</li>
					<li className='create-course-all-authors'>
						<p className='create-course-section-title'>Authors List</p>
						<ul className='all-authors-list'>
							{authorsState.authors.map((author) =>
								courseAuthorList.length === 0 ? (
									<li key={author.id} className='all-authors-list-item'>
										<AuthorItem
											handleAdd={() => {
												setCourseAuthorList([...courseAuthorList, author]);
											}}
											name={author.name}
										/>
									</li>
								) : (
									courseAuthorList.filter((auth) => auth.id === author.id)
										.length === 0 && (
										<li key={author.id} className='all-authors-list-item'>
											<AuthorItem
												handleAdd={() => {
													setCourseAuthorList([...courseAuthorList, author]);
												}}
												name={author.name}
											/>
										</li>
									)
								)
							)}
						</ul>
					</li>
				</ul>
			</div>
			<div className='create-course-cancel-btn-wrapper'>
				<Link className='create-course-cancel-btn' to={'/courses'}>
					<Button buttonText={CANCEL_BUTTON_TEXT} />
				</Link>
				<Button
					form='course-create-form'
					onClick={handleCreateCourseFormSubmit}
					buttonText={CREATE_COURSE_BUTTON_TEXT}
				/>
			</div>
		</main>
	);
}
