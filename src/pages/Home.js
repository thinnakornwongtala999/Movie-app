import React, { useState, useEffect } from 'react'
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourite from '../components/AddToFavourites';
import RemoveFavourites from '../components/RemoveFavourites';

export const Home = () => {
  const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites, setFavourites] = useState([]);
  	const [loading, setLoading] = useState(false);

  const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?apikey=6cd313ff&s=${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();
    // console.log('responseJson', responseJson)
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
    if (!movieFavourites && Array.isArray(movieFavourites)) {
      setFavourites(movieFavourites);
    }
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
    console.log("movie.imdbID",movie.imdbID)

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  return <div className='container-fluid movie-app'>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Movies' />
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
          <div className='row'>
            <MovieList
              movies={movies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddFavourite}
            />
          </div>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites' />
          </div>
          <div className='row'>
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
            />
          </div>
        </div>
}
