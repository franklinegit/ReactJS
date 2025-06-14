import React, { useState, useEffect }from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import {useDebounce} from 'react-use'
import { updateSearchCount, getTrendingMovies } from './appwrite'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
	method: 'GET',
	headers: {
		accept: `application/json`,
		Authorization: `Bearer ${API_KEY}`
	}
}

const App = () => {

	const [searchTerm, setsearchTerm] = useState('');
	const [errorMessage, seterrorMessage] = useState('');
	const [movieList, setmovieList] = useState([]);
	const [trendingMovies, settrendingMovies] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');

	// Debounce search term
	useDebounce(() => setdebouncedSearchTerm(searchTerm), 1000, [searchTerm]);


	// Fetch Movies
	const fetchMovies = async (query = '') => {
		setisLoading(true);
		seterrorMessage('');

		try {
			const endpoint = query ? 
			`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
			`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

			const response = await fetch(endpoint, API_OPTIONS);

			if (!response.ok) {
				throw new Error(`Failed to fetch movies`);
			}

			const data = await response.json();

			console.log(data);

			if (data.Response === 'False') {
				seterrorMessage(data.Error || 'Failed to fetch movies');
				setmovieList([]);
				return;
			}

			setmovieList(data.results || []);

			if (query && data.results[0]) {
				updateSearchCount(query, data.results[0]);
			}
		}

		catch(e) {
			console.error(`Error fetching movies: ${e}`);
			seterrorMessage(`Error fetching movies. Please try again later.`)
		}

		finally {
			setisLoading(false);
		}
	}

	const loadTrendingMovies = async () => {
		try {
			const movies = await getTrendingMovies();

			settrendingMovies(movies);
		}

		catch(error) {
			console.error('Error fetching trending movies: ', error);
		}
	}

	useEffect(() => {
		fetchMovies(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	useEffect(() => {
		loadTrendingMovies();
	}, []);
	
	

  return (
		<main>
			<div className="pattern" />

			<div className="wrapper">
				<header>
					<img src="./hero.png" alt="Hero Banner" />
					<h1>
						<span className='text-gradient'>Movie </span><span className='text-gradient'>Hub</span> <br />
						Your Favorites a Click Away
					</h1>

					<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
				</header>

				{trendingMovies.length > 0 && (
					<section className='trending'>
						<h2 className='text-center'>Trending Movies</h2>

						<ul>
							{trendingMovies.map((movie, index) => (
								<li key={movie.$id}>
									<p>{index + 1}</p>
									<img src={movie.poster_url} alt={movie.title} />
								</li>
							))}
						</ul>
					</section>
				)}

				<section className="all-movies">
					<h2 className='mt-[40px]'>All Movies</h2>

					{isLoading ? (
						<Spinner />
					) : errorMessage ? (
						<p className='text-red-500'>{errorMessage}</p>
					) : (
						<ul>
							{movieList.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</ul>
					)}

					{errorMessage && <p className='text-red-500'>{errorMessage}</p> }
				</section>
			</div>
		</main>
  )
}

export default App