import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

export default function TrendingMovies() {
	const { trendingMovies } = useGlobalContext();

	return (
		<div>
			{trendingMovies.map((m) => {
				return (
					<Link to={`/movie/${m.id}`} key={m.id}>
						<h2>{m.title}</h2>
					</Link>
				);
			})}
		</div>
	);
}
