const db = require('../common/connect');
const Tag = function (tag) {
    this.id_tag = tag.id_tag;
    this.tag_name = tag.tag_name;    
}

Tag.get_all = function (result) {
    db.query("select * from tag", function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    });
};

Tag.getById = function (id, result) {
    db.query("select * from tag where id_tag = ?", id, function (err, h) {
        if (err || h.length == 0) {
            result(err);
        } else {
            result(h);
        }
    });
};

Tag.add = function (data, result) {
    db.query("INSERT tag (id_tag, tag_name) VALUES (?,?);", [data.id_tag, data.tag_name], function (err, p) {
        console.log(err, data)
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
};

Tag.remove = function (id, result) {
    db.query("delete from tag where id_tag = ?", id, function (err, h) {
        if (err) {
            result(null);
        } else {
            result(h);
        }
    });
}

Tag.update = function (u, result) {
    db.query("update tag set tag_name=? where id_tag = ?", [u.tag_name, u.id_tag], function (err, u) {
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

module.exports = Tag;