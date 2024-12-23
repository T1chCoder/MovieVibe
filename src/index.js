import React from 'react';
import ReactDOM from 'react-dom';
import Home from './templates/leads/home';
import Profile from './templates/details/profile';
import Movie from './templates/details/movie';
import ErrorPageNotFound from './errors/client/404';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainHeaderComponent from './components/main-header';
import FooterComponent from './components/footer';

const root = ReactDOM.createRoot(document.body);

root.render(
  <Router>
    <MainHeaderComponent />
    <Routes>
      <Route path="*" element={<ErrorPageNotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile/:uuid" element={<Profile />} />
      <Route path="/movie/:uuid" element={<Movie />} />
    </Routes>
    <FooterComponent />
  </Router>
);