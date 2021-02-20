import React from 'react';
import { Link } from 'react-router-dom';

import Searchbar from '../../Searchbar/Searchbar';

import classes from './Navbar.module.css';

export default function Navbar() {
	return (
		<div className={classes.Navbar}>
			<Link to="/" className={classes.Logo}>
				<h1>LOGO COMES HERE</h1>
			</Link>
			<Searchbar />
			<div className={classes.Links}>
				<span>
					<Link to="/about" className={classes.Link}>
						About us
					</Link>
				</span>
				<span>
					<Link to="/login" className={classes.Link}>
						Log in
					</Link>
				</span>
			</div>
		</div>
	);
}
