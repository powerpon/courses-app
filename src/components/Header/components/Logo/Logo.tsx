import * as React from 'react';
import logo from '../../../../assets/logo.png';
import './Logo.scss';

interface Props {
	className?: string;
}

export default function Logo(props: Props) {
	return <img className={'logo ' + props.className} src={logo} alt='logo' />;
}
