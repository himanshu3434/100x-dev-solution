const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  User.create({ username: username, password: password });

  res.json({ message: "User Created Succesfully" });
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
  const courseId = req.params.courseId;
  const { username } = req.headers;

  await User.updateOne(
    { username: username },
    { $push: { purchasedCourses: courseId } }
  );

  res.json({ messasge: "Course purchased Successfully" });
});

// User.updateOne({ _id: 1 }, { $push: { scores: 89 } });

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
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
