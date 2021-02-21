import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

import classes from './TrendingMovies.module.css';

export default function TrendingMovies() {
	const { trendingMovies } = useGlobalContext();

	return (
		<React.Fragment>
			<h1 style={{ color: 'whitesmoke' }}>Moves trending right now</h1>
			<div className={classes.TrendingMovies}>
				{trendingMovies.map((m) => {
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
							<h2 className={classes.MovieCardText}>{m.title}</h2>
							<div className={classes.Overlay} />
						</Link>
					);
				})}
			</div>
		</React.Fragment>
	);
}
