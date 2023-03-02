import React, { useEffect, useState } from 'react';

function ConferenceForm(props) {

    const [name, setName] = useState('');
    const [starts, setStart] = useState('');
    const [ends, setEnd] = useState('');
    const [description, setDescription] = useState('');
    const [maxPresentations, setMaxPresentations] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleStartsChange = (event) => {
        const value = event.target.value;
        setStart(value);
    }
    const handleEndsChange = (event) => {
        const value = event.target.value;
        setEnd(value);
    }
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }
    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }
    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = setLocation;

        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const Response = await fetch(conferenceUrl, fetchConfig);

        if (Response.ok) {
            const newConference = await Response.json();
            console.log(newConference);

            setName('');
            setStart('');
            setEnd('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form
                        onSubmit={handleSubmit}
                        id="create-conf-form">
                        <div className="form-floating mb-3">
                            <input
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Name"
                                required type="text"
                                name='name' id="name"
                                className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={starts}
                                onChange={handleStartsChange}
                                placeholder="Name"
                                required type="date"
                                name='starts'
                                id="starts"
                                className="form-control" />
                            <label htmlFor="name">Starts</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={ends}
                                onChange={handleEndsChange}
                                placeholder="Name"
                                required type="date"
                                id="ends"
                                className="form-control"
                                name="ends" />
                            <label htmlFor="name">Ends</label>
                        </div>
                        <div className=" mb-3">
                            <label htmlFor="room_count">Description</label>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                className="form-control"
                                name="description"
                                id="description"
                                rows="6"></textarea>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={maxPresentations}
                                onChange={handleMaxPresentationsChange}
                                type="number"
                                className="form-control"
                                placeholder="Enter a number"
                                maxLength="5"
                                name="max_presentations"
                                id="max_presentations" />
                            <label htmlFor="city">Maximum presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={maxAttendees}
                                onChange={handleMaxAttendeesChange}
                                type="number"
                                className="form-control"
                                placeholder="Enter a number"
                                maxLength="5"
                                name='max_attendees'
                                id="max_attendees" />
                            <label htmlFor="city">Maximum attendees</label>
                        </div>
                        <div className="mb-3">
                            <select
                                value={location}
                                onChange={handleLocationChange}
                                required name="state"
                                id="state"
                                className="form-select">
                                <option value="">Choose a location</option>
                                {locations.map(location => {
                                    return (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button

                            className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ConferenceForm;
