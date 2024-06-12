import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate,Link, useParams } from "react-router-dom";
import Header from "../CustomElements/Header";
import '../styles.css';
import { checkIsTokenExpired } from '../TokenHandlers';
import ProducerCard from '../CustomElements/ProducerCard'; // Make sure this path is correct

const ProducersList = () => {
  const [producers, setProducers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        if (!checkIsTokenExpired()) {
          const token = localStorage.getItem('token');
          const response = await fetch('https://moviemania.runasp.net/producers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setProducers(data);
            console.log(data);
          } else {
            alert("Failed to fetch producers!");
          }
        } else {
          alert("Please log in to view producers");
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error fetching producers:', error);
      }
    };

    fetchProducers();
  }, []);

  return (
    <div>
      <Header />
    <h2 style={{textAlign:'center'}}>Producers List</h2>
    <div className="actors-list-container">
    {producers.length === 0 ? (
          <p>No producers found.</p>
        ) : (
          producers.map((producer) => (
            <ProducerCard
              key={producer.id}
              id={producer.id}
              name={producer.name}
              bio={producer.bio}
              dob={producer.dob}
              gender={producer.gender}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProducersList;
