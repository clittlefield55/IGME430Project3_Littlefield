const models = require('../models');

const Image = models.Image;

const imagePage = (req, res) => {
  Image.ImageModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('app', { images: docs });
  });
};

const makeImage = (req, res) => {
  if (!req.body.desc || !req.body.name) {
    return res.status(400).json({ error: 'Sorry, but the image and name fields are required' });
  }

  const imageData = {
    image: 'blank image',
    name: req.body.name,
    description: req.body.desc,
    rating: 0,
    user: req.session.account.username,
    userId: req.session.account._id,
  };

  const newImage = new Image.ImageModel(imageData);

  const imagePromise = newImage.save();

  imagePromise.then(() => res.json({ redirect: '/app' }));

  return imagePromise;
};

const getImages = (request, response) => {
  const req = request;
  const res = response;

  return Image.ImageModel.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ images: docs });
  });
};

const getUserSpecificImages = (request, response) => {
  const req = request;
  const res = response;

  return Image.ImageModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ images: docs });
  });
};

module.exports.imagePage = imagePage;
module.exports.getImages = getImages;
module.exports.getUserSpecificImages = getUserSpecificImages;
module.exports.make = makeImage;
