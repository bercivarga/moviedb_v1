import React, { useEffect, useRef } from 'react';
import classes from './Searchbar.module.css';
import { useGlobalContext } from '../../context';

export default function Searchbar() {
	const { searchTerm, setSearchTerm, setSearching, setOnDetailsPage } = useGlobalContext();

	const input = useRef('');

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
		setSearching(true);
	};

	useEffect(
		() => {
			if (input.current.value === '') {
				setSearching(false);
				// navbar fix
				setOnDetailsPage(false);
			}
		},
		[ searchTerm ]
	);

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				ref={input}
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => {
					handleChange(e);
				}}
			/>
		</form>
	);
}
