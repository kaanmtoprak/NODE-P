const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('about');
};

exports.getEditPage = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'tempyar/index.html'));
  const photo = await Photo.findOne({ _id: req.params.id });

  res.render('edit', { photo });
};

exports.addPhotoPage = (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'tempyar/index.html'));

  res.render('add');
};
