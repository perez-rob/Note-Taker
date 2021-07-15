const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const express = require('express');


const app = express();

const PORT = process.env.PORT || 5665;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML routes
app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});




app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
});