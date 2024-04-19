import express from 'express'
import expressJwt from 'express-jwt'
import cors from 'cors'
import joi from 'joi'
import userRoute from './router/user.js'
import userInfoRoute from './router/userInfo.js'
import { tokenConfig } from './schema/config.js'



const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// 响应处理   （越靠前越好）
const response = (req, res, next) => {
  // status=0为成功 1为失败，默认设置为1
  res.cc = (err, status = 1, data = {}) => {
    res.send({ status, data, message: err instanceof Error ? err.message : err })
  }
  next()
}
app.use(response)

// token验证中间件 （在路由前）
app.use(expressJwt({ secret: tokenConfig.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/common\//] }))


app.use(userRoute)
app.use('/api', userInfoRoute)



const error = (err, req, res, next) => {
  //joi表单验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  if (err.name === 'UnauthorizedError') {
    return res.cc(err)
  }
  res.cc(err)
}
app.use(error)

app.listen(9549)
