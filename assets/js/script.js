//create a blueprint for returned movie search object

function movieArrayObj(searchTerm, date, results) {

    this.searchTerm = searchTerm;
    this.date = date;
    this.results = results;

};

//variables

const APIkeyTMDB = '4ea43f6025357b9622135c80346e095e';
const APIkeyOMDB = '29841051';


function movieSearch(movie){

    let APIurl;
    let searchTerm = movie;

    //switch statement to handle to drop down options

    switch (movie) {
        case 'Trending':
            APIurl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIkeyTMDB}&language=en-US&page=1`;
            break;
        case 'Popular':
            APIurl = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkeyTMDB}&language=en-US&page=1`;
            break;
        case 'Top rated':
            APIurl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkeyTMDB}&language=en-US&page=1`;
            break;
        case 'Upcoming':
            APIurl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIkeyTMDB}&language=en-US&page=1`;
            break;
        default:
            APIurl = `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${APIkeyTMDB}&language=en-US&page=1&include_adult=true`;
            break;
    };

    //ajax call to retrive movie data

    $.ajax({

        url: APIurl,
        method: "GET"

    }).then(function(response){

        //push response into a new object

        let reply = response.results;

        if (reply.length != 0) {

        let currentDate = moment().format("YYYYMMDD");
        let resultsObj = new movieArrayObj(searchTerm, currentDate, reply);

        return resultsObj;

    } else {

        throw new Error('Unable to find movie. Please try again');
    }

    })
    .then(function(data){

        //render data

        let arr = data;

        dynamicHTML(arr);

    return arr;

}).then(function(arr) {

    //update local storage

    updateLocalMovieSearch(arr);

}).catch(function(error) {

    //give error alert if film not found

    alert(error.message);
    
});

};


// create a function to update local storage with movie object

function updateLocalMovieSearch(object){

    //get local storage
    let storage = localStorage.getItem("movieSearchHistory");
    let storageArr = JSON.parse(storage);

    //create an empty array and push instance of storage object
    let array = [];
    array.push(object);

    //if storage array already exists, replace existing entry - else push history into new array
    if (storageArr != null) {

        storageArr.forEach(arr => {
   
            if (arr.searchTerm == object.searchTerm) {
                return;
            } else {
                array.push(arr)
            }
        })
    
        }

    localStorage.setItem("movieSearchHistory", JSON.stringify(array));

};


function dynamicHTML(arr){

    let title = $("#trending-header");
    title.empty();
    title.text(arr.searchTerm);

    let output = $("#trending-movies-container");
    output.empty();
    let cardDeckDiv = $("<div>");
    cardDeckDiv.addClass('row flex-row flex-nowrap');
    cardDeckDiv.attr('id','trending-movies-row');

    arr.results.forEach((arr, index) => {

    if (index < 8) {

    let cardDiv = $("<div>");
    cardDiv.addClass('col-3');

    output.append(cardDeckDiv);
    cardDeckDiv.append(cardDiv);

    let cardDiv1 =$("<div>");
    cardDiv1.addClass('card m-2');
    cardDiv1.attr('style','width: 16rem;');
    cardDiv.append(cardDiv1);

    let imageURL = `https://image.tmdb.org/t/p/w500${arr.poster_path}`;
    let image = $("<img>");
    image.attr('src', imageURL);
    image.addClass('card-img-top');
    cardDiv1.append(image);

    let cardBody = $("<div>");
    cardBody.addClass("card-body");
    cardDiv1.append(cardBody);

    let title = $("<h5>");
    title.addClass("movie-title card-text");
    title.text(arr.title);
    cardBody.append(title);

    let release = $("<p>");
    release.text(arr.release_date);
    release.addClass('release-date card-text');
    cardBody.append(release);

    let rating = $("<p>");
    rating.text(arr.vote_average);
    rating.addClass('rating card-text');
    cardBody.append(rating);

    // let btn = $("<a>");
    // btn.addClass("btn btn-primary btn-more");
    // btn.attr('data-id',arr.id)
    // btn.text('See More');
    // cardBody.append(btn);
    
            }

        }) 

    }

// create a function to check local storage. render from storage if record found

function checkLocalStorage(movie){

    let storage = localStorage.getItem("movieSearchHistory");
    let storageArr = JSON.parse(storage);

    let date = moment().format('YYYYMMDD');

    if (storageArr.some(arr => arr['searchTerm'] == movie && arr['date'] == date)) {

        renderStorage(movie);

    } else {

        movieSearch(movie)        

    }

}


// create a function to render movie if record found in local storage

function renderStorage(movie) {


    let storage = localStorage.getItem("movieSearchHistory");
    let storageArr = JSON.parse(storage);

    storageArr.forEach(arr =>{

    if (arr.searchTerm == movie) {

        dynamicHTML(arr);

    }

})

}


 // create an event listener to respond to dropdown button pressed

 $(".dropdown-item").on('click',function(event){

    event.preventDefault();

    let reply = event.target.textContent;

    switch (reply) {
        case 'Trending':
            movieSearch('Trending');
            break;
        case 'Popular':
            movieSearch('Popular');
            break;
        case 'Top rated':
            movieSearch('Top rated');
            break;
        case 'Upcoming':
            movieSearch('Upcoming');
            break;
        default:
            return;
    }
    
});