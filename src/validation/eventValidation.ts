import Joi from 'joi';

export const eventSchema = Joi.object({
    eventName: Joi.string().required(),
    eventDate: Joi.date().required(),
    organizer: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    location: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().pattern(/^\d{5}$/).required()
    }).required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required()
});
