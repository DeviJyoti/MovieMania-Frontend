import React, { useEffect, useState } from 'react';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from '../TokenHandlers';

export default function AddMovie(){
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [plot, setPlot] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [actors, setActors] = useState([]);
  const [selectedActors, setSelectedActors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [selectedProducer, setSelectedProducer] = useState(null);

  useEffect(() => {
    const fetchActorsAndProducers = async () => {
      try {
        if (!checkIsTokenExpired()) {
          const token = localStorage.getItem('token');
          const actorResponse = await fetch('http://moviemania.runasp.net/actors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const producerResponse = await fetch('http://moviemania.runasp.net/producers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (actorResponse.ok && producerResponse.ok) {
            const actorsData = await actorResponse.json();
            const producersData = await producerResponse.json();
            setActors(actorsData);
            setProducers(producersData);
          } else {
            alert("Failed to fetch actors or producers!");
          }
        } else {
          alert("Please log in to add a movie");
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error fetching actors or producers:', error);
      }
    };

    fetchActorsAndProducers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      Name:name,
      YearOfRelease:year,
      Genres:genre,
      Plot:plot,
      Actors: selectedActors,
      ProducerId: selectedProducer,
      CoverImage:coverImage
    };

    try {
      if (!checkIsTokenExpired()) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://moviemania.runasp.net/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newMovie)
        });

        if (response.ok) {
          alert("Movie added successfully!!");
          window.location.reload(); // Reload the page
        } else {
          alert("Failed to add movie!!");
        }
      } else {
        alert("Please log in to add a movie");
        localStorage.clear();
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Clear the form fields
    setName('');
    setYear('');
    setGenre('');
    setPlot('');
    setCoverImage(null);
    setSelectedActors([]);
    setSelectedProducer(null);

  };

  const handleActorChange = (e) => {

  };

  const handleProducerChange = (e) => {

  };
  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  return (
    <div className="movie-form-container">
      <Header />
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
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="plot">Plot:</label>
          <textarea
            id="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            required
          />
          <div className="form-group">
          <label htmlFor="coverImage">Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            onChange={handleImageChange}
          />
          </div>
        </div>
        <div className="form-group">
            <label>Actors:</label>
            <div className="fixed-height-container">
                {actors.map((actor) => (
                <div key={actor.id}>
                    <input
                    type="checkbox"
                    id={`actor-${actor.id}`}
                    value={actor.id}
                    checked={selectedActors.includes(actor.id)}
                    onChange={(e) => handleActorChange(e, actor.id)}
                    />
                    <label htmlFor={`actor-${actor.id}`}>{actor.name}</label>
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
                    type="radio"
                    id={`producer-${producer.id}`}
                    name="producer"
                    value={producer.id}
                    checked={selectedProducer === producer.id}
                    onChange={(e) => setSelectedProducer(producer.id)}
                    required
                    />
                    <label htmlFor={`producer-${producer.id}`}>{producer.name}</label>
                </div>
                ))}
            </div>
            </div>

        
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

