import React, { useState ,useEffect} from 'react';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from '../TokenHandlers';

export default function AddActor() {
  const [name, setName] = useState('');
  const [message,setMessage] = useState('');
  const [errorMessage,setErrorMessage] = useState('');

  useEffect(()=>{
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
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name.length > 50) {
        setMessage('Name must be 50 characters or less');
        return;
      }
  
    const newGenre = {
      Name : name,
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
            setMessage("Genre Not added!!");
          }
          else
          {
            setMessage("Genre added successfully!!");
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

  return (
    <div >
      <Header/>
      {(checkIsTokenExpired() || !checkIsAdmin()) ? 
        <h2 style={{ textAlign: 'center' ,position:'relative',top:'30vh'}}>{errorMessage}</h2>
      :<div className="actor-form-container">
        <h2>Add Genre</h2>
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
          <p style={{ textAlign: 'center'}}>{message}</p>
      <button type="submit" className="submit-button">Save</button>
    </form>
    </div>
    }
    </div>
  );
};

