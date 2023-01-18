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

