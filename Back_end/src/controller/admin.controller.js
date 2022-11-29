const { response } = require("express");
const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Login = async (req, res) => {
  try {
    Admin.Login(req.body.email, req.body.password, (sta, user) => {
      user.User_Password = "";
      if (sta == 400) {
        return res.status(400).json({ msg: user });
      } else {
        return res.status(sta).json({ ...user });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.SetAdmin = async (req, res) => {
  var data = req.body;
  Admin.SetAdmin(data.id, (sta, resp) => {
    res.status(sta).json(resp);
  });
};
exports.UpdateInfo = async (req, res) => {
  var data = req.body;
  Admin.UpdateInfo(data.id, data.username, data.phone, (sta, resp) => {
    resp.User_Password = "";
    res.status(sta).json({ ...resp });
  });
};
exports.UpdatePassWord = async (req, res) => {
  var data = req.body;
  Admin.UpdatePassWord(data.id, data.oldpass, data.password, (sta, resp) => {
    res.status(sta).json(resp);
  });
};
exports.DeleteAdmin = async (req, res) => {
  var id = req.params.id;
  Admin.DeleteAdmin(id, (sta, resp) => {
    res.status(sta).json(resp);
  });
};
