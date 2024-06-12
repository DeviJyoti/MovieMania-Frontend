import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from '../TokenHandlers';

export default function AddActor() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [message,setMessage] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const navigate = useNavigate();

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
  
      if (bio.length > 500) {
        setMessage('Bio must be 500 characters or less');
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
            setMessage("Producer Not added!!");
          }
          else
          {
            setMessage("Producer added successfully!!");
          }
        }
        else{
          if(!checkIsAdmin())
            setMessage("You are not admin");
          else
            setMessage("Please log in to add actor");

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
        <h2>Add Producer</h2>
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
          <p style={{ textAlign: 'center'}}>{message}</p>
      <button type="submit" className="submit-button">Save</button>
    </form>
    </div>
    }
    </div>
  );
};

