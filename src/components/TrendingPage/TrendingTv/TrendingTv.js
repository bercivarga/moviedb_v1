import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

import classes from './TrendingTv.module.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 1920 },
		items: 4,
		partialVisibilityGutter: 20
	},
	desktop: {
		breakpoint: { max: 1919, min: 1024 },
		items: 3,
		partialVisibilityGutter: 20
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
		partialVisibilityGutter: 270
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		partialVisibilityGutter: 30
	}
};

export default function TrendingTv() {
	const { trendingTv } = useGlobalContext();

	return (
		<React.Fragment>
			<h1 style={{ color: 'whitesmoke' }}>
				<span style={{ color: 'red' }}>Series</span> you don't want to miss
			</h1>
			<Carousel
				partialVisible={true}
				responsive={responsive}
				swipeable={true}
				draggable={true}
				className={classes.TrendingTv}
			>
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
			</Carousel>
		</React.Fragment>
	);
}
