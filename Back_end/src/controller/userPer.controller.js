const { response } = require('express');
const UserPer = require('../models/userPer.model');

exports.get_role = function (req, res) {
    UserPer.getByUserId(req.params.id, function (response) {
        res.send({ result: response });
    });
}




