import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendForm from './AttendForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }

  return (

    <BrowserRouter>
      <Nav />

      <Routes>
        <Route index element={<MainPage />} />
        <Route path="attendees">
          <Route path="new" element={<AttendForm />} />
          <Route path="" element={<AttendeesList attendees={props.attendees} />} />
        </Route>
        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} />
        </Route>
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="presentations">
          <Route path="new" element={<PresentationForm />} />
        </Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;
