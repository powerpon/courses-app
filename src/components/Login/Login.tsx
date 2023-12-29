import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from 'src/common';
import { LOGIN_BUTTON_TEXT } from 'src/constants';
import './Login.scss';
import { sanitizeFormInput } from 'src/helpers';
import endpoints from 'src/services';
import React, { FormEvent, useState } from 'react';

export default function Login() {
	const navigation = useNavigate();
	const [formInputEmail, setFormInputEmail] = useState('');
	const [formInputPassword, setFormInputPassword] = useState('');
	const [isMissingInputEmail, setIsMissingInputEmail] = useState(false);
	const [isMissingInputPassword, setIsMissingInputPassword] = useState(false);

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
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
			!isMissingEmailAfterSanitization &&
			!isMissingPasswordAfterSanitization
		) {
			endpoints
				.loginUser(formInputEmail, formInputPassword)
				.then((response) => {
					localStorage.setItem(
						'accessToken',
						response.data.result.slice('Bearer '.length)
					);
					navigation('/courses');
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<main className='login'>
			<h3 className='login-title'>Login</h3>
			<div className='login-form-wrapper'>
				<form onSubmit={handleFormSubmit} className='login-form' method='POST'>
					<label className='form-label' htmlFor='input-email'>
						Email
					</label>
					<Input
						id='input-email'
						value={formInputEmail}
						setValue={setFormInputEmail}
						className={
							'login-form-input' + (isMissingInputEmail ? ' missing-input' : '')
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
							'login-form-input' +
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
					<Button className='login-form-btn' buttonText={LOGIN_BUTTON_TEXT} />
				</form>
				<p className='login-register-prompt'>
					If you don't have an account you may{' '}
					<Link to={'/registration'}>Register</Link>
				</p>
			</div>
		</main>
	);
}
