// create a function to render film detail if record found in local storage

function renderFilmDetails(id){

    let storage = localStorage.getItem("movieSearchDetail");
    let storageArr = JSON.parse(storage);

    if (storageArr != null) {

    storageArr.forEach(arr =>{

    if (arr.id == id) {

        renderDetailHTML(arr);

        }

    })

}

};

// create a function to render dynamic HTML to movie.html


function renderDetailHTML(arr){


    let output = $("#movie-detail-header");
    output.addClass("d-md-flex align-items-center")
    output.empty();
   
    let imageURL = `https://image.tmdb.org/t/p/w200${arr.detail.poster_path}`;
    let image = $("<img>");
    image.addClass("img-fluid p-5")
    image.attr('src', imageURL);
    output.append(image);

    let BGimageURL = `https://image.tmdb.org/t/p/w1280${arr.detail.poster_path}`;
    let background = $(".color-overlay-black");
    background.attr('style',`background: url("${BGimageURL}") no-repeat center center`)
    
    let div = $("<div>");
    output.append(div);
    
    let h1 = $("<h1>");
    h1.text(arr.detail.title);
    div.append(h1);
    
    let h4 = $("<h4>");
    h4.text(`Released: ${arr.detail.release_date}`);
    div.append(h4);
    
    let p = $("<p>");
    p.text(arr.detail.overview);
    div.append(p);
    
    let h5 = $("<h5>");
    h5.text(arr.imdb.Genre);
    div.append(h5);
    
    let p1 = $("<p>");
    p1.text(`Director: ${arr.imdb.Director}`);
    div.append(p1);
    
    let creditsArr = arr.credits.cast;
    
    let crewOutput = $("#cast-container");
    crewOutput.empty();
    
    let cardDeckDiv = $("<div>");
    cardDeckDiv.addClass('row flex-row flex-nowrap');
    cardDeckDiv.attr('id','crew-detail');
    crewOutput.append(cardDeckDiv);
    
    creditsArr.forEach((arr, index) => {
    
        if (index < 8) {

            let cardDiv = $("<div>");
            cardDiv.addClass('col-3');
        
            crewOutput.append(cardDeckDiv);
            cardDeckDiv.append(cardDiv);
        
            let cardDiv1 =$("<div>");
            cardDiv1.addClass('card m-2');
            cardDiv1.attr('style','width: 16rem;');
            cardDiv.append(cardDiv1);
        
            let imageURL = `https://image.tmdb.org/t/p/w185${arr.profile_path}`;
            let image = $("<img>");
            image.attr('src', imageURL);
            image.addClass('card-img-top');
            cardDiv1.append(image);
        
            let cardBody = $("<div>");
            cardBody.addClass("card-body");
            cardDiv1.append(cardBody);
        
            let title = $("<h5>");
            title.addClass("movie-title card-text");
            title.text(arr.name);
            cardBody.append(title);

            let character = $("<p>");
            character.addClass("release-date card-text");
            character.text(arr.character);
            cardBody.append(character);
    
            }
    
        })
    
        
    };


// create a function to check local storage and render from local if record found

function checkLocalDetail(id){

    let storage = localStorage.getItem("movieSearchDetail");
    let storageArr = JSON.parse(storage);

    if (storageArr != null && storageArr.some(arr => arr['id'] == id)) {

            renderFilmDetails(id);
            console.log('found',id);      


    } else {

            filmDetail(id); 
            console.log('new',id)
          

    }

}


