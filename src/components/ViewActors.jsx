import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsTokenExpired } from '../TokenHandlers';
import ActorCard from '../CustomElements/ActorCard'; // Make sure this path is correct

const ActorsList = () => {
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActors = async () => {
      try {
        if (!checkIsTokenExpired()) {
          const token = localStorage.getItem('token');
          const response = await fetch('http://moviemania.runasp.net/actors', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setActors(data);
          } else {
            alert("Failed to fetch actors!");
          }
        } else {
          alert("Please log in to view actors");
          localStorage.clear();
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchActors();
  }, []);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Edit actor with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log(`Delete actor with id: ${id}`);
  };

  return (
    <div>
    <Header />
    <div className="actors-list-container">

      <h2>Actors List</h2>
      <div className="actors-cards">
        {actors.length === 0 ? (
          <p>No actors found.</p>
        ) : (
          actors.map((actor) => (
            <ActorCard
              key={actor.id}
              id={actor.id}
              name={actor.name}
              bio={actor.bio}
              dob={actor.dOB}
              gender={actor.gender}
            />
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default ActorsList;
