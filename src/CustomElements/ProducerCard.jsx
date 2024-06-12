import React, { useState, useEffect } from "react";
import { checkIsAdmin,checkIsTokenExpired } from "../TokenHandlers";
import { Navigate } from 'react-router-dom';

export default function PersonCard({ id,name, bio, dob, gender }) {
  const [redirectToEditProducer,setRedirectToEditProducer] = useState(false);
  useEffect(()=>{

  },[]);

  const handleEdit = (e)=>
  {
    setRedirectToEditProducer(true);
  }

  const handleDelete = async(e)=>
  {
    if(checkIsTokenExpired)
    {
      alert("please log in to delete actor");
    }
    else if(checkIsAdmin)
    {
      try {

          const token = localStorage.getItem('token');
          const response = await fetch(`https://moviemania.runasp.net/producers/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
          });
          
          if (!response.ok) {
            alert("Producer not Deleted")
          }
          else
          {
            alert("Producer Deleted successfully!!")
            window.location.reload(); // Reload the page
          }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else
    {
      alert("You are not admin")
    }
  }

  if (redirectToEditProducer) {
    return <Navigate to={`/Producers/${id}/Edit`} />;
  }

  return (
    <div className="person-card">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Bio:</strong> {bio}</p>
      <p><strong>DOB:</strong> {new Date(dob).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {gender}</p>
      {checkIsAdmin()?(<div className="input-group buttons">
          <button type="button" className="button Edit" onClick={handleEdit}>Edit</button>
          <button type="button" className="button Delete" onClick={handleDelete}>Delete</button>
        </div>):(<div></div>)}
      
    </div>
  );
}
