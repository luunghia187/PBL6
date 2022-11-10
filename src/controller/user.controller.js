const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var user = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Register = async (req, res) => {
  try {
    if (req.body.password != req.body.confpassword) {
      return res
        .status(400)
        .json({ msg: "Password and ConfirmPassWord not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    data = req.body;
    data.password = hashed;
    User.Register(data, (sta, msg) => {
      return res.status(sta).json({ msg });
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
exports.Login = async (req, res) => {
  try {
    console.log("email ben ni", req.body.email);
    User.Login(
      req.body.email,
      req.body.password,
      (sta, user, accessToken, refreshToken) => {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
        });
        user.User_Password = "";
        if (sta == 400) {
          return res.status(400).json({ msg: user });
        } else {
          return res.status(sta).json({ ...user, accessToken });
        }
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.get_list = (req, res) => {
  User.get_all((data) => {
    res.send({ result: data });
  });
};
exports.RefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json("You're not authenticated trong refresh");
  User.checkRefreshToken(refreshToken, (sta, respon) => {
    return res.status(sta).json(respon);
  });
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) console.log(err);
    User.deleteRefreshToken(refreshToken);
    const newAccessToken = User.generateAccessToken(user);
    const newRefreshToken = User.generateRefreshToken(user);
    User.addRefreshToken(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(200).json({ accessToken: newAccessToken });
  });
};
exports.LogOut = async (req, res) => {
  res.clearCookie("refreshToken");
  User.deleteAllRefreshToken();
  res.status(200).json("Logged out successfully!");
};

exports.UpdateUser = async (req, res) => {
  var data = req.body;
  User.UpdateUser(data.id, data.username, data.phone, (sta, user) => {
    user.User_Password = "";
    const token = req.headers.token;
    const accessToken = token.split(" ")[1];
    res.status(sta).json({ ...user, accessToken });
  });
};
exports.UpdatePassWord = async (req, res) => {
  var data = req.body;
  console.log(data);
  User.UpdatePassWord(data.id, data.oldpass, data.password, (sta, resp) => {
    res.status(sta).json(resp);
  });
};

exports.get_list = function (req, res) {
  User.get_all(function (data) {
    res.send({ result: data });
  });
};

exports.detail = function (req, res) {
  User.getById(req.params.id, function (response) {
    res.send({ result: response });
  });
};

//body-parser
exports.add_user = function (req, res) {
  var data = req.body;
  console.log(req.body);
  User.add(data, function (respnse) {
    res.send({ result: respnse });
  });
};

exports.remove_user = function (req, res) {
  var id = req.params.id;
  User.remove_user(id, function (response) {
    res.send({ result: response });
  });
};

exports.update_user = function (req, res) {
  var data = req.body;
  User.update(data, function (response) {
    res.send({ result: response });
  });
};
