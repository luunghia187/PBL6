const { response } = require('express');
const user = require('../models/user.model');

exports.get_list = function (req, res) {
    user.get_all(function (data) {
        res.send({ result: data });
    });
}

exports.detail = function (req, res) {
    user.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
}

//body-parser
exports.add = function (req, res) {
    var data = req.body;
    console.log(req.body);
    user.add(data, function (respnse) {
        res.send({ result: respnse });
    });
}


exports.remove = function (req, res) {
    var id = req.params.id;
    user.remove(id, function (response) {
        res.send({ result: response });
    })
}

exports.update = function (req, res) {
    var data = req.body;
    user.update(data, function (response) {
        res.send({ result: response });
    });
}


