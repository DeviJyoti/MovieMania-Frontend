import React, { useEffect, useState } from 'react';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from '../TokenHandlers';

export default function AddMovie(){
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [plot, setPlot] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [producers, setProducers] = useState([]);
  const [selectedProducer, setSelectedProducer] = useState(null);
  const [message,setMessage] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  useEffect(() => {
    if(!checkIsLoggedIn())
    {
      setErrorMessage("You are not logged in")
      return;
    }

    if(checkIsTokenExpired())
    {
      setErrorMessage("Your session Expired")
      return;
    }
    if(!checkIsAdmin())
    {
      setErrorMessage("You are not admin");
      return;
    }
    const fetchData = async () => {
      try {
        if (!checkIsTokenExpired()) {
          const token = localStorage.getItem('token');
          const actorResponse = await fetch('https://moviemania.runasp.net/actors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const genreResponse = await fetch('https://moviemania.runasp.net/genres', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const producerResponse = await fetch('https://moviemania.runasp.net/producers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (actorResponse.ok && producerResponse.ok && genreResponse.ok) {
            const actorsData = await actorResponse.json();
            const producersData = await producerResponse.json();
            const genresData = await genreResponse.json();
            setActors(actorsData);
            setProducers(producersData);
            setGenres(genresData);
          } else {
            alert("Failed to fetch actors or producers!");
          }
        } else {
          alert("Please log in to add a movie");
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error fetching actors/producers/genres:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      Name:name,
      YearOfRelease:year,
      Genres:selectedGenres,
      Plot:plot,
      Actors: selectedActors,
      ProducerId: selectedProducer,
      CoverImage:coverImage
    };

    console.log(newMovie);
    try {
      if (!checkIsTokenExpired()) {
        const token = localStorage.getItem('token');
        const response = await fetch('https://moviemania.runasp.net/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newMovie)
        });

        if (!response.ok) {
          setMessage("Movie Not added!!");
        }
        else
        {
          setMessage("Movie added successfully!!");
        }
      }
      else{
        if(!checkIsAdmin())
          setMessage("You are not admin");
        else
          setMessage("Please log in to add genre");

        localStorage.clear();
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };
  const handleActorChange = (e, actorId) => {
    const isChecked = e.target.checked;
  
    if (isChecked) {
      setSelectedActors((prevSelectedActors) => [...prevSelectedActors, actorId]);
    } else {
      setSelectedActors((prevSelectedActors) =>
        prevSelectedActors.filter((id) => id !== actorId)
      );
    }
  };
  
  const handleGenreChange = (e,genreId) => {
    const isChecked = e.target.checked;
  
    if (isChecked) {
      setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, genreId]);
    } else {
      setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.filter((id) => id !== genreId)
      );
    }
  };

  return (
    <div>
      <Header />
      {(checkIsTokenExpired() || !checkIsAdmin()) ? 
        <h2 style={{ textAlign: 'center' ,position:'relative',top:'30vh'}}>{errorMessage}</h2>
      :<div>
      <div className="movie-form-container">
        <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label htmlFor="name">Movie Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year of Release:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImage">Movie Poster URL:</label>
          <input
            type="text"
            id="coverImage"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Genres:</label>
          <div className="fixed-height-container">
            {genres.map((genre) => (
              <div key={genre.id} className="checkbox-wrapper">
                <input
                  style={{display:'inline-block' , width:'25px'}}
                  type="checkbox"
                  id={`genre-${genre.id}`}
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={(e) => handleGenreChange(e, genre.id)}
                />
                <label style={{display:'inline-block'}} htmlFor={`genre-${genre.id}`}>{genre.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="plot">Plot:</label>
          <textarea
            id="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            maxLength={1000}
            required
          />
        </div>
        <div className="form-group">
          <label>Actors:</label>
          <div className="fixed-height-container">
            {actors.map((actor) => (
              <div key={actor.id} className="checkbox-wrapper">
                <input
                  style={{display:'inline-block' , width:'25px'}}
                  type="checkbox"
                  id={`actor-${actor.id}`}
                  value={actor.id}
                  checked={selectedActors.includes(actor.id)}
                  onChange={(e) => handleActorChange(e, actor.id)}
                />
                <label style={{display:'inline-block'}} htmlFor={`actor-${actor.id}`}>{actor.name}</label>
              </div>
            ))}
          </div>
        </div>

            <div className="form-group">
            <label>Producers:</label>
            <div className="fixed-height-container">
                {producers.map((producer) => (
                <div key={producer.id}>
                    <input
                    style={{display:'inline-block' , width:'25px'}}
                    type="radio"
                    id={`producer-${producer.id}`}
                    name="producer"
                    value={producer.id}
                    checked={selectedProducer === producer.id}
                    onChange={(e) => setSelectedProducer(producer.id)}
                    required
                    />
                    <label style={{display:'inline-block'}} htmlFor={`producer-${producer.id}`}>{producer.name}</label>
                </div>
                ))}
            </div>
            </div>

            <p style={{ textAlign: 'center'}}>{message}</p>
        <button type="submit" className="submit-button">Save</button>
      </form>

      </div>
      
    </div>}
    </div>
  );
};

