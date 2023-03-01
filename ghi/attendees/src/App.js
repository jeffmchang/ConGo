import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendForm from './AttendForm';
import React from 'react';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }

  return (
    <>
      <Nav />
      <div className="container">
        <AttendForm />
        {/* <ConferenceForm /> */}
        {/* <LocationForm /> */}
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
  );
}

export default App;
