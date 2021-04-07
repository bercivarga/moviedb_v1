import React from 'react';
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

import classes from './ScifiMovies.module.css';

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

export default function ComedyMovies() {
	const { scifi } = useGlobalContext();

	return (
		<React.Fragment>
			<h1 style={{ color: 'whitesmoke' }}>
				<span style={{ color: 'red' }}>Scifi</span> picks to explore
			</h1>
			<Carousel
				partialVisible={true}
				responsive={responsive}
				swipeable={true}
				draggable={true}
				className={classes.Content}
			>
				{scifi.map((m) => {
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
			</Carousel>
		</React.Fragment>
	);
}
