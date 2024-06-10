import React, { useState, useEffect } from "react";
import MovieCard from "../CustomElements/MovieCard";
import axios from "axios";

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axios.get("http://moviemania.runasp.net/Movies");
        setAllMovies(response.data);
        console.dir(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>I am Home page</h1>
      {allMovies.map((movie) => (
        <h1>Name : {movie.name}</h1>
      ))}

      <a href="login">Go to login page</a>
      <br />
      <a href="signup">Go to signup page</a>
    </div>
  );
}
