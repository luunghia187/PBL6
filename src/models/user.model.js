const db = require('../common/connect');
const User = function (user) {
    this.id_user = user.id_user;
    this.user_name = user.user_name;  
    this.avatar = user.avatar;
    this.user_password = user.user_password; 
    this.email = user.email;
    this.Phone_number = user.Phone_number;   
}

User.get_all = function (result) {
    db.query("select * from user", function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    });
};

User.getById = function (id, result) {
    db.query("select * from user where id_user = ?", id, function (err, h) {
        if (err || h.length == 0) {
            result(err);
        } else {
            result(h);
        }
    });
};

User.add = function (data, result) {
    db.query("INSERT user (User_name, avatar, user_password, email, phone_number) VALUES (?,?,?,?,?);", [data.User_Name, data.avatar, data.User_Password, data.Email, data.phone_number], function (err, p) {
        console.log(err, data)
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
};

User.remove = function (id, result) {
    db.query("delete from user where id_user = ?", id, function (err, h) {
        if (err) {
            result(null);
        } else {
            result(h);
        }
    });
}

User.update = function (u, result) {
    db.query("update user set user_name=?, avatar=?, user_password=?, email=?, phone_number=? where id_user = ?", [u.User_Name, u.avatar, u.User_Password, u.Email, u.phone_number, u.Id_User], function (err, u) {
        console.log(err)
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(u);
        }
    })
};
``

module.exports = User;