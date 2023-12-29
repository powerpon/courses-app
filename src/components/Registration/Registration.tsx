import './Registration.scss';
import { Button, Input } from 'src/common';
import { REGISTER_BUTTON_TEXT } from 'src/constants';
import { Link, useNavigate } from 'react-router-dom';
import { sanitizeFormInput } from 'src/helpers';
import endpoints from 'src/services';
import React, { FormEvent, useState } from 'react';

export default function Registration() {
	const navigation = useNavigate();
	const [formInputName, setFormInputName] = useState('');
	const [formInputEmail, setFormInputEmail] = useState('');
	const [formInputPassword, setFormInputPassword] = useState('');
	const [isMissingInputName, setIsMissingInputName] = useState(false);
	const [isMissingInputEmail, setIsMissingInputEmail] = useState(false);
	const [isMissingInputPassword, setIsMissingInputPassword] = useState(false);

	const handleFormSubmit = (event: FormEvent) => {
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
