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
      <MovieCard 
        id={10} 
        name={"don"} 
        year={2019} 
        plot={"XYZ"} 
        genre={"action"} 
        imageURL={"https://imgs.search.brave.com/wzurw5Nz9UrHzkFQ7Snw5Xh4zI5HJlxStP1SLCvbXGs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y2luZW1hdGVyaWFs/LmNvbS9wLzI5N3gv/dnU2NnNnZXMvZG9u/LWluZGlhbi1tb3Zp/ZS1wb3N0ZXItbWQu/anBnP3Y"}
      />
      {allMovies.map((movie) => (
        <h1>Name : {movie.name}</h1>
      ))}

      <a href="login">Go to login page</a>
      <br />
      <a href="signup">Go to signup page</a>
    </div>
  );
}
