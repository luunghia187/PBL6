module.exports = function (router) {
    var tagController = require('../controller/tag.controller');

    router.get("/tag/list", tagController.get_list);

    router.get("/tag/detail/:id", tagController.detail);

    router.post("/tag/add", tagController.add);

    router.delete("/tag/delete/:id", tagController.remove);

    router.put("/tag/update", tagController.update);
}