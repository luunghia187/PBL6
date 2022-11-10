module.exports = function (router) {
  var userController = require("../controller/user.controller");
  var middlewareController = require("../controller/middleware.controller");
  //cua nghia
  router.get("/user/list", userController.get_list);

  router.get("/user/detail/:id", userController.detail);

  router.post("/user/add", userController.add_user);

  router.delete("/user/delete/:id", userController.remove_user);

  router.put("/user/update", userController.update_user);
  //Register user
  router.post("/user/register", userController.Register);
  //Login user
  router.post("/user/login", userController.Login);
  //RefreshToken
  router.post("/user/refresh", userController.RefreshToken);
  //Logout
  router.post(
    "/user/logout",
    middlewareController.verifyToken,
    userController.LogOut
  );
  router.put(
    "/user/update1",
    middlewareController.verifyToken,
    userController.UpdateUser
  );

  router.put(
    "/user/updatepassword",
    middlewareController.verifyToken,
    userController.UpdatePassWord
  );
};
