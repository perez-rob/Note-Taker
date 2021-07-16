const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const express = require('express');


const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// API routes

app.get('/api/notes', (req,res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return
    } else {
      res.send(data);
    }
  })
  // res.sendFile(path.join(__dirname, './db/db.json'));
});

app.post('/api/notes', (req,res) => {
  req.body.id = uuidv4();

  let storedNotes = fs.readFileSync('./db/db.json', 'utf8');
  let jsonNotes = JSON.parse(storedNotes);
  jsonNotes.push(req.body);
  let newData = JSON.stringify(jsonNotes, null, 2);

  fs.writeFile('./db/db.json', newData, (err) => {
    if (err) {
      res.send('FAILED TO SAVE NOTE:', err)
    } else {
      res.send(`SUCCESSFULLY SAVED NOTE: ID = ${req.body.id}`)
    }
  });
});

app.put('/api/notes/:id', (req,res) => {
  let editID = req.params.id;
  let storedNotes = fs.readFileSync('./db/db.json', 'utf8');
  let jsonNotes = JSON.parse(storedNotes);
  let updateNotes = jsonNotes.reduce((arr, note) => {
    if (note.id == editID) {
      arr.push(req.body);
    } else {
      arr.push(note);
    }
    return arr;
  }, []);
  let newData = JSON.stringify(updateNotes, null, 2);

  fs.writeFile('./db/db.json', newData, (err) => {
    if (err) {
      res.send('FAILED TO EDIT NOTE:', err)
    } else {
      res.send(`SUCCESSFULLY EDITED NOTE: ID = ${req.params.id}`)
    }
  });
});

app.delete('/api/notes/:id', (req,res) => {
  let deleteID = req.params.id;
  let storedNotes = fs.readFileSync('./db/db.json', 'utf8');
  let jsonNotes = JSON.parse(storedNotes);
  let updateNotes = jsonNotes.reduce((arr, note) => {
    if (note.id !== deleteID) {
      arr.push(note)
    }
    return arr;
  }, []);

  let newData = JSON.stringify(updateNotes, null, 2);

  fs.writeFile('./db/db.json', newData, (err) => {
    if (err) {
      res.send('FAILED TO DELETE:', err)
    } else {
      res.send(`DELETED NOTE: ID = ${req.params.id}` )
    }
  });


})

// HTML routes
app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});





app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});