import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate,Link, useParams } from "react-router-dom";
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
          const response = await fetch('https://moviemania.runasp.net/actors', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setActors(data);
            console.log(data);
          } else {
            alert("Failed to fetch actors!");
          }
        } else {
          alert("Please log in to view actors");
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchActors();
  }, []);

  return (
    <div>
    <Header />
    <h2 style={{textAlign:'center'}}>Actors List</h2>
    <div className="actors-list-container">
        {actors.length === 0 ? (
          <p>No actors found.</p>
        ) : (
          actors.map((actor) => (
            <ActorCard
              key={actor.id}
              id={actor.id}
              name={actor.name}
              bio={actor.bio}
              dob={actor.dob}
              gender={actor.gender}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ActorsList;
