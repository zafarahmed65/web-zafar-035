var mongoose = require ('mongoose');
const Joi = require ('joi');
// const validateService = require('../middlewares/validateService');
var serviceSchema = mongoose.Schema ({
  name: String,
  price: Number,
  description: String,
});

var Service = mongoose.model ('Service', serviceSchema);

function validateService(data) {
  const schema = Joi.object ({
    name: Joi.string().min (3).max (10).required (),
    price: Joi.number().min (0).required (),
    description: Joi.string ().min (10).max (500).required (),
  });
  return schema.validate(data,{abortEarly:false});
}

module.exports.Service = Service;
module.exports.validate = validateService;

