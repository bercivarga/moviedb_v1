import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

import classes from './TrendingTv.module.css';

export default function TrendingTv() {
	const { trendingTv } = useGlobalContext();

	return (
		<React.Fragment>
			<h1 style={{ color: 'whitesmoke' }}>
				<span style={{ color: 'red' }}>Series</span> you don't want to miss
			</h1>
			<div className={classes.TrendingTv}>
				{trendingTv.map((t) => {
					return (
						<Link
							to={`/tv/${t.id}`}
							key={t.id}
							className={classes.TvCard}
							style={{
								backgroundImage: `url(https://image.tmdb.org/t/p/original/${t.backdrop_path})`,
								textDecoration: 'none',
								color: 'whitesmoke'
							}}
						>
							<div className={classes.Overlay}>
								<h2 className={classes.TvCardText}>{t.name}</h2>
							</div>
						</Link>
					);
				})}
			</div>
		</React.Fragment>
	);
}
