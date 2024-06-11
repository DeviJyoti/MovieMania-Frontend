import React, { useState, useEffect } from "react";
import MovieCard from "../CustomElements/MovieCard";
import {checkIsAdmin,checkIsLoggedIn,checkIsTokenExpired} from "../TokenHandlers";

export default function Home() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(true);
  const [info, setInfo] = useState("");
  useEffect(() => {
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
      newMessage += "\nThe Token Is Expired, So User is logged out now ";
    } else {
      newMessage += "\nThe Token Is not Expired";
    }
  
    setInfo(newMessage);
  }, []); // Empty dependency array means this effect runs only once on mount
  

  return (
    <div>
      <h1>I am Home page</h1>
      <pre>
        {info}
      </pre>
      <MovieCard 
        id={10} 
        name={"don"} 
        year={2019} 
        plot={"XYZ"} 
        genre={"action"} 
        imageURL={"https://imgs.search.brave.com/wzurw5Nz9UrHzkFQ7Snw5Xh4zI5HJlxStP1SLCvbXGs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y2luZW1hdGVyaWFs/LmNvbS9wLzI5N3gv/dnU2NnNnZXMvZG9u/LWluZGlhbi1tb3Zp/ZS1wb3N0ZXItbWQu/anBnP3Y"}
      />



      <a href="login">Go to login page</a>
      <br />
      <a href="signup">Go to signup page</a>
    </div>
  );
}
