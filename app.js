const express = require('express');
const ejs = require('ejs');
require('dotenv').config();
const path = require('path');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const fs = require('fs')
const app = express();

mongoose.connect('mongodb://0.0.0.0/pcat-test-db', () => {
  console.log('DB is connected');
});

// temlpate engine

app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload());

// Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find().sort('-createdAt');
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('about');
});
app.get('/add', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'tempyar/index.html'));

  res.render('add');
});
app.get('/photos/:id', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'tempyar/index.html'));
  const photo = await Photo.findById(req.params.id);

  res.render('photo', { photo });
});

//////////////////////////////////////////

app.post('/photos', async (req, res) => {

  const uploadDir = 'public/uploads';

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
  };

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  }); 
});

app.listen(process.env.PORT, () => {
  console.log(`Sunucu ${process.env.PORT} portunda başlatıldı...`);
});
