import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';
import Carousel, { slidesToScrollPlugin } from '@brainhubeu/react-carousel';

import classes from './TrendingMovies.module.css';

export default function TrendingMovies() {
	const { trendingMovies } = useGlobalContext();

	return (
		<React.Fragment>
			<h1 style={{ color: 'whitesmoke' }}>
				<span style={{ color: 'red' }}>Movies</span> trending right now
			</h1>
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
