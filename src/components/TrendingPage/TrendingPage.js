import React from 'react';
import TrendingMovies from './TrendingMovies/TrendingMovies';
import TrendingTv from './TrendingTv/TrendingTv';

import classes from './TrendingPage.module.css';

export default function TrendingPage() {
	return (
		<div>
			<TrendingMovies />
			<TrendingTv />
		</div>
	);
}
