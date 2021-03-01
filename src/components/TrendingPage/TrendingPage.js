import React, { useState, useMemo, useEffect, useCallback } from 'react';
import TrendingMovies from './TrendingMovies/TrendingMovies';
import TrendingTv from './TrendingTv/TrendingTv';
import ActionMovies from './ActionMovies/ActionMovies';
import DramaMovies from './DramaMovies/DramaMovies';
import ComedyMovies from './ComedyMovies/ComedyMovies';
import FantasyMovies from './FantasyMovies/FantasyMovies';
import ScifiMovies from './ScifiMovies/ScifiMovies';
import { Link } from 'react-router-dom';

import { useGlobalContext } from '../../context';

import classes from './TrendingPage.module.css';

export default function TrendingPage() {
	const {
		trendingMovies,
		trendingTv,
		onDetailsPage,
		setOnDetailsPage,
		randomHighlight,
		randomType
	} = useGlobalContext();

	const memoizedHighlight = useMemo(
		() => {
			if (trendingMovies.length > 0) {
				let shortenedOverview = trendingMovies[randomHighlight].overview;
				if (shortenedOverview.length > 160) {
					shortenedOverview = shortenedOverview.substring(0, 160) + '...';
				}

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
								<p>{shortenedOverview}</p>
							</div>
						</div>
					</Link>
				);
			}
		},
		[ trendingMovies, trendingTv ]
	);

	const memoizedHighlightTv = useMemo(
		() => {
			if (trendingTv.length > 0) {
				let shortenedOverview = trendingTv[randomHighlight].overview;
				if (shortenedOverview.length > 160) {
					shortenedOverview = shortenedOverview.substring(0, 160) + '...';
				}

				return (
					<Link to={`/tv/${trendingTv[randomHighlight].id}`} style={{ textDecoration: 'none' }}>
						<div
							className={classes.Highlight}
							style={{
								backgroundImage: `url(https://image.tmdb.org/t/p/original/${trendingTv[randomHighlight]
									.backdrop_path})`
							}}
						>
							<div className={classes.Overlay} />
							<div className={classes.HighlightText}>
								<h4 style={{ marginBottom: '-20px' }}>Recommended for you</h4>
								<h1 style={{ fontSize: '56px' }}>{trendingTv[randomHighlight].name}</h1>
								<p>{shortenedOverview}</p>
							</div>
						</div>
					</Link>
				);
			}
		},
		[ trendingTv, trendingMovies ]
	);

	const memoizedTrendingMovies = useMemo(() => {
		return <TrendingMovies />;
	}, []);

	const memoizedTrendingTv = useMemo(() => {
		return <TrendingTv />;
	}, []);

	const memoizedAction = useMemo(() => {
		return <ActionMovies />;
	}, []);

	const memoizedDrama = useMemo(() => {
		return <DramaMovies />;
	}, []);

	const memoizedComedy = useMemo(() => {
		return <ComedyMovies />;
	}, []);

	const memoizedFantasy = useMemo(() => {
		return <FantasyMovies />;
	}, []);

	const memoizedScifi = useMemo(() => {
		return <ScifiMovies />;
	}, []);

	useEffect(
		() => {
			//navbar fix
			setOnDetailsPage(false);
		},
		[ onDetailsPage, trendingMovies, trendingTv ]
	);

	return (
		<React.Fragment>
			{randomType ? memoizedHighlight : memoizedHighlightTv}
			<div className={classes.TrendingContent}>
				{memoizedTrendingMovies}
				{memoizedTrendingTv}
				{memoizedAction}
				{memoizedDrama}
				{memoizedComedy}
				{memoizedFantasy}
				{memoizedScifi}
				<div style={{ textAlign: 'center', color: 'whitesmoke' }}>
					<p>
						<strong>Made with&nbsp; ❤️ &nbsp;&nbsp; by Berci</strong>
					</p>
					<p>in Rotterdam</p>
				</div>
			</div>
		</React.Fragment>
	);
}
