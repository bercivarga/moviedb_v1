import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

import classes from './FantasyMovies.module.css';

export default function ComedyMovies() {
	const { fantasy } = useGlobalContext();

	return (
		<React.Fragment>
			<h1 style={{ color: 'whitesmoke' }}>
				<span style={{ color: 'red' }}>Fantasy</span> for your imagination
			</h1>
			<div className={classes.Content}>
				{fantasy.map((m) => {
					return (
						<Link
							to={`/movie/${m.id}`}
							key={m.id}
							className={classes.MovieCard}
							style={{
								backgroundImage: `url(https://image.tmdb.org/t/p/original/${m.backdrop_path})`,
								textDecoration: 'none',
								color: 'whitesmoke'
							}}
						>
							<div className={classes.Overlay}>
								<h2 className={classes.MovieCardText}>{m.title}</h2>
							</div>
						</Link>
					);
				})}
			</div>
		</React.Fragment>
	);
}
