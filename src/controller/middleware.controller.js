const jwt = require("jsonwebtoken");
const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid ne");
        }
        req.user = user;s
        next();
      });
    } else {
      return res.status(401).json("you're not authenticated");
    }
  },
};
module.exports = middlewareController;