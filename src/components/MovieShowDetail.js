import React from 'react'
import { CircularProgress } from '@mui/material'

export const MovieShowDetail = (props) => {
    if (!props.movie) {
        return <CircularProgress/>
    }
  return (
        <>
            <div className='image-container-detail d-flex justify-content-start m-3'>
                <img src={props.movie.Poster} alt='movie'></img>
            </div>
            <div className='text-container-detail'>
                <h1>{props.movie.Title}</h1>
                <p>Awards : {props.movie.Awards}</p>
                <p>Genre : {props.movie.Genre}</p>
                <p>Language : {props.movie.Language}</p>
                <p>Runtime : {props.movie.Runtime}</p>
                <p>IMDB : {props.movie.imdbRating}</p>
                <p>Year : {props.movie.Year}</p>
                <p>Detail : {props.movie.Plot}</p>
            </div>
		</>
  )
}
