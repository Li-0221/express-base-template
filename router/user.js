import express from 'express'
import expressJoi from '@escook/express-joi'// 表单验证规则
import { regUser, login, userlist } from '../router_handler/user.js'
import { user_login_schema, user_register_schema } from '../schema/user.js'

const router = express.Router()

// 添加新用户
router.post('/api/register', expressJoi(user_register_schema), regUser)

// 登录
router.post('/common/login', expressJoi(user_login_schema), login)

// 获取用户列表
router.get('/api/userlist', userlist)


export default router