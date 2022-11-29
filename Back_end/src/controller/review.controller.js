const { response } = require('express');
const review = require('../models/review.model');

exports.get_list = function (req, res) {
    review.get_all(function (data) {
        res.send({ result: data });
    });
}

exports.detail = function (req, res) {
    review.getById(req.params.id, function (response) {
        res.send({ result: response });
    });
}

//body-parser
exports.add = function (req, res) {
    var data = req.body;
    console.log(req.body);
    review.add(data, function (respnse) {
        res.send({ result: respnse });
    });
}


exports.remove = function (req, res) {
    var id = req.params.id;
    review.remove(id, function (response) {
        res.send({ result: response });
    })
}

exports.update = function (req, res) {
    var data = req.body;
    review.update(data, function (response) {
        res.send({ result: response });
    });
}


