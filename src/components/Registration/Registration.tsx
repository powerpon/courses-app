import * as React from 'react';
import './Registration.scss';
import { Button, Input } from '../../common';
import { REGISTER_BUTTON_TEXT } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { sanitizeFormInput } from 'src/helpers';
import endpoints from '../../services';

export default function Registration() {
	const navigation = useNavigate();
	const [formInputName, setFormInputName]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [formInputEmail, setFormInputEmail]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [formInputPassword, setFormInputPassword]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');
	const [isMissingInputName, setIsMissingInputName]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);
	const [isMissingInputEmail, setIsMissingInputEmail]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);
	const [isMissingInputPassword, setIsMissingInputPassword]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>,
	] = React.useState(false);

	const handleFormSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const isMissingNameAfterSanitization = sanitizeFormInput(
			formInputName,
			setFormInputName,
			setIsMissingInputName
		);
		const isMissingEmailAfterSanitization = sanitizeFormInput(
			formInputEmail,
			setFormInputEmail,
			setIsMissingInputEmail
		);
		const isMissingPasswordAfterSanitization = sanitizeFormInput(
			formInputPassword,
			setFormInputPassword,
			setIsMissingInputPassword
		);
		if (
			!isMissingNameAfterSanitization &&
			!isMissingEmailAfterSanitization &&
			!isMissingPasswordAfterSanitization
		) {
			endpoints
				.registerUser(formInputName, formInputEmail, formInputPassword)
				.then(() => {
					navigation('/login');
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<main className='register'>
			<h3 className='register-title'>Registration</h3>
			<div className='register-form-wrapper'>
				<form
					onSubmit={handleFormSubmit}
					className='register-form'
					method='POST'
				>
					<label className='form-label' htmlFor='input-name'>
						Name
					</label>
					<Input
						id='input-name'
						value={formInputName}
						setValue={setFormInputName}
						className={
							'register-form-input' +
							(isMissingInputName ? ' missing-input' : '')
						}
					/>
					<p
						style={{ display: isMissingInputName ? 'block' : 'none' }}
						className='input-required-text'
					>
						Name is required
					</p>
					<label className='form-label' htmlFor='input-email'>
						Email
					</label>
					<Input
						id='input-email'
						value={formInputEmail}
						setValue={setFormInputEmail}
						className={
							'register-form-input' +
							(isMissingInputEmail ? ' missing-input' : '')
						}
					/>
					<p
						style={{ display: isMissingInputEmail ? 'block' : 'none' }}
						className='input-required-text'
					>
						Email is required
					</p>
					<label className='form-label' htmlFor='input-password'>
						Password
					</label>
					<Input
						id='input-password'
						value={formInputPassword}
						setValue={setFormInputPassword}
						className={
							'register-form-input' +
							(isMissingInputPassword ? ' missing-input' : '')
						}
						type='password'
					/>
					<p
						style={{ display: isMissingInputPassword ? 'block' : 'none' }}
						className='input-required-text'
					>
						Password is required
					</p>
					<Button
						className='register-form-btn'
						buttonText={REGISTER_BUTTON_TEXT}
					/>
				</form>
				<p className='register-login-prompt'>
					If you have an account you may <Link to={'/login'}>Login</Link>
				</p>
			</div>
		</main>
	);
}
