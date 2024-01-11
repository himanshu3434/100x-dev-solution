const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require("../db/index");

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  Admin.create({ username: username, password: password });

  res.json({ message: "Admin Created Succesfully" });
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

// {
//   "title":"This is title",
//   "description":"This is description",
//   "imageLink":"Image link 1",
//   "price":"30000"

// }
