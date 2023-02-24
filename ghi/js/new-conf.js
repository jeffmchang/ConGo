window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/'

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        const selectTag = document.getElementById('location');

        for (let location of data.locations) {
            const option = document.createElement('option')
            option.value = location.id;
            option.innerHTML = location.name;
            selectTag.appendChild(option);
        }
    }

    const formTag = document.getElementById('create-conf-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();

        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const confUrl = 'http://localhost:8000/api/conferences/';
        const confResponse = await fetch(confUrl, fetchConfig);
        if (confResponse.ok) {
            console.log('hit');
            formTag.reset();
            const newConf = await confResponse.json();
            console.log(newConf);
        }

    });

});
