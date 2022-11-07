const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const path = require('path');

const app = express();

// temlpate engine

app.set("view engine", "ejs");

//middlewares
app.use(express.static('public'));
 

// Routes
app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render("index");
});
app.get('/about', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render("about");
});
app.get('/add', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render("add");
});


app.listen(process.env.PORT, () => {
  console.log(`Sunucu ${process.env.PORT} portunda başlatıldı...`);
});
