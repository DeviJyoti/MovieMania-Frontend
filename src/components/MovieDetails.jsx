import "../styles.css";
import React from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams(); // Destructure the 'id' parameter from the URL
  return (
    <div>
      <h1>Hello I am a specific moviepage {id}</h1>
    </div>
  );
}
