const { response } = require('express');
const location = require('../models/location.model');

exports.get_list = function (req, res) {
    location.get_all(function (data) {
        res.send({ result: data });
    });
}

exports.detail = function (req, res) {
    location.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
}

//body-parser
exports.add = function (req, res) {
    var data = req.body;
    console.log(req.body);
    location.add(data, function (respnse) {
        res.send({ result: respnse });
    });
}


exports.remove = function (req, res) {
    var id = req.params.id;
    location.remove(id, function (response) {
        res.send({ result: response });
    })
}

exports.update = function (req, res) {
    var data = req.body;
    location.update(data, function (response) {
        res.send({ result: response });
    });
}


