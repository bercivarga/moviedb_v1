import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../../context';

import Searchbar from '../../Searchbar/Searchbar';

import classes from './Navbar.module.css';

export default function Navbar() {
	const { searching, onDetailsPage } = useGlobalContext();

	return (
		<div className={searching || onDetailsPage ? classes.NavbarFixed : classes.Navbar}>
			<div className={classes.NavContent}>
				<div className={classes.LeftSideNav}>
					<Link to="/" className={classes.Logo}>
						<h1>BEflix</h1>
					</Link>
					<Searchbar />
				</div>

				<div className={classes.Links}>
					<span>
						<NavLink to="/about" className={classes.Link} activeStyle={{ color: 'red' }}>
							About this app
						</NavLink>
					</span>
					<span>
						<NavLink to="/login" className={classes.Link} activeStyle={{ color: 'red' }}>
							Log in
						</NavLink>
					</span>
				</div>
			</div>
		</div>
	);
}
