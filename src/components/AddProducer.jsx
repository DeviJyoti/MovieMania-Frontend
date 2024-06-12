import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsTokenExpired } from '../TokenHandlers';

export default function AddProducer(){
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

  
    if (name.length > 50) {
        alert('Name must be 50 characters or less');
        return;
      }
  
      if (bio.length > 500) {
        alert('Bio must be 500 characters or less');
        return;
      }
    // Create a new actor object
    const newProducer = {
      Name : name,
      DOB : dob,
      Gender : gender,
      Bio : bio,
    };

    try {
        if(!checkIsTokenExpired() && checkIsAdmin())
        {
          const token = localStorage.getItem('token');
          const response = await fetch('http://moviemania.runasp.net/producers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(newProducer)
          });
          
          if (!response.ok) {
            alert("Producer Not added!!")
          }
          else
          {
            alert("Producer added successfully!!")
            window.location.reload(); // Reload the page
          }
        }
        else{
          if(!checkIsAdmin())
            alert("You are not admin")
          else
            alert("Please log in to add producer")

          localStorage.clear();
        }
      } catch (error) {
        console.error('Error:', error);
      }

    // Clear the form fields
    setName('');
    setDob('');
    setGender('');
    setBio('');
  };

  return (
    <div className="producer-form-container">
        <Header/>
      <form className="producer-form" onSubmit={handleSubmit}>
        <h2>Add Producer</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binar">Non-Binary</option>
          </select>
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={500}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};


