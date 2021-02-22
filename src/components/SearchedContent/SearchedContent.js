import React, { useRef } from 'react';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';

import classes from './SearchedContent.module.css';

export default function SearchedMovies() {
	const { searchedContent, noResults, setSearching } = useGlobalContext();

	const handleClick = () => {
		setSearching(false);
	};

	return noResults ? (
		<h1>No results found, please refine your search.</h1>
	) : (
		<div className={classes.SearchedContent}>
			{searchedContent.map((m) => {
				let backDrop = '';
				let backdropPath = '';
				if (m.backdrop_path === null && m.poster_path === null) {
					backdropPath = 'https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png';
				} else if (m.backdrop_path) {
					backDrop = m.backdrop_path;
					backdropPath = `https://image.tmdb.org/t/p/original/${backDrop}`;
				} else if (m.poster_path) {
					backDrop = m.poster_path;
					backdropPath = `https://image.tmdb.org/t/p/original/${backDrop}`;
				}

				return (
					<Link
						key={m.id}
						to={`/${m.media_type === 'movie' ? 'movie' : 'tv'}/${m.id}`}
						onClick={handleClick}
						className={classes.MovieCard}
						style={{
							backgroundImage: `url(${backdropPath})`,
							backgroundSize: 'cover',
							textDecoration: 'none',
							color: 'whitesmoke'
						}}
					>
						<h2 className={classes.MovieCardText}>{m.media_type === 'movie' ? m.title : m.name}</h2>
						<div className={classes.Overlay} />
					</Link>
				);
			})}
		</div>
	);
}
