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
		<div>
			{searchedContent.map((m) => {
				return (
					<Link key={m.id} to={`/${m.media_type === 'movie' ? 'movie' : 'tv'}/${m.id}`} onClick={handleClick}>
						<h2>{m.title}</h2>
					</Link>
				);
			})}
		</div>
	);
}
