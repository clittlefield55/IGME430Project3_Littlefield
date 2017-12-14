const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ImageModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ImageSchema = new mongoose.Schema({
  image: {
    // data: Buffer,
    // contentType: String,
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    min: -200,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  user: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

ImageSchema.statics.toAPI = (doc) => ({
  image: doc.image,
  name: doc.name,
  rating: 0,
  user: doc.user,
  desciption: doc.desciption,
});

ImageSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    userId: convertId(ownerId),
  };

  return ImageModel.find(search).select('name description user').exec(callback);
};

ImageModel = mongoose.model('Image', ImageSchema);

module.exports.ImageModel = ImageModel;
module.exports.ImageSchema = ImageSchema;
