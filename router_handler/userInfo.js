import db from "../db/index.js"
import bcrypt from "bcryptjs"

const getUserInfoHandler = (req, res) => {
  const sqlSelect = 'select id,name,username,state,roles from user where id = ?'
  // 这里的user是jwt-express解析之后自动挂载上去的
  db.query(sqlSelect, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取用户信息失败')
    res.cc("获取用户信息成功", 0, results[0])
  })
}

// 更新用户状态
const updateUserInfoHandler = (req, res) => {
  const sqlUpdate = 'update user set ? where id=?'
  db.query(sqlUpdate, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新失败')
    res.cc('更新成功', 0)
  })
}

// 删除用户
const deleteUserInfoHandler = (req, res) => {
  const sqlDelect = 'delete from user where id=?'
  db.query(sqlDelect, req.body.id, (err, results) => {
    if (err) res.cc(err)
    if (results.affectedRows === 1) return res.cc('删除成功', 0)
  })
}

const updateUserPasswordHandler = (req, res) => {
  const sqlSelect = 'select * from ev_user where id=?'
  const sqlUpdate = 'update ev_user set password=? where id=?'
  db.query(sqlSelect, req.user.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('请稍后再试')
    const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
    if (!compareResult) return res.cc('旧密码错误')
    const password = bcrypt.hashSync(req.body.newPassword)
    db.query(sqlUpdate, [password, req.user.id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更改密码失败')
      res.cc('更改密码成功', 0)
    })
  })
}

const updateUserAvatarHandler = (req, res) => {
  const sqlUpdate = 'update ev_user set user_pic=? where id=?'
  db.query(sqlUpdate, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新失败')
    res.cc('更新成功', 0)
  })
}

const searchUserHandler = (req, res) => {
  const sqlSelect = "select * from user where name like ?"
  db.query(sqlSelect, `%${req.body.name}%`, (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 0) return res.cc('没有查到数据', 0)
    res.cc("查询成功", 0, { results })
  })
}

export default { getUserInfoHandler, searchUserHandler, deleteUserInfoHandler, updateUserInfoHandler, updateUserPasswordHandler, updateUserAvatarHandler }