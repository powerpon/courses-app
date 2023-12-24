import * as React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.scss';
import {
	LOGIN_BUTTON_TEXT,
	LOGOUT_BUTTON_TEXT,
	SERVER_FETCH_USER_URL,
	SERVER_POST_LOGOUT_URL,
} from '../../constants';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

interface User {
	email: string;
	id: string;
	name: string;
}

export default function Header() {
	const locationPath: string = useLocation().pathname;
	const [user, setUser]: [User, React.Dispatch<React.SetStateAction<User>>] =
		React.useState(undefined);
	const [token, setToken]: [
		string,
		React.Dispatch<React.SetStateAction<string>>,
	] = React.useState('');

	const handleLogout = async () => {
		localStorage.removeItem('accessToken');
		await axios.delete(SERVER_POST_LOGOUT_URL, {
			headers: { Authorization: 'Bearer ' + token },
		});
		setUser(undefined);
		setToken('');
	};

	React.useEffect(() => {
		const getUser = async () => {
			const userToken = localStorage.getItem('accessToken');
			if (userToken !== null) {
				setToken(userToken);
				const response = await axios.get(SERVER_FETCH_USER_URL, {
					headers: { Authorization: 'Bearer ' + userToken },
				});
				setUser(response.data.result);
			}
		};
		getUser();
	}, [locationPath]);

	return (
		<header>
			<Logo className='header-logo' />
			{locationPath !== '/login' && locationPath !== '/registration' && (
				<div className='user-name-logout-btn'>
					<p className='user-name'>{user && user.name}</p>
					<Link to={'/login'}>
						<Button
							onClick={user && handleLogout}
							buttonText={!user ? LOGIN_BUTTON_TEXT : LOGOUT_BUTTON_TEXT}
							className='header-login-btn'
						/>
					</Link>
				</div>
			)}
		</header>
	);
}

export type { User };
