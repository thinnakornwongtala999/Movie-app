import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourite from '../components/AddToFavourites';

export const MovieDetail = () => {
  const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites, setFavourites] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();

  const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?i=tt1745960&apikey=6cd313ff`;

		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
    console.log(searchValue);
	};

  useEffect(() => {
    setSearchValue(searchParams.get('id'))
    if (!searchValue) console.log("This is an empty string!");
    else getMovieRequest(searchValue);
	}, [searchValue]);

  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};

  return (
        <div className='container-fluid movie-app'>
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
        </div>
  )
}
