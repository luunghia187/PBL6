const db = require("../common/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = function (user) {
  this.ID_User = user.ID_User;
  this.User_Name = user.User_Name;
  this.User_Password = user.User_Password;
  this.Email = user.Email;
  this.Phone_Number = user.Phone_Number;
};
User.Register = (data, result) => {
  db.query("select * from user where Email = ?", data.email, (err, user) => {
    if (user.length == 0) {
      db.query(
        "INSERT INTO user ( User_Name, User_Password,Email,Phone_Number) VALUES (?,?,?,?);",
        [data.username, data.password, data.email, data.phone],
        function (err, user) {
          if (err) {
            result(403, "Registration failed");
          } else {
            result(200, "Registration successfuly");
          }
        }
      );
    } else {
      result(400, "Email have already!");
    }
  });
};
User.generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.ID,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "30s",
    }
  );
};
User.generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.ID,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "30d",
    }
  );
};
//check refresToken
User.checkRefreshToken = (refreshToken, result) => {
  db.query(
    "select * from refreshtoken where token = ?",
    refreshToken,
    (err, token) => {
      if (err) {
        console.log(err);
      } else {
        if (token.length == 0) {
          result(403, "Refresh token is not valid!");
        }
      }
    }
  );
};
//deleterefreshtoken
User.deleteRefreshToken = (refreshToken, result) => {
  db.query(
    "delete from refreshtoken where token = ?",
    refreshToken,
    (err, token) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ok");
      }
    }
  );
};
User.deleteAllRefreshToken = () => {
  db.query("delete from refreshtoken", (err, token) => {
    if (err) {
      console.log(err);
    }
  });
};
//add refreshToken vao CSDL
User.addRefreshToken = (refreshtoken) => {
  console.log("refresh token nek", refreshtoken);
  db.query(
    "INSERT INTO refreshtoken (token) VALUES (?)",
    refreshtoken,
    (err, token) => {
      if (err) {
        console.log(err);
      } else {
        console.log("da add refresh token");
      }
    }
  );
};
User.Login = (email, password, result) => {
  console.log("loni", email);
  db.query("Select * from user where Email = ?", email, (err, user) => {
    console.log(password);
    console.log("user nek", user);
    if (err || user.length == 0) {
      result(400, "Wrong email!");
    } else {
      bcrypt.compare(password, user[0].User_Password, async (err, data) => {
        if (data == true) {
          const accessToken = User.generateAccessToken(user[0]);
          const refreshToken = User.generateRefreshToken(user[0]);
          User.addRefreshToken(refreshToken);

          result(200, ...user, accessToken, refreshToken);
        } else {
          result(400, "Wrong password!");
        }
      });
    }
  });
};
User.get_all = function (result) {
  db.query("select * from user", function (err, user) {
    if (err) {
      result(err);
    } else {
      result(user);
    }
  });
};

User.UpdateUser = (id, username, phone, result) => {
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
User.UpdatePassWord = async (id, oldpass, password, result) => {
  console.log(id, password);
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password.toString(), salt);
  db.query("select * from user where ID_User = ?", id, (err, user) => {
    if (err) {
      return result(400, "Error when update Password!");
    } else {
      console.log(oldpass);
      bcrypt.compare(oldpass, user[0].User_Password, (err, data) => {
        console.log(data);
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
          return result(400, "wrong old password!");
        }
      });
    }
  });
};
///cua nghia
User.get_all = function (result) {
  db.query("select * from user", function (err, user) {
    if (err) {
      result(err);
    } else {
      result(user);
    }
  });
};

User.getById = function (id, result) {
  db.query("select * from user where Id_User = ?", id, function (err, user) {
    if (err || user.length == 0) {
      result(err);
    } else {
      result(user);
    }
  });
};

User.add = function (data, result) {
  db.query(
    "INSERT INTO user (ID_User, User_Name, User_Password,Email,Phone_Number) VALUES (?,?,?,?,?);",
    [
      data.ID_User,
      data.User_Name,
      data.User_Password,
      data.Email,
      data.Phone_Number,
    ],
    function (err, user) {
      console.log(err, data);
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};

User.remove_user = function (id, result) {
  db.query("delete from user where Id_User = ?", id, function (err, user) {
    if (err) {
      result(null);
    } else {
      result(user);
    }
  });
};

User.update = function (u, result) {
  db.query(
    "update user set User_Name=?,User_Password=?,Email=?,Phone_Number=? where Id_User = ?",
    [u.User_Name, u.User_Password, u.Email, u.Phone_Number, u.ID_User],
    function (err, u) {
      console.log(err);
      if (err) {
        console.log(err);
        result(err);
      } else {
        result(u);
      }
    }
  );
};
module.exports = User;
