import db from "../db/index.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { tokenConfig } from "../schema/config.js"

export const regUser = (req, res) => {
  console.log(req, '===========');
  const userinfo = req.body;
  const sqlSelect = "select * from user where username=?";
  const sqlInsert = "insert into user set ?";
  db.query(sqlSelect, userinfo.username, (err, results) => {
    console.log(res);
    if (err) return res.cc(err);
    if (results.length > 0) return res.cc("用户名已被占用");
    // 对用户的密码进行加密处理，第一个参数是原密码，第二个参数是随机盐长度
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    db.query(sqlInsert, userinfo, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("注册失败，请稍后再试");
      res.cc("注册成功", 0);
    });
  });
};

export const login = (req, res) => {
  const userinfo = req.body;
  const sqlSelect = "select * from user where username=?";
  db.query(sqlSelect, [userinfo.username], (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("用户不存在");
    // 验证密码是否正确  第一个参数时要验证的密码，第二个参数时加密的正确密码
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) return res.cc("密码错误");
    // 将用户信息赋值给user，并将password和user_pic重置为空
    const user = { ...results[0], password: "", user_pic: "" };
    const token = jwt.sign(
      user,
      tokenConfig.jwtSecretKey,
      tokenConfig.expiresIn
    );
    res.cc("登录成功", 0, { token });
  });
};

export const userlist = (req, res) => {
  let total;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const sqlSelectAll = "select * from user";
  const sqlSelect = "select * from user order by id desc limit ?,?";
  db.query(sqlSelectAll, (err, results) => {
    if (err) return res.cc(err);
    total = results.length;
    db.query(sqlSelect, [(page - 1) * limit, limit], (err, results) => {
      if (err) return res.cc(err);
      res.cc("获取用户列表成功", 0, { results, total });
    });
  });
};

