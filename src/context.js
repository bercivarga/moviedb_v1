import React, { useState, useEffect, useContext, useCallback } from 'react';

const APIKEY = process.env.REACT_APP_API_KEY;

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	const [ loading, setLoading ] = useState(false);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ trendingMovies, setTrendingMovies ] = useState([]);
	const [ trendingTv, setTrendingTv ] = useState([]);
	const [ searchedContent, setSearchedContent ] = useState([]);
	const [ searching, setSearching ] = useState(false);
	const [ noResults, setNoResults ] = useState(false);

	useEffect(
		() => {
			const timer = setTimeout(() => {
				setSearchedContent([]);
				setNoResults(false);
				searchContent();
			}, 500);
			return () => {
				clearTimeout(timer);
			};
		},
		[ searchTerm ]
	);

	useEffect(() => {
		fetchTrendingMovies();
		fetchTrendingTv();
	}, []);

	const searchContent = useCallback(
		() => {
			if (searchTerm === '') {
				setSearchedContent([]);
				return;
			}
			try {
				fetch(`https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&page=1&query=${searchTerm}`)
					.then((res) => res.json())
					.then((data) => {
						setLoading(false);
						if (data.results.length === 0) {
							setNoResults(true);
						}
						setSearchedContent(data.results);
						console.log(data);
					});
			} catch (error) {
				console.error(error);
			}
		},
		[ searchTerm ]
	);

	const fetchTrendingMovies = useCallback(() => {
		setLoading(true);
		try {
			fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}`)
				.then((res) => res.json())
				.then((data) => {
					setLoading(false);
					setTrendingMovies(data.results);
					console.log(data);
				});
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	const fetchTrendingTv = useCallback(() => {
		setLoading(true);
		try {
			fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${APIKEY}`)
				.then((res) => res.json())
				.then((data) => {
					setLoading(false);
					setTrendingTv(data.results);
					console.log(data);
				});
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				loading,
				searchTerm,
				setSearchTerm,
				trendingTv,
				trendingMovies,
				searchedContent,
				searching,
				setSearching,
				noResults
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppProvider, AppContext };
