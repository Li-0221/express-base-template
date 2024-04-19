import Joi from 'joi'

export const add_artcates_schema = {
  body: {
    name: Joi.string().required(),
    // alphanum 只能包含字母和数字
    alias: Joi.string().alphanum().required(),
  }
}

export const id_artcates_schema = {
  params: {
    id: Joi.number().integer().min(1).required()
  }
}

export const update_artcates_schema = {
  params: {
    id: Joi.number().integer().min(1).required()
  },
  body: {
    name: Joi.string().required(),
    alias: Joi.string().alphanum().required(),
  }
}

