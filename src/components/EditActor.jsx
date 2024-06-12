import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsAdmin, checkIsTokenExpired } from '../TokenHandlers';

export default function EditActor() {
  const {id} = useParams();
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [actor,setActor] = useState(null);
  const [message,setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchActor = async()=>{
        try {
            if(!checkIsTokenExpired())
            {
              const token = localStorage.getItem('token');
              const response = await fetch(`http://moviemania.runasp.net/actors/${id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}` 
                },
              });
              
              const data = await response.json();

              if (!response.ok)
                setMessage(data);
              else
              {
                setName(data.name);
                setBio(data.bio);
                setDob(new Date(data.dob));
              }

            }
            else{
              alert("Please log in to add actor")
              localStorage.clear();
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }

    const loadActor = async ()=>{
        await fetchActor();
    }

    loadActor();
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
    // Create a new actor object
    const newActor = {
      Name : name,
      DOB : dob,
      Gender : gender,
      Bio : bio,
    };

    try {
        if(!checkIsTokenExpired() && checkIsAdmin())
        {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://moviemania.runasp.net/actors/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(newActor)
          });
          
          if (!response.ok) {
            alert(response)
          }
          else
          {
            alert(response);
            window.location.reload(); // Reload the page
          }
        }
        else{
          if(!checkIsAdmin())
            alert("You are not admin")
          else
            alert("Please log in to update actor")

          localStorage.clear();
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div className="actor-form-container">
        <Header/>
      <h2>Add Actor</h2>
      <form onSubmit={handleSubmit} className="actor-form">
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

