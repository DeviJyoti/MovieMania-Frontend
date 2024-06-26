import React, { useState, useEffect } from "react";
import { checkIsAdmin,checkIsTokenExpired } from "../TokenHandlers";
import { Navigate,Link, useParams } from "react-router-dom";
export default function PersonCard({ id,name, bio, dob, gender }) {
  const [redirectToEditProducer,setRedirectToEditProducer] = useState(false);
  const [redirectToHome,setRedirectToHome] = useState(false);
  redirectToHome
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
            window.location.reload();
          }
      } catch (error) {
        console.error('Error:', error);
        alert(error);
        setRedirectToHome(true);
      }
    }
    else
    {
      alert("You are not admin");
      setRedirectToHome(true);
    }
  }
  if(redirectToHome)
  {
    return <Navigate to="/"/>
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
