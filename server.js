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
};

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id ===id) [0];
    return result;
};

// Adding API route
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Will return a 404 error if the task does not exist
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }  
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}.`);
});