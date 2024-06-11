import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';

const GenreForm = () => {
  const [genreName, setGenreName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGenre = {
      name: genreName,
    };

    console.log('Genre added:', newGenre);

    setGenreName('');

    alert('Genre added successfully!');
    navigate('/genres');
  };

  return (
    <div className="genre-form-container">
        <Header/>
      <form className="genre-form" onSubmit={handleSubmit}>
        <h2>Add New Genre</h2>
        <div className="form-group">
          <label>Genre Name:</label>
          <input
            type="text"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
            maxLength={50}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default GenreForm;
