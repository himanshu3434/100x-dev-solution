// Middleware for handling auth
const { Admin } = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");

function verifyJwt(token) {
  // Your code here
  try {
    const flag = jwt.verify(token, jwtPassword);
    return true;
  } catch (err) {
    return false;
  }
}

function decodeJwt(token) {
  return jwt.decode(token);
}

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  let decoded;
  //  console.log(token);
  //returns a promise
  if (verifyJwt(token)) {
    decoded = await decodeJwt(token);

    const { username, password } = decoded;

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
  } else res.status(401).json({ msg: "Speed ma nikal lo site sa" });
}

module.exports = adminMiddleware;
