const { User } = require("../db/index");

function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  //returns a promise
  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        next();
      } else {
        res.status(401).json({ message: "Admin Not Found" });
      }
    })
    .catch((err) => {
      console.error("Error in the Admin Auth ", err);
      res.status(500).json({ message: "internal server error" });
    });
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;
