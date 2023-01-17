//create a blueprint for returned movie search object

function movieArrayObj(searchTerm, date, results) {

    this.searchTerm = searchTerm;
    this.date = date;
    this.results = results;

};

//variables

const APIkeyTMDB = '4ea43f6025357b9622135c80346e095e';
const APIkeyOMDB = '29841051';

