import Joi from "joi";

const gameSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().min(1).required(),
  pricePerDay: Joi.number().min(1).required(),
});

const customerSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  cpf: Joi.string()
    .length(11)
    .regex(/^[0-9]+$/)
    .required(),
  phone: Joi.string()
    .min(10)
    .max(11)
    .regex(/^[0-9]+$/)
    .required(),
  birthday: Joi.date().required(),
});

const rentalSchema = Joi.object().keys({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.number().positive().not(0).required(),
});

export { gameSchema, customerSchema, rentalSchema };
