import './App.css';
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from './components/Layout';
import { Routes, Route, json } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';


function App() {
  const [movies, setMovies] = useState();
  // here ^ is a destructered array from the useState hook. The 1st item in the
  // destructured array, "movies", contains an array of movies data returned from 
  // a call to the relevant API endpoint.
  // The 2nd item is a function that can be used to change the State of the variables.

  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {

    try {
      const response = await api.get("/api/v1/skaters")

      console.log(response.data);

      setMovies(response.data);

    } catch(err) {
      console.log(err)
    }
  }

  const getMovieData = async (movieId) => {
     
    try {
        const response = await api.get(`/api/v1/skaters/${movieId}`);
        
        const singleMovie = response.data;
        // console.log(`singleMovie is -- ${JSON.stringify(singleMovie)}`)
        // console.log(`REVIEWS are -- ${JSON.stringify(singleMovie.reviewIds[0].body)}`)
        console.log(`REVIEWIDS are -- ${JSON.stringify(singleMovie.reviewIds)}`)
        console.log(`reviews are -- ${(singleMovie.reviews)}`)
        setMovie(singleMovie);

        setReviews(singleMovie.reviewIds);
    } 
      catch (error) {
        console.error(error);
      }

  }

  useEffect(() => {
    getMovies();
  }, [])
  // this useEffect hook is executed on page load, so the getMovies function 
  // will run. 

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home movies={movies} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
