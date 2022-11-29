const db = require('../common/connect');
const Data = function (data) {
    this.id_data = data.id_data;
    this.id_location = data.id_location;   
    this.image = data.image;
    this.flags = data.flags;  
}

Data.get_all = function (result) {
    db.query("select * from data", function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    });
};

Data.getById = function (id, result) {
    db.query("select * from data where id_data = ?", id, function (err, h) {
        if (err || h.length == 0) {
            result(err);
        } else {
            result(h);
        }
    });
};

Data.add = function (data, result) {
    db.query("INSERT data (id_data, id_location, image, flags) VALUES (?,?);", [data.id_data, data.id_location, data.image, data. flags], function (err, p) {
        console.log(err, data)
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
};

Data.remove = function (id, result) {
    db.query("delete from data where id_data = ?", id, function (err, h) {
        if (err) {
            result(null);
        } else {
            result(h);
        }
    });
}

Data.update = function (u, result) {
    db.query("update data set id_location=?, image=?, flags=? where id_data = ?", [u.id_location, u.image, u.flags, u.id_data], function (err, u) {
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

module.exports = Data;