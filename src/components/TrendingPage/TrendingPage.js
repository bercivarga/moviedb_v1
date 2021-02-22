import React, { useMemo, useEffect } from 'react';
import TrendingMovies from './TrendingMovies/TrendingMovies';
import TrendingTv from './TrendingTv/TrendingTv';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../context';

import classes from './TrendingPage.module.css';

export default function TrendingPage() {
	const { trendingMovies, onDetailsPage, setOnDetailsPage } = useGlobalContext();

	const randomHighlight = Math.floor(Math.random() * 20);

	const memoizedHighlight = useMemo(
		() => {
			if (trendingMovies.length > 0)
				return (
					<Link to={`/movie/${trendingMovies[randomHighlight].id}`} style={{ textDecoration: 'none' }}>
						<div
							className={classes.Highlight}
							style={{
								backgroundImage: `url(https://image.tmdb.org/t/p/original/${trendingMovies[
									randomHighlight
								].backdrop_path})`
							}}
						>
							<div className={classes.Overlay} />
							<div className={classes.HighlightText}>
								<h4 style={{ marginBottom: '-20px' }}>Recommended for you</h4>
								<h1 style={{ fontSize: '56px' }}>{trendingMovies[randomHighlight].title}</h1>
								<p>{trendingMovies[randomHighlight].overview}</p>
							</div>
						</div>
					</Link>
				);
		},
		[ trendingMovies ]
	);

	const memoizedTrendingMovies = useMemo(() => {
		return <TrendingMovies />;
	}, []);

	const memoizedTrendingTv = useMemo(() => {
		return <TrendingTv />;
	}, []);

	useEffect(
		() => {
			//navbar fix
			setOnDetailsPage(false);
		},
		[ onDetailsPage ]
	);

	return (
		<React.Fragment>
			{memoizedHighlight}
			<div className={classes.TrendingContent}>
				{memoizedTrendingMovies}
				{memoizedTrendingTv}
			</div>
		</React.Fragment>
	);
}
