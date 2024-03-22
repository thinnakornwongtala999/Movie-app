import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

const SearchBox = (props) => {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		navigate('/?id=' + props.searchValue)
	};
	return (
		<div className='col col-sm-4'>
			<form onSubmit={handleSubmit}>
				<DebounceInput
					minLength={3}
					debounceTimeout={300}
					className='form-control'
					value={props.value}
					onChange={(event) => props.setSearchValue(event.target.value)}
					placeholder='Type to search...'
				></DebounceInput>
			</form>
		</div>
	);
};

export default SearchBox;