module.exports = function (router) {
    var reviewController = require('../controller/review.controller');

    router.get("/review/list", reviewController.get_list);

    router.get("/review/detail/:id", reviewController.detail);

    router.post("/review/add", reviewController.add);

    router.delete("/review/delete/:id", reviewController.remove);

    router.put("/review/update", reviewController.update);
}