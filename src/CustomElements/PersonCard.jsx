import React from "react";

export default function PersonCard({ name, bio, dob, gender }) {
  return (
    <div className="person-card">
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Bio:</strong> {bio}</p>
      <p><strong>DOB:</strong> {new Date(dob).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {gender}</p>
    </div>
  );
}
