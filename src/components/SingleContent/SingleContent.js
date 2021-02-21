import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context';

import { useParams } from 'react-router-dom';

import classes from './SingleContent.module.css';

export default function SingleContent() {
	const { id } = useParams();
	const { onDetailsPage, setOnDetailsPage } = useGlobalContext();

	// fetch the data from the server again for a single piece of content
	useEffect(
		() => {
			try {
				//navbar fix
				setOnDetailsPage(true);
			} catch (error) {
				console.error(error);
			}
		},
		[ onDetailsPage ]
	);

	return (
		<div>
			<h1>You searched for content with the ID of: {id}</h1>
		</div>
	);
}
