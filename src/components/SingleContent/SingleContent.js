import React from 'react';

import { useParams } from 'react-router-dom';

import classes from './SingleContent.module.css';

export default function SingleContent() {
	const { id } = useParams();

	// fetch the data from the server again for a single piece of content

	return (
		<div>
			<h1>You searched for content with the ID of: {id}</h1>
		</div>
	);
}
