import express from 'express'
import expressJoi from '@escook/express-joi'// 表单验证规则
import userInfoHandler from '../router_handler/userInfo.js'
import { user_update_schema, user_updatePassword_schema, user_delete_schema } from '../schema/user.js'


const router = express.Router()

// 更新用户状态
router.post('/userInfo/updateState', expressJoi(user_update_schema), userInfoHandler.updateUserInfoHandler)

// 删除用户
router.post('/userInfo/delete', expressJoi(user_delete_schema), userInfoHandler.deleteUserInfoHandler)

// 搜索用户
router.post('/userInfo/searchByName', userInfoHandler.searchUserHandler)

// 更新密码
router.post('/updatePassword', expressJoi(user_updatePassword_schema), userInfoHandler.updateUserPasswordHandler)

// 查询用户信息
router.get('/getUserInfo', userInfoHandler.getUserInfoHandler)


export default router;