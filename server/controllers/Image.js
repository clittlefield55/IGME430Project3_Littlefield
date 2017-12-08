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
  if (!req.body.image || !req.body.name) {
    return res.status(400).json({ error: 'Sorry, but the image and name fields are required' });
  }

  const imageData = {
    image: req.body.image,
    name: req.body.name,
    rating: 0,
    user: req.session.account._id,
  };

  const newImage = new Image.ImageModel(imageData);

  const imagePromise = newImage.save();

  imagePromise.then(() => res.json({ redirect: '/app' }));

  return imagePromise;
};

const getUserSpecificImages = (request, response) => {
  const req = request;
  const res = response;

  return Image.ImageModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ domos: docs });
  });
};

module.exports.imagePage = imagePage;
module.exports.getUserSpecificImages = getUserSpecificImages;
module.exports.make = makeImage;
