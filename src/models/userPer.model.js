const db = require('../common/connect');
const UserPer = function (userPer) {
    this.id = userPer.id;
    this.user_id = userPer.user_id;
    this.per_id = userPer.per_id;
    this.licensed = userPer.licensed;
}

UserPer.getByUserId = function (id, result) {
    db.query("select * from user_per where user_id = ?", id, function (err, dv) {
        if (err || dv.length == 0) {
            result(err);
        } else {
            result(dv);
        }
    });
};

module.exports = UserPer;