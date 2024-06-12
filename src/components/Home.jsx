import React, { useState, useEffect } from "react";
import MovieCard from "../CustomElements/MovieCard";
import Header from "../CustomElements/Header";
import { Navigate,Link } from 'react-router-dom';

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const [info, setInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://moviemania.runasp.net/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          setInfo("There is Some Network Issue")
        }

        const data = await response.json();
        setAllMovies(data);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    const loadData = async () => {
      await fetchData(); 
    };

    loadData(); 
  }, []);

  return (
    <div>
      <Header />
      <pre>{info}</pre>
        {allMovies.length === 0 ? (
          <div>
              <h1 style={{margin:'auto',textAlign:'center', marginTop:'30vh'}}>Loading...</h1>
          </div>
        
        ) : (
          <div className="movie-flex-container">
            {allMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                name={movie.name}
                year={movie.yearOfRelease}
                plot={movie.plot}
                genres={movie.genres}
                imageURL={movie.coverImage}
              />
            ))}
          </div>
        )}
    </div>
  );
}
