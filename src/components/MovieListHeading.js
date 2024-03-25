import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieListHeading = (props) => {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		navigate('/')
	};
	return (
		<div className='col'>
			<div onClick={handleSubmit}>
				<h1>{props.heading}</h1>
			</div>
		</div>
	);
};

export default MovieListHeading;
