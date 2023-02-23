function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
       <div>
          <div class="card shadow mb-5 bg-body-tertiary rounded">
            <img src="${pictureUrl}" class="card-img-top">

            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p><small class="text-muted">${location}</small></p>
                <p class="card-text">${description}</p>
            </div>
            <div class = 'card-footer'> <time>${starts} - ${ends}</time> </div>
          </div >
       </div >
        `;
}

function alert() {
    return `
    <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Looks like that's a bad response!</h4>
        <p></p>
        <p>Got nothing here for ya, sorry.</p>
        <hr>
        <p class="mb-0">If you wanna keep looking at this error, you're more than welcome to.</p>
    </div>
    `
}

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    const columns = document.querySelectorAll('.col');
    let colIndx = 0;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Figure out what to do when the response is bad
            const column = document.querySelector('.container')
            column.innerHTML += alert()

        } else {
            const data = await response.json();
            for (let conference of data.conferences) {
                console.log(conference)
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const starts = new Date(details.conference.starts).toLocaleDateString();
                    const ends = new Date(details.conference.ends).toLocaleDateString();
                    const pictureUrl = details.conference.location.picture_url;
                    const location = details.conference.location.name;
                    const html = createCard(name, description, pictureUrl, starts, ends, location);
                    const column = columns[colIndx % 3]
                    column.innerHTML += html;
                    colIndx++;
                }
            }
        }

    } catch (e) {
        // Figure out what to do if an error is raised
        console.error(e)
    }
});
