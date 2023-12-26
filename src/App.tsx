import './App.scss';
import React from 'react';
import { Header } from './components';
import { Outlet } from 'react-router-dom';

export default function App() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
