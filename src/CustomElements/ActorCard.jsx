import React, { useState, useEffect } from "react";
import { checkIsAdmin,checkIsTokenExpired } from "../TokenHandlers";
import { Navigate,Link, useParams } from "react-router-dom";

export default function PersonCard({ id,name, bio, dob, gender }) {
  const [redirectToEditActor,setRedirectToEditActor] = useState(false);
  const [redirectToHome,setRedirectHome] = useState(false);
  useEffect(()=>{

  },[]);

  const handleEdit = (e)=>
  {
    setRedirectToEditActor(true);
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
          const response = await fetch(`https://moviemania.runasp.net/actors/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
          });
          
          if (!response.ok) {
            alert("Actor not Deleted")
          }
          else
          {
            alert("Actor Deleted successfully!!")
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
      alert("You are not admin")
      setRedirectHome(true);
    }
  }
  if(redirectToHome)
  {
    return <Navigate to="/"/>
  }
  if (redirectToEditActor) {
    return <Navigate to={`/Actors/${id}/Edit`} />;
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
