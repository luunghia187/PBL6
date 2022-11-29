module.exports = function (router) {
    var adminController = require("../controller/admin.controller");
  
    //Login Admin
    router.post("/admin/login", adminController.Login);
    //setAdmin
    router.put("/admin/setadmin", adminController.SetAdmin);
    //update info
    router.put("/admin/updateinfo", adminController.UpdateInfo);
    //update password
    router.put("/admin/updatepassword", adminController.UpdatePassWord);
    //unsetAdmin
    router.delete("/admin/deleteadmin/:id", adminController.DeleteAdmin);
  };
  