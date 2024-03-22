import React, { useState, useEffect } from 'react'
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourite from '../components/AddToFavourites';
import RemoveFavourites from '../components/RemoveFavourites';
import { useSearchParams } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites, setFavourites] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?apikey=6cd313ff&s=${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson.Search) {
			setMovies(responseJson.Search);
      console.log(responseJson.Search);
      sessionStorage.setItem("key", JSON.stringify(responseJson.Search));
		}
	};
  // useEffect(() => {
  //   const response = JSON.parse(sessionStorage.getItem("key"));
  //   setMovies(response);
  // })

  useEffect(() => {
    if (!searchParams.get('id')) {
      
      if (sessionStorage.getItem("key") === null){
        getMovieRequest(searchValue);
      }
      else {
        const response = JSON.parse(sessionStorage.getItem("key"));
        setMovies(response);
      }
    }
    else {
      setSearchValue(searchParams.get('id'))
		  getMovieRequest(searchValue);
    }
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
          <div className='container-flex-home'>
            <MovieList
              movies={movies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={AddFavourite}
            />
          </div>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites' />
          </div>
          <div className='container-flex-home'>
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
            />
          </div>
        </div>
}
