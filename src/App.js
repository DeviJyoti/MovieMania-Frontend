import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import MovieDetails from "./components/MovieDetails";
import AddActor from "./CustomElements/AddActor";
import AddProducer from "./CustomElements/AddProducer";
import AddGenre from "./CustomElements/AddGenre";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/AddActor" element={<AddActor />} />
          <Route path="/AddProducer" element={<AddProducer />} />
          <Route path="/AddGenre" element={<AddGenre />} />
        </Routes>
      </div>
    </Router>
  );
}
