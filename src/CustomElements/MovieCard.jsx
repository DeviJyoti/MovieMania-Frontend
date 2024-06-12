import "../styles.css";
import React from "react";
import { Navigate,Link } from 'react-router-dom';
export default function MovieCard({ id, imageURL, name, genres=[], year, plot }) {
  const truncatedName = name.length > 13 ? `${name.substring(0, 13)}...` : name;
  const truncatedPlot = plot.length > 40 ? `${plot.substring(0, 40)}...` : plot;
  return (
    <div className="movie-card">
    <div className="movie-card-box">
      <div className="movie-details-left">
        <img src={imageURL} alt={`${name} poster`} className="movie-image" />
      </div>
      <div className="movie-details-right">
        <h2 className="movie-name">{truncatedName}</h2>
        <p className="movie-genre">Genres : {genres && genres.length > 0 ? genres.map(g => g.name).join(", ") : "N/A"}</p>
        <p className="movie-year">Year Of Release : {year}</p>
        <p className="movie-plot">Plot : {truncatedPlot} </p>
      </div>
    </div>
          <Link style={{textDecoration:'none'}} to={`/Movies/${id}`}>
          <button className="movie-btn">View Movie</button>
        </Link>
    </div>
  );
}
