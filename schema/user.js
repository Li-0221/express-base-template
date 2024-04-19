import Joi from 'joi'


const passwordSchema = Joi.string().pattern(/^[\S]{6,15}$/).required()

//  定义验证规则
// 注意：如果客户端提交的某些参数项未在 schema 中定义，
// 此时，这些多余的参数项默认会被忽略掉
export const user_login_schema = {
  //  校验 req.body 中的数据
  body: {
    username: passwordSchema,
    password: Joi.string().pattern(/^[\S]{6,15}$/).required(),
  }
}

export const user_register_schema = {
  //  校验 req.body 中的数据
  body: {
    username: passwordSchema,
    password: Joi.string().pattern(/^[\S]{6,15}$/).required(),
    name:Joi.string().required()
  }
}

export const user_update_schema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    state:Joi.number().integer().required()
  }
}

export const user_delete_schema = {
  body: {
    id: Joi.number().integer().min(0).required(),
  }
}

export const user_updatePassword_schema = {
  body: {
    oldPassword: passwordSchema,
    // Joi.ref('oldPassword')   表示新旧密码一致
    // Joi.not(Joi.ref('oldPassword'))    表示新旧密码不能一致
    // concat合并前后两条规则
    newPassword: Joi.not(Joi.ref('oldPassword')).concat(passwordSchema)
  }
}