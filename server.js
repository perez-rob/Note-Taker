const fs = require('fs');
const uuid = require('uuid');
const express = require('express');


const app = express();

const PORT = process.env.PORT || 5665;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
});