const Course = require("../models/courseModel");

/**
 * Creates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = async (req, res) => {
  let course = new Course(req.body);
  await course
    .save()
    .then((course) => {
      res.status(201); // CREATED
      res.header({
        location: `/api/courses/?id=${course.id}`,
      });
      res.json(course);
    })
    .catch((err) => {
      res.status(422);
      console.log("error while saving the course", err);
      res.json({
        error: "There was an error saving the course",
      });
    });
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id)
      .populate("teacher")
      .then((course) => {
        res.json(course);
      })
      .catch((err) => {
        res.status(404);
        console.log("error while queryting the course", err);
        res.json({ error: "Course doesnt exist" });
      });
  } else {
    // get all teachers
    Course.find()
      .populate("teacher")
      .then((courses) => {
        res.json(courses);
      })
      .catch((err) => {
        res.status(422);
        res.json({ error: err });
      });
  }
};

/**
 * Get all student
 *
 * @param {*} req
 * @param {*} res
 */

const coursePatch = (req, res) => {
  if (req.query && req.query.id) {
    Course.findByIdAndUpdate(req.query.id, req.body, function (err, course) {
      if (err) {
        res.status(404);
        console.log("error while queryting the course", err);
        res.json({ error: "Course doesnt exist" });
      } else {
        res.status(200); // OK
        res.json(course);
      }
    });
  }
};

/**
 * Get all student
 *
 * @param {*} req
 * @param {*} res
 */

const courseDelete = (req, res) => {
  if (req.query && req.query.id) {
    Course.findByIdAndDelete(req.query.id, function (err) {
      if (err) {
        res.status(404);
        console.log("error while queryting the course", err);
        res.json({ error: "Course doesnt exist" });
      }
      /*if (err) {
        res.status(422);
        console.log('error while deleting the course', err)
        res.json({
          error: 'There was an error deleting the course'
        });
      }*/
      res.status(204);
      res.json({});
    });
  } else {
    res.status(404);
    console.log("error while queryting the course");
    res.json({ error: "Course doesnt exist" });
  }
};

module.exports = {
  coursePost,
  courseGet,
  coursePatch,
  courseDelete,
};
