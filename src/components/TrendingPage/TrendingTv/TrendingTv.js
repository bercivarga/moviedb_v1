import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

export default function TrendingTv() {
	const { trendingTv } = useGlobalContext();

	return (
		<div>
			{trendingTv.map((t) => {
				return (
					<Link to={`/tv/${t.id}`} key={t.id}>
						<h2>{t.name}</h2>
					</Link>
				);
			})}
		</div>
	);
}
