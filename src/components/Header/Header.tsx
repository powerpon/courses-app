import * as React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.scss';
import { LOGIN_BUTTON_TEXT } from '../../constants';

export default function Header() {
	return (
		<header>
			<Logo className='header-logo' />
			<Button buttonText={LOGIN_BUTTON_TEXT} className='header-login-btn' />
		</header>
	);
}
