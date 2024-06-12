import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsTokenExpired } from '../TokenHandlers';

export default function EditProducer() {
  const {id} = useParams();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchProducer = async()=>{
        try {
            if(!checkIsTokenExpired())
            {
              const token = localStorage.getItem('token');
              const response = await fetch(`http://moviemania.runasp.net/producers/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                },
              });
              
              if (!response.ok) {
                alert("Reload the page");
              }

              const data = await response.json();
              setName(data.name);
              setDob(data.dOB);
              setGender(data.gender);
              setBio(data.bio);
            }
            else{
              alert("Please log in to add producer")
              localStorage.clear();
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const loadProducer = async ()=>{
        await fetchProducer();
    }

    loadProducer();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name.length > 50) {
        alert('Name must be 50 characters or less');
        return;
      }
  
      if (bio.length > 500) {
        alert('Bio must be 500 characters or less');
        return;
      }
    // Create a new producer object
    const newProducer = {
      Name : name,
      DOB : dob,
      Gender : gender,
      Bio : bio,
    };

    try {
        if(!checkIsTokenExpired())
        {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://moviemania.runasp.net/producers/${id}`, {
            method: 'PUT',
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
          alert("Please log in to add producer")
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div className="producer-form-container">
        <Header/>
      <h2>Add Producer</h2>
      <form onSubmit={handleSubmit} className="producer-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
    </div>
  );
};

