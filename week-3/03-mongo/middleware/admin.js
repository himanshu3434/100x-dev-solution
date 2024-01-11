// Middleware for handling auth
const { Admin } = require("../db/index");

function adminMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  //returns a promise
  console.log(username);
  console.log(password);
  Admin.findOne({ username, password })
    .then((admin) => {
      if (admin) {
        next();
      } else {
        console.log(admin);
        res.status(401).json({ message: "Admin Not Found" });
      }
    })
    .catch((err) => {
      console.error("Error in the Admin Auth ", err);
      res.status(500).json({ message: "internal server error" });
    });

  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;
