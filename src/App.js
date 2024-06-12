import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import MovieDetails from "./components/MovieDetails";
import AddActor from "./components/AddActor";
import AddProducer from "./components/AddProducer";
import AddGenre from "./components/AddGenre";
import ViewActors from "./components/ViewActors";
import ViewProducers from "./components/ViewProducers";
import EditActor from "./components/EditActor"
import EditProducer from "./components/EditProducer"

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Movies/:id" element={<MovieDetails />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Actors/Add" element={<AddActor />} />
          <Route path="/Producers/Add" element={<AddProducer />} />
          <Route path="/Genres/Add" element={<AddGenre />} />
          <Route path="/Actors/:id/Edit" element={<EditActor />} />
          <Route path="/Producers/:id/Edit" element={<EditProducer />} />
          <Route path="/Actors" element={<ViewActors />} />
          <Route path="/Producers" element={<ViewProducers />} />
        </Routes>
      </div>
    </Router>
  );
}
