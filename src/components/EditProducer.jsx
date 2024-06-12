import React, { useState ,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from '../TokenHandlers';

export default function AddProducer() {
  const {id} = useParams();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [message,setMessage] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const [allowAccess, setAllowAccess] = useState(false);
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
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (`0${d.getMonth() + 1}`).slice(-2);
      const day = (`0${d.getDate()}`).slice(-2);
      return `${year}-${month}-${day}`;
    };
    const fetchProducer = async()=>{
      try {
          if(!checkIsTokenExpired())
          {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://moviemania.runasp.net/producers/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              },
            });
            
            if (response.status === 400) {
              setErrorMessage('Bad Request');
            } else if (response.status === 401) {
              setErrorMessage('Unauthorized');
            } else if (response.status === 403) {
              setErrorMessage('Forbidden');
            } else if (response.status === 404) {
              setErrorMessage('Not Found');
            } else if (response.ok) {
              setAllowAccess(true);           
              const data = await response.json();
              setName(data.name);
              setDob(formatDate(data.dob));
              setGender(data.gender);
              setBio(data.bio);
            }

          }
          else{
            alert("Please log in to add producer")
            localStorage.clear();
          }
        } catch (error) {
          console.error('Error:', error);
        }
    }

    const loadData= async()=>{
      await fetchProducer();
    }
    loadData();
  },[id])


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
    // Create a new producer object
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
          const response = await fetch(`https://moviemania.runasp.net/producers/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(newProducer)
          });
          
          if (response.status === 400) {
            setAllowAccess(false);
            setErrorMessage('Bad Request');
          } else if (response.status === 401) {
            setAllowAccess(false);
            setErrorMessage('Unauthorized');
          } else if (response.status === 403) {
            setAllowAccess(false);
            setErrorMessage('Forbidden');
          } else if (response.status === 404) {
            setAllowAccess(false);
            setErrorMessage('Not Found');
          } else if (response.ok) {
            setAllowAccess(true);           
            setMessage("Producer Updated!");
          }

        }
        else{
          if(!checkIsAdmin())
            setMessage("You are not admin");
          else
            setMessage("Please log in to add producer");
            localStorage.clear();
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div>
      <Header/>
      {(checkIsTokenExpired() || !checkIsAdmin()) ? 
        <h2 style={{ textAlign: 'center' ,position:'relative',top:'30vh'}}>{errorMessage}</h2>
      :<div className="producer-form-container">
        <h2>Update Producer:{name}</h2>
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
          <p style={{ textAlign: 'center'}}>{message}</p>
      <button type="submit" className="submit-button">Save</button>
    </form>
    </div>
    }
    </div>
  );
};



