import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserSelector } from 'src/store/user/selectors';
import { UserState } from 'src/store/user/slice';

interface Props {
	children: JSX.Element;
}

export default function PrivateRoute(props: Props) {
	const user: UserState = useSelector(getUserSelector);

	return user.role === 'admin' ? (
		<>{props.children}</>
	) : (
		<Navigate to='/courses' />
	);
}
