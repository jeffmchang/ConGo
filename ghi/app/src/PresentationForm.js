import React, { useEffect, useState } from 'react';

function PresentationForm() {
    const [presenterName, setName] = useState('');
    const [presenterEmail, setEmail] = useState('');
    const [companyName, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conferences, setConferences] = useState([]);
    const [conference, setConference] = useState('');


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const handleCompanyChange = (event) => {
        const value = event.target.value;
        setCompany(value);
    }
    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }
    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }
    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
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

        data.presenter_name = presenterName;
        data.presenter_email = presenterEmail;
        data.company_name = companyName;
        data.title = title;
        data.synopsis = synopsis;
        data.conference = conference;

        console.log(data);

        const presentationUrl = `http://localhost:8000${data.conference}presentations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const Response = await fetch(presentationUrl, fetchConfig);

        if (Response.ok) {
            const newPresentation = await Response.json();
            console.log(newPresentation);

            setName('');
            setEmail('');
            setCompany('');
            setTitle('');
            setSynopsis('');
            setConference('');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new presentation</h1>
                    <form
                        onSubmit={handleSubmit}
                        id="create-presentation-form">
                        <div className="form-floating mb-3">
                            <input
                                value={presenterName}
                                onChange={handleNameChange}
                                placeholder="Presenter name"
                                required type="text"
                                name="presenter_name"
                                id="presenter_name"
                                className="form-control" />
                            <label htmlFor="presenter_name">Presenter name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={presenterEmail}
                                onChange={handleEmailChange}
                                placeholder="Presenter email"
                                required type="email"
                                name="presenter_email"
                                id="presenter_email"
                                className="form-control" />
                            <label htmlFor="presenter_email">Presenter email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={companyName}
                                onChange={handleCompanyChange}
                                placeholder="Company name"
                                type="text"
                                name="company_name"
                                id="company_name"
                                className="form-control" />
                            <label htmlFor="company_name">Company name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Title"
                                required type="text"
                                name="title"
                                id="title"
                                className="form-control" />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="mb-3">

                            <textarea
                                value={synopsis}
                                onChange={handleSynopsisChange}
                                className="form-control"
                                id="synopsis"
                                rows="3"
                                name="synopsis" placeholder='Synopsis'></textarea>

                        </div>
                        <div className="mb-3">
                            <select
                                value={conference}
                                onChange={handleConferenceChange}
                                required name="conference"
                                id="conference"
                                className="form-select">
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
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default PresentationForm;
