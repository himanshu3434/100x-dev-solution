const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");
const { Admin, User, Course } = require("../db/index");
// Admin Routes

function signJwt(username, password) {
  const schema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
  });
  const check = schema.safeParse({ username, password });

  if (check.success) {
    const payload = {
      username: username,
      password: password,
    };
    const token = jwt.sign(payload, jwtPassword);

    return token;
  } else {
    return null;
  }

  // Your code here
}

router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  Admin.create({ username: username, password: password });

  res.json({ message: "Admin Created Succesfully" });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  res.json({
    token: signJwt(username, password),
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic

  const { title, description, price, imageLink } = req.body;
  const newCourse = new Course({
    title,
    description,
    imageLink,
    price,
  });
  newCourse.save().then((savedDocument) => {
    const newDocId = savedDocument._id;
    res.json({
      message: "Course Created Successfully",
      courseid: newDocId,
    });
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

module.exports = router;
