import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsTokenExpired } from '../TokenHandlers';

export default function AddGenre(){
  const [genreName, setGenreName] = useState('');
  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (genreName.length > 50) {
        alert('Name must be 50 characters or less');
        return;
      }
  
    // Create a new actor object
    const newGenre = {
     Name:genreName
    };

    try {
        if(!checkIsTokenExpired() && checkIsAdmin())
        {
          const token = localStorage.getItem('token');
          const response = await fetch('http://moviemania.runasp.net/genres', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(newGenre)
          });
          
          if (!response.ok) {
            alert("Genre Not added!!")
          }
          else
          {
            alert("Genre added successfully!!")
            window.location.reload(); // Reload the page
          }
        }
        else{
          if(!checkIsAdmin())
            alert("You are not admin")
          else
            alert("Please log in to add genre")

          localStorage.clear();
        }
      } catch (error) {
        console.error('Error:', error);
      }

    // Clear the form fields
    setGenreName('');
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

