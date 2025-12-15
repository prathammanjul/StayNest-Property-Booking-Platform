const Joi = require("joi");
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.striing().required(),
    country: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().allow("", null),
  }).required(),
});
