
module.exports = function (router) {
    var userPerController = require('../controller/userPer.controller');

    router.get("/userPer/getByUserId/:id", userPerController.get_role);
}