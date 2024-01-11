const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const zod = require("zod");
const { Admin, User, Course } = require("../db/index");

// User Routes
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
  // Implement user signup logic

  const { username, password } = req.body;

  User.create({ username: username, password: password });

  res.json({ message: "User Created Succesfully" });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  res.json({
    token: signJwt(username, password),
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  const courseId = req.params.courseId;
  const { username } = decoded;

  await User.updateOne(
    { username: username },
    { $push: { purchasedCourses: courseId } }
  );

  res.json({ messasge: "Course purchased Successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  const { username } = decoded;
  const user = await User.findOne({ username });

  const course = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    msg: course,
  });
});
module.exports = router;
