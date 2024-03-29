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

	// additional genres for trending page
	const [ action, setAction ] = useState([]);
	const [ drama, setDrama ] = useState([]);
	const [ comedy, setComedy ] = useState([]);
	const [ fantasy, setFantasy ] = useState([]);
	const [ scifi, setScifi ] = useState([]);

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
		fetchAction();
		fetchDrama();
		fetchComedy();
		fetchFantasy();
		fetchScifi();
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
					});
			} catch (error) {
				setLoading(false);
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
				});
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	const fetchAction = useCallback(() => {
		setLoading(true);
		try {
			fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=28`)
				.then((res) => res.json())
				.then((data) => {
					setLoading(false);
					setAction(data.results);
				});
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	const fetchDrama = useCallback(() => {
		setLoading(true);
		try {
			fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=18`)
				.then((res) => res.json())
				.then((data) => {
					setLoading(false);
					setDrama(data.results);
				});
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	const fetchComedy = useCallback(() => {
		setLoading(true);
		try {
			fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=35`)
				.then((res) => res.json())
				.then((data) => {
					setLoading(false);
					setComedy(data.results);
				});
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	const fetchFantasy = useCallback(() => {
		setLoading(true);
		try {
			fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=14`)
				.then((res) => res.json())
				.then((data) => {
					setLoading(false);
					setFantasy(data.results);
				});
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	}, []);

	const fetchScifi = useCallback(() => {
		setLoading(true);
		try {
			fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}&with_genres=878`)
				.then((res) => res.json())
				.then((data) => {
					setLoading(false);
					setScifi(data.results);
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
				randomType,
				action,
				drama,
				comedy,
				fantasy,
				scifi
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
