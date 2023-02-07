import Joi from "joi";

const gameSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().min(1).required(),
  pricePerDay: Joi.number().min(1).required(),
});

export { gameSchema };
