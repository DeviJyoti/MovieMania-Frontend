import React, { useState, useEffect } from "react";
import MovieCard from "../CustomElements/MovieCard";
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from "../TokenHandlers";

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [info, setInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://moviemania.runasp.net/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAllMovies(data);
        console.log('Response:', data);

        let newMessage = "";

        if (checkIsAdmin()) {
          setIsAdmin(true);
          newMessage += "\nThe User Is Admin ";
        } else {
          newMessage += "\nThe User Is not Admin";
        }

        if (checkIsLoggedIn()) {
          setIsLoggedIn(true);
          newMessage += "\nThe User Is Logged in ";
        } else {
          newMessage += "\nThe User Is not Logged in";
        }

        if (checkIsTokenExpired()) {
          setIsLoggedIn(false);
          setIsTokenExpired(true);
          newMessage += "\nThe Token Is Expired, So User is logged out now ";
        } else {
          newMessage += "\nThe Token Is not Expired";
        }

        setInfo(newMessage);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const loadData = async () => {
      await fetchData(); // Await the fetchData function call
      // Other code that depends on the fetched data
    };

    loadData(); // Call the loadData function
  }, []); // Empty dependency array means this effect runs only once on mount

  if (!allMovies || allMovies.length === 0) {
    return (
      <div>
        <h1>Loading... Please Wait </h1>
      </div>
    );
  }

  return (
    <div>
      <h1>I am Home page</h1>
      <pre>
        {info}
      </pre>
      {allMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          name={movie.name}
          year={movie.yearOfRelease}
          plot={movie.plot}
          genre={"Action"} // Assuming genre is hardcoded for simplicity
          imageURL={movie.coverImage}
        />
      ))}
      <a href="login">Go to login page</a>
      <br />
      <a href="signup">Go to signup page</a>
    </div>
  );
}
