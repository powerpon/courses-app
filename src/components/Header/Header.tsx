import * as React from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.scss';
import { LOGIN_BUTTON_TEXT, LOGOUT_BUTTON_TEXT } from '../../constants';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from 'src/store/user/slice';
import { getUserSelector } from 'src/store/user/selectors';
import endpoints from '../../services';

interface User {
	email: string;
	id: string;
	name: string;
}

export default function Header() {
	const locationPath: string = useLocation().pathname;
	const user = useSelector(getUserSelector);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		localStorage.removeItem('accessToken');
		endpoints.logoutUser(user.token).catch((error) => console.log(error));
		dispatch(logout());
	};

	React.useEffect(() => {
		if (localStorage.getItem('accessToken') !== null) {
			endpoints
				.getUser(localStorage.getItem('accessToken'))
				.then((response) => dispatch(login(response.data.result)))
				.catch((error) => console.log(error));
		}
	}, []);

	return (
		<header>
			<Logo className='header-logo' />
			{locationPath !== '/login' && locationPath !== '/registration' && (
				<div className='user-name-logout-btn'>
					<p className='user-name'>{user.isAuth && user.name}</p>
					<Link to={'/login'}>
						<Button
							onClick={user.isAuth ? handleLogout : undefined}
							buttonText={!user.isAuth ? LOGIN_BUTTON_TEXT : LOGOUT_BUTTON_TEXT}
							className='header-login-btn'
						/>
					</Link>
				</div>
			)}
		</header>
	);
}

export type { User };
