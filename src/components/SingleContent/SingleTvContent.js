import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';

import { useParams } from 'react-router-dom';

import classes from './SingleContent.module.css';

const APIKEY = process.env.REACT_APP_API_KEY;

export default function SingleContent() {
	const [ content, setContent ] = useState({});

	const { id } = useParams();
	const { onDetailsPage, setOnDetailsPage, loading, setLoading } = useGlobalContext();

	useEffect(() => {
		//a wonky solution for the single page content, needs to be refined for a single request
		try {
			setLoading(true);
			fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${APIKEY}`).then((res) => res.json()).then((data) => {
				console.log(data);
				setContent(data);
				setLoading(false);
			});
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
		//navbar fix
		setOnDetailsPage(true);
	}, []);

	if (loading) return <h1>Loading</h1>;

	return (
		<div className={classes.SingleContent}>
			<div
				className={classes.Backdrop}
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${content.backdrop_path})`
				}}
			/>
			<div className={classes.Overlay} />
			<img
				className={classes.Poster}
				src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
				alt={content.name}
			/>
			<h1>{content.name}</h1>
			<p>{content.overview}</p>
			<p>{content.release_date}</p>
			<p>{content.vote_average}</p>
			<p>{content.vote_count}</p>
			<form className={classes.Redirect} action={content.homepage}>
				<input type="submit" value="Stream this content" />
			</form>
		</div>
	);
}
