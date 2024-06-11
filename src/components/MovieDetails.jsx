import "../styles.css";
import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "../CustomElements/Header";
import ProducerCard from "../CustomElements/ProducerCard"; 
import ActorCard from "../CustomElements/ActorCard"; 
import { checkIsTokenExpired } from "../TokenHandlers";

export default function MovieDetails() {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const [info, setInfo] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://moviemania.runasp.net/movies/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          setInfo("There is Some Network Issue");
          return;
        }

        const data = await response.json();
        setCurrentMovie(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        if(!checkIsTokenExpired())
        {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://moviemania.runasp.net/movies/${id}/reviews`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            }
          });
  
          if (!response.ok) {
            setInfo("There is Some Network Issue");
            return;
          }
  
          const data = await response.json();
          setMovieReviews(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const loadMovie = async () => {
      await fetchMovie();
      await fetchReviews();
    };

    loadMovie();
  }, [id]); // Add 'id' as a dependency to re-run when 'id' changes

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!checkIsTokenExpired())
      {
        const token = localStorage.getItem('token');
        const response = await fetch('http://moviemania.runasp.net/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          },
          body: JSON.stringify({ UserName: localStorage.getItem('user'), Message: reviewMessage, MovieId: id })
        });
        
        if (!response.ok) {
          alert("Review Not added!!")
        }
        else
        {
          alert("Review added successfully!!")
          window.location.reload(); // Reload the page
        }
        setReviewMessage("");
      }
      else{
        alert("Please log in to add review")
        localStorage.clear();
        window.location.reload(); // Reload the page
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Header />
      <div className="movie-container">
        {currentMovie ? (
          <>
            <div className="movie-details">
              <img src={currentMovie.coverImage} alt={currentMovie.name} className="movie-poster"/>
              <div className="movie-info">
                <h1>{currentMovie.name}</h1>
                <p><strong>Year:</strong> {currentMovie.yearOfRelease}</p>
                <p><strong>Plot:</strong> {currentMovie.plot}</p>
                <h2>Genres</h2>
                <div className="genre-container">
                  {currentMovie.genres.map((genre) => (
                    <span key={genre.id} className="genre-badge">{genre.name}</span>
                  ))}
                </div>
                <h2>Actors</h2>
                <div className="persons-container">
                  {currentMovie.actors.map((actor) => (
                    <ActorCard 
                      key={actor.id} 
                      id={actor.id}
                      name={actor.name} 
                      bio={actor.bio} 
                      dob={actor.dob} 
                      gender={actor.gender} 
                    />
                  ))}
                </div>
                <h2>Producer</h2>
                <ProducerCard 
                  key={currentMovie.producer.id} 
                  id={currentMovie.producer.id}
                  name={currentMovie.producer.name} 
                  bio={currentMovie.producer.bio} 
                  dob={currentMovie.producer.dob} 
                  gender={currentMovie.producer.gender} 
                />
              </div>
            </div>
          </>
        ) : (
          <p>Loading movie details...</p>
        )}
        <h2>Reviews</h2>
        {movieReviews.length > 0 ? (
          <div className="reviews-container">
            {movieReviews.map((review) => (
              <div key={review.id} className="review-card">
                <p><strong>{review.userName}:</strong> {review.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
        
        <h2>Add a Review</h2>
        {checkIsTokenExpired()==false?(
          <form onSubmit={handleReviewSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="reviewMessage">Review:</label>
            <textarea
              id="reviewMessage"
              value={reviewMessage}
              onChange={(e) => setReviewMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
        ):(
          <h3>Login to add a review</h3>
        )}
        

      </div>
    </div>
  );
}
