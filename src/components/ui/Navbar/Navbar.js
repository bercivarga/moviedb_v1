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
				<div className={classes.LeftSideNav}>
					<Link to="/" className={classes.Logo}>
						<h1 onClick={resetPage}>
							BEfli<span style={{ color: 'red' }}>x</span>
						</h1>
					</Link>
					<Searchbar />
				</div>

				<div className={classes.Links}>
					<span>
						<NavLink
							to="/about"
							className={classes.Link}
							activeStyle={{
								textDecorationLine: 'underline',
								textDecorationThickness: '2px',
								textDecorationStyle: 'solid',
								textDecorationColor: 'red',
								textUnderlineOffset: '4px',
								transition: 'all .4s linear'
							}}
						>
							About
						</NavLink>
					</span>
					<span>
						<NavLink
							to="/login"
							className={classes.Link}
							activeStyle={{
								textDecorationLine: 'underline',
								textDecorationThickness: '2px',
								textDecorationStyle: 'solid',
								textDecorationColor: 'red',
								textUnderlineOffset: '4px',
								transition: 'all .4s linear'
							}}
						>
							Log in
						</NavLink>
					</span>
				</div>
			</div>
		</div>
	);
}
