const db = require('../common/connect');
const Review = function (review) {
    this.id_review = review.id_review;
    this.id_user = review.id_user;
    this.id_location = review.id_location;
    this.content = review.content;   
    this.title = review.title;
    this.stars = review.stars;
    this.review_time = review.review_time;   
}

Review.get_all = function (result) {
    db.query("select * from review", function (err, h) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            result(h);
        }
    });
};

Review.getById = function (id, result) {
    db.query("select * from tag where id_review = ?", id, function (err, h) {
        if (err || h.length == 0) {
            result(err);
        } else {
            result(h);
        }
    });
};

Review.add = function (data, result) {
    db.query("INSERT review (id_user, id_location, content, title, stars, review_time) VALUES (?,?,?,?,?,?);", [data.id_user, data.id_location, data.content, data.title, data.stars, data.review_time], function (err, p) {
        console.log(err, data)
        if (err) {
            result(null);
        } else {
            result(data);
        }
    });
};

Review.remove = function (id, result) {
    db.query("delete from review where id_review = ?", id, function (err, h) {
        if (err) {
            result(null);
        } else {
            result(h);
        }
    });
}

Review.update = function (u, result) {
    db.query("update review set id_user=?, id_location=?, content=?, title=?, stars=?, review_time=? where id_review = ?", [u.id_user, u.id_location, u.content, u.title, u.stars, u.review_time, u.id_review], function (err, u) {
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

module.exports = Review;