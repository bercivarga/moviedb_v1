import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Searchbar from '../../Searchbar/Searchbar';

import classes from './Navbar.module.css';

export default function Navbar() {
	return (
		<div className={classes.Navbar}>
			<div className={classes.LeftSideNav}>
				<Link to="/" className={classes.Logo}>
					<h1>LOGO COMES HERE</h1>
				</Link>
				<Searchbar />
			</div>

			<div className={classes.Links}>
				<span>
					<NavLink to="/about" className={classes.Link} activeStyle={{ color: 'red' }}>
						About us
					</NavLink>
				</span>
				<span>
					<NavLink to="/login" className={classes.Link} activeStyle={{ color: 'red' }}>
						Log in
					</NavLink>
				</span>
			</div>
		</div>
	);
}
