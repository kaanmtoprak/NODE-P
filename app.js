const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const fs = require('fs');
const methodOverride = require('method-override');
const {
  getAllPhotos,
  getPhoto,
  createPhoto,
  editPhoto,
  deletePhoto,
} = require('./controllers/photoControllers');
const { getAboutPage, getEditPage, addPhotoPage } = require('./controllers/pageControllers');
const app = express();

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('DB is connected');
});

// temlpate engine

app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Routes
app.get('/', getAllPhotos);
app.get('/about', getAboutPage);
app.get('/add',addPhotoPage);
app.get('/photos/:id', getPhoto);
app.get('/photos/edit/:id',getEditPage);

//////////////////////////////////////////

app.post('/photos', createPhoto);

////////////////////////////////////////////

app.put('/photos/:id', editPhoto);
app.delete('/photos/:id', deletePhoto);

app.listen(process.env.PORT, () => {
  console.log(`Sunucu ${process.env.PORT} portunda başlatıldı...`);
});
