import React, { useEffect, useState } from 'react';

function AttendForm(props) {

    const [conferences, setConferences] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [conference, setConference] = useState('');

    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (conferences.length > 0) {
        spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
        dropdownClasses = 'form-select';
    }

    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setConferences(data.conferences);

        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.email = email;
        data.conference = conference;

        console.log(data);

        const attendeeUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const Response = await fetch(attendeeUrl, fetchConfig);

        if (Response.ok) {
            const newAttendee = await Response.json();

            console.log(newAttendee);
            const formTag = document.getElementById('create-attendee-form')
            const successTag = document.getElementById('success-message');
            successTag.classList.remove('d-none');
            formTag.classList.add('d-none')
        }

    }



    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="my-5 container">
            <div className="row">
                <div className="col col-sm-auto">
                    <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
                </div>
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                            <form
                                onSubmit={handleSubmit}
                                id="create-attendee-form">
                                <h1 className="card-title">It's Conference Time!</h1>
                                <p className="mb-3">
                                    Please choose which conference
                                    you'd like to attend.
                                </p>
                                <div className={spinnerClasses} id="loading-conference-spinner">
                                    <div className="spinner-grow text-secondary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <select
                                        onChange={handleConferenceChange}
                                        name="conference"
                                        id="conference"
                                        className={dropdownClasses}
                                        required>
                                        <option value="">Choose a conference</option>
                                        {conferences.map(conference => {
                                            return (
                                                <option key={conference.href} value={conference.href}>
                                                    {conference.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <p className="mb-3">
                                    Now, tell us about yourself.
                                </p>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input
                                                value={name}
                                                onChange={handleNameChange}
                                                required placeholder="Your full name"
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control" />
                                            <label htmlFor="name">Your full name</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input
                                                value={email}
                                                onChange={handleEmailChange}
                                                required placeholder="Your email address"
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control" />
                                            <label htmlFor="email">Your email address</label>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-lg btn-primary">I'm going!</button>
                            </form>
                            <div className="alert alert-success d-none mb-0" id="success-message">
                                Congratulations! You're all signed up!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendForm;
