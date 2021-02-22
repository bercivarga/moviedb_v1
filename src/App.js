import Navbar from './components/ui/Navbar/Navbar';
import TrendingPage from './components/TrendingPage/TrendingPage';
import SearchedContent from './components/SearchedContent/SearchedContent';
import Error from './components/ui/Error/Error';
import { useGlobalContext } from './context';

import { Switch, Route } from 'react-router-dom';
import SingleContent from './components/SingleContent/SingleContent';
import classes from './App.module.css';

function App() {
	const { searching } = useGlobalContext();
	// test

	return (
		<div className="App">
			<Navbar />
			<Switch>
				<Route path="/movie/:id">
					<div>{searching ? <SearchedContent /> : <SingleContent />}</div>
				</Route>
				<Route path="/tv/:id">
					<div>{searching ? <SearchedContent /> : <SingleContent />}</div>
				</Route>
				<Route exact path="/">
					<div className={classes.LandingPage}>{searching ? <SearchedContent /> : <TrendingPage />}</div>
				</Route>
				<Route path="/*">
					<Error />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
