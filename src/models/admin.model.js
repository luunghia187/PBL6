const db = require("../common/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = function (admin) {
  this.ID_User = admin.ID_User;
  this.User_Name = admin.User_Name;
  this.User_Password = admin.User_Password;
  this.Email = admin.Email;
  this.Phone_Number = admin.Phone_Number;
};

Admin.Login = (email, password, result) => {
  db.query(
    " SELECT ID_User, User_Name, User_Password, Email, Phone_Number  FROM `user` JOIN `user_per` ON user.ID_User = user_per.user_id WHERE user.Email = ? AND user_per.per_id ='1';",
    email,
    (err, user) => {
      console.log(password);
      console.log("user nek", user);
      if (err || user.length == 0) {
        result(400, "Wrong email!");
      } else {
        bcrypt.compare(password, user[0].User_Password, async (err, data) => {
          if (data == true) {
            result(200, ...user);
          } else {
            result(400, "Wrong password!");
          }
        });
      }
    }
  );
};
Admin.SetAdmin = (id, result) => {
  db.query(
    "INSERT INTO `user_per` (`id`, `user_id`, `per_id`, `licensed`) VALUES (?, ?, '1', '1');",
    [id, id],
    (err, user) => {
      if (err) {
        return result(400, "Error when set admin!");
      } else {
        return result(200, "Set Admin Success");
      }
    }
  );
};
Admin.UpdateInfo = (id, username, phone, result) => {
  db.query(
    "update user set User_Name = ? , Phone_Number = ? where ID_User = ?",
    [username, phone, id],
    (err, user) => {
      if (err) {
        return result(400, "Error when update user!");
      } else {
        db.query("select * from user where ID_User = ?", id, (err, user) => {
          if (err) {
            console.log(err);
          } else {
            return result(200, ...user);
          }
        });
      }
    }
  );
};
Admin.UpdatePassWord = async (id, oldpass, password, result) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password.toString(), salt);
  db.query("select * from user where ID_User = ?", id, (err, user) => {
    if (err) {
      return result(400, "Error when update Password!");
    } else {
      bcrypt.compare(oldpass, user[0].User_Password, (err, data) => {
        if (data == true) {
          db.query(
            "update user set User_Password = ? where ID_User = ?",
            [hashed, id],
            (err, user) => {
              if (err) {
                return result(400, "Error when update Password!");
              } else {
                return result(200, "Update Password Success!");
              }
            }
          );
        } else {
          return result(400, "Wrong old password!");
        }
      });
    }
  });
};
Admin.DeleteAdmin = (id, result) => {
  db.query(
    "Select * from user_per where user_id = ? AND per_id ='1';",
    id,
    (err, resp) => {
      if (err || resp.length == 0) {
        return result(400, "This user is not admin!");
      } else {
        db.query("delete from user_per where id = ?", id, (err, resp) => {
          if (err) {
            result(400, "Error when delete Admin!");
          } else {
            result(200, "Delete Admin Success!");
          }
        });
      }
    }
  );
};
module.exports = Admin;
