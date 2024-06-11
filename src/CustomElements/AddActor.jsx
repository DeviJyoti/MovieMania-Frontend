import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';

const ActorForm = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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

    // Normally, you would send the newActor object to your server here.
    console.log('Actor added:', newActor);

    // Clear the form fields
    setName('');
    setDob('');
    setGender('');
    setBio('');

    // Notify the user
    alert('Actor added successfully!');

    // Redirect to another page, e.g., actors list
    navigate('/actors');
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

export default ActorForm;
