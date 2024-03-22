import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import { MovieShowDetail } from '../components/MovieShowDetail';

export const MovieDetail = () => {
  const [movieDetail, setMovieDetail] = useState(null);
	const [idMovie, setIdMovie] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?apikey=6cd313ff&s=${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();
    // console.log('responseJson', responseJson)
		if (responseJson.Search) {
			setMovies(responseJson.Search);
      console.log(responseJson.Search);
		}
	};

  useEffect(() => {
		getMovieRequest(searchValue);
	}, []);

  const getMovieDetail = async (idMovie) => {
		const url = `https://www.omdbapi.com/?i=${idMovie}&apikey=6cd313ff`;

		const response = await fetch(url);
		const responseJson = await response.json();
    console.log(responseJson)
		if (responseJson) {
			setMovieDetail(responseJson);
		}
	};

  useEffect(() => {
    setIdMovie(searchParams.get('id'))
    if (!idMovie) console.log("This is an empty string!");
    else getMovieDetail(idMovie);
	}, [idMovie]);

  return (
        <div className='container-fluid movie-app'>
          <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Movies' />
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
          <div className='container-flex-home'>
            <MovieShowDetail movie={movieDetail} />
          </div>
        </div>
  )
}
