import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { MovieDetail } from './pages/MovieDetail';
import { Home } from './pages/Home';


const App = () => {
	return (
    	<BrowserRouter>
			<Routes>
			<Route path="/" element={<Home/>}></Route>
			<Route path="/moviedetail" element={<MovieDetail/>}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;