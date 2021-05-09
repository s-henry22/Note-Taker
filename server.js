const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const { notes } = require('./data/notes');

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.name) {
        filteredResults = filteredResults.filter(note => note.name === query.name);
    }
    return filteredResults;
}

// Adding API route
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});