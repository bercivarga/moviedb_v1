import React, { useEffect, useRef } from 'react';
import classes from './Searchbar.module.css';
import { useGlobalContext } from '../../context';
import { FaSearch } from 'react-icons/fa';

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

	const onIconClick = () => {
		input.current.focus();
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
			<div className={classes.Searchbar}>
				<input
					type="text"
					ref={input}
					value={searchTerm}
					onChange={(e) => {
						handleChange(e);
					}}
				/>
				<FaSearch className={classes.Icon} onClick={onIconClick} />
			</div>
		</form>
	);
}
