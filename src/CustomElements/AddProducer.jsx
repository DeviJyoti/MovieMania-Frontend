import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';

const ProducerForm = () => {
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

    const newProducer = {
      name,
      dob,
      gender,
      bio,
    };

    console.log('Producer added:', newProducer);

    setName('');
    setDob('');
    setGender('');
    setBio('');

    alert('Producer added successfully!');
    navigate('/producers');
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
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

export default ProducerForm;
