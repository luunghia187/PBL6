const db = require('../common/connect');
const Location = function (location) {
    this.id_location = location.id_location;
    this.name = location.name;
    this.address = location.address;
    this.latitude = location.latitude;   
    this.longitude = location.longitude;
    this.id_tag = location.id_tag;
    this.describes = location.describes; 
    this.stars = location.stars;   
    this.slug = location.slug;
    this.center_img = location.center_img;
    this.sub_img = location.sub_img;   
}

Location.get_all = function (result) {
    db.query("select * from location", function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    });
};

Location.getById = function (id, result) {
    db.query("select * from location where id_location = ?", id, function (err, h) {
        if (err || h.length == 0) {
            result(err);
        } else {
            result(h);
        }
    });
};

Location.add = function (data, result) {
    db.query("INSERT location (name, address, latitude, longitude, id_tag, describes, stars, slug, center_img, sub_img) VALUES (?,?,?,?,?,?,?,?,?,?);", [data.name, data.address, data.latitude, data.longitude, data.id_tag, data.describes, data.stars, data.slug, data.center_img, data.sub_img], function (err, p) {
        console.log(err, data)
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
};

Location.remove = function (id, result) {
    db.query("delete from location where id_location = ?", id, function (err, h) {
        if (err) {
            result(null);
        } else {
            result(h);
        }
    });
}

Location.update = function (u, result) {
    db.query("update location set name=?, address=?, latitude=?, longitude=?, id_tag=?, describes=?, stars=?, slug=?, center_img=?, sub_img=? where id_location = ?", [u.name, u.address, u.latitude, u.longitude, u.id_tag, u.describes, u.stars, u.slug, u.center_img, u.sub_img, u.id_location], function (err, u) {
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

module.exports = Location;