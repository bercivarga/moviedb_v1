import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context';

import { useParams } from 'react-router-dom';

import classes from './SingleContent.module.css';

const APIKEY = process.env.REACT_APP_API_KEY;

export default function SingleContent() {
	const [ content, setContent ] = useState({});

	const { id } = useParams();
	const { setOnDetailsPage, loading, setLoading } = useGlobalContext();

	useEffect(() => {
		try {
			setLoading(true);
			fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`)
				.then((res) => res.json())
				.then((data) => {
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
			<div className={classes.Card}>
				<div
					className={classes.Backdrop}
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original/${content.backdrop_path})`
					}}
				>
					<div className={classes.Overlay} />
				</div>
				<div className={classes.TopContent}>
					<img
						className={classes.Poster}
						src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
						alt={content.title}
					/>
					<div className={classes.Titles}>
						<div className={classes.TitleLine}>
							<h1>{content.title}</h1>
							<form action={content.homepage}>
								<input className={classes.Redirect} type="submit" value="Stream this content" />
							</form>
						</div>
						<div className={classes.Overview}>
							<p>{content.overview}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
