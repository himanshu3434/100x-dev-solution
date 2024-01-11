const { User } = require("../db/index");
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

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  const token = req.headers.authorization;
  let decoded;
  //returns a promise
  if (verifyJwt(token)) {
    decoded = await decodeJwt(token);
  } else res.status(401).json({ msg: "Speed ma nikal lo site sa" });

  const { username, password } = decoded;
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
}

module.exports = userMiddleware;
