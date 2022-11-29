module.exports = function (router) {
    var locationController = require('../controller/location.controller');

    router.get("/location/list", locationController.get_list);

    router.get("/location/detail/:id", locationController.detail);

    router.post("/location/add", locationController.add);

    router.delete("/location/delete/:id", locationController.remove);

    router.put("/location/update", locationController.update);
}