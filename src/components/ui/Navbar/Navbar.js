import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../../context';

import Searchbar from '../../Searchbar/Searchbar';

import classes from './Navbar.module.css';

export default function Navbar() {
	const { searching, onDetailsPage, setSearchTerm } = useGlobalContext();

	const resetPage = () => {
		setSearchTerm('');
	};

	return (
		<div className={searching || onDetailsPage ? classes.NavbarFixed : classes.Navbar}>
			<div className={classes.NavContent}>
				<Link to="/" className={classes.Logo}>
					<h1 onClick={resetPage}>
						BEfli<span style={{ color: 'red' }}>x</span>
					</h1>
				</Link>
				<Searchbar />
			</div>
		</div>
	);
}
