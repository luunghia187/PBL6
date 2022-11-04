const { response } = require('express');
const tag = require('../models/tag.model');

exports.get_list = function (req, res) {
    tag.get_all(function (data) {
        res.send({ result: data });
    });
}

exports.detail = function (req, res) {
    tag.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
}

//body-parser
exports.add = function (req, res) {
    var data = req.body;
    console.log(req.body);
    tag.add(data, function (respnse) {
        res.send({ result: respnse });
    });
}


exports.remove = function (req, res) {
    var id = req.params.id;
    tag.remove(id, function (response) {
        res.send({ result: response });
    })
}

exports.update = function (req, res) {
    var data = req.body;
    tag.update(data, function (response) {
        res.send({ result: response });
    });
}


