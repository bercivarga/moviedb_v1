import React, { useState, useEffect, useContext, useCallback } from 'react';

const APIKEY = process.env.REACT_APP_API_KEY;

const AppContext = React.createContext();

export default function AppProvider({ children }) {
	const [ loading, setLoading ] = useState(true);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ trendingMovies, setTrendingMovies ] = useState([]);
	const [ trendingTv, setTrendingTv ] = useState([]);
	const [ searchedContent, setSearchedContent ] = useState([]);
	const [ searching, setSearching ] = useState(false);
	const [ noResults, setNoResults ] = useState(false);
	// navbar fix
	const [ onDetailsPage, setOnDetailsPage ] = useState(false);

	// highlight fix
	const [ randomType, setRandomType ] = useState(null);
	const [ randomHighlight, setRandomHighight ] = useState(null);

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

	useEffect(
		() => {
			getRandomType();
			getRandomHighlight();
		},
		[ onDetailsPage ]
	);

	useEffect(() => {
		fetchTrendingMovies();
		fetchTrendingTv();
	}, []);

	const getRandomType = useCallback(() => {
		setRandomType(Math.floor(Math.random() * 2));
	}, []);

	const getRandomHighlight = useCallback(() => {
		setRandomHighight(Math.floor(Math.random() * 20));
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
				setLoading,
				searchTerm,
				setSearchTerm,
				trendingTv,
				trendingMovies,
				searchedContent,
				searching,
				setSearching,
				noResults,
				onDetailsPage,
				setOnDetailsPage,
				randomHighlight,
				randomType
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
