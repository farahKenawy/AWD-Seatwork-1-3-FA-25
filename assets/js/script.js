const movieList = [
    {
        title: 'Hello, Love, Again',
        image: 'movie-1.jpg',
        director: 'Cathy Garcia-Molina',
        releaseDate: 'November 2024',
        plot: 'Starring Kathryn Bernardo and Alden Richards, two people meet unexpectedly and discover love and self-growth.',
        availability: '500+ Philippine Theaters'
    },
    {
        title: 'Moana 2',
        image: 'movie-2.jpeg',
        releaseDate: 'November 2024',
        plot: 'Moana embarks on a new journey to find the lost island of Motufetu and break a curse, with Maui by her side.',
        availability: 'Amazon Prime Video',
        boxOffice: '$1 billion worldwide'
    }
];

function renderMovieList() {
    const movieListContainer = document.querySelector('.movie-cards');

    movieList.forEach(movie => {
        // Create reservation link with query for movie title
        const reservationLink = document.createElement('a');
        reservationLink.href = `./pages/reservation-page/index.html?movie=${encodeURIComponent(movie.title)}`;

        const movieCard = document.createElement('div');
        movieCard.classList.add('card');
        reservationLink.appendChild(movieCard);

        const movieImage = document.createElement('img');
        movieImage.src = `./assets/img/${movie.image}`;
        movieImage.alt = `${movie.title} Poster`;

        // Create movie-info container for hidden details
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');  // Add the class for hidden info

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;

        const movieDetailsList = document.createElement('ul');

        if (movie.director) {
            const directorItem = document.createElement('li');
            directorItem.innerHTML = `<strong>Director:</strong> ${movie.director}`;
            movieDetailsList.appendChild(directorItem);
        }

        const releaseDateItem = document.createElement('li');
        releaseDateItem.innerHTML = `<strong>Release Date:</strong> ${movie.releaseDate}`;
        movieDetailsList.appendChild(releaseDateItem);

        const plotItem = document.createElement('li');
        plotItem.innerHTML = `<strong>Plot:</strong> ${movie.plot}`;
        movieDetailsList.appendChild(plotItem);

        const availabilityItem = document.createElement('li');
        availabilityItem.innerHTML = `<strong>Available on:</strong> ${movie.availability}`;
        movieDetailsList.appendChild(availabilityItem);

        if (movie.boxOffice) {
            const boxOfficeItem = document.createElement('li');
            boxOfficeItem.innerHTML = `<strong>Box Office:</strong> ${movie.boxOffice}`;
            movieDetailsList.appendChild(boxOfficeItem);
        }

        // Append movie title and details to the movie-info section
        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieDetailsList);

        // Append the image and info to the card
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieInfo);  // Append the info section to the card

        movieListContainer.appendChild(reservationLink);
    });
}

renderMovieList();
