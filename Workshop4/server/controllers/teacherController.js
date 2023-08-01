const Teacher = require("../models/teacherModel");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = async (req, res) => {
  let teacher = new Teacher();

  teacher.first_name = req.body.first_name;
  teacher.last_name = req.body.last_name;
  teacher.cedula = req.body.cedula;
  teacher.age = req.body.age;

  // validates if the request includes at least the name nad last name
  if (teacher.first_name && teacher.last_name) {
    await teacher
      .save()
      .then((data) => {
        // teacher was created
        res.status(201); // CREATED
        res.header({
          location: `/api/teachers/?id=${data.id}`,
        });
        res.json(data);
      })
      .catch((err) => {
        res.status(422);
        console.log("error while saving the teacher", err);
        res.json({
          error: "There was an error saving the teacher",
        });
      });
  } else {
    res.status(422);
    console.log("error while saving the teacher");
    res.json({
      error: "No valid data provided for teacher",
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const teacherGet = async () => {
  try {
    const teachers = await Teacher.find().exec();
    return teachers.map((teacher) => {
      return {
        _id: teacher._id.toString(),
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        cedula: teacher.cedula,
        age: teacher.age,
      };
    });
  } catch (error) {
    console.log("there was an error", error);
    return [];
  }
};

const teacherGetById = async (args) => {
  try {
    const teacher = await Teacher.findById(args.id).exec();
    if (teacher) {
      return {
        _id: teacher._id.toString(),
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        cedula: teacher.cedula,
        age: teacher.age,
      };
    } else {
      throw new Error("Teacher not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Updates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPatch = (req, res) => {
  // get teacher by id
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log("error while queryting the teacher", err);
        res.json({ error: "Teacher doesnt exist" });
      }

      // update the teacher object (patch)
      teacher.title = req.body.title ? req.body.title : teacher.title;
      teacher.detail = req.body.detail ? req.body.detail : teacher.detail;
      // update the teacher object (put)
      // teacher.title = req.body.title
      // teacher.detail = req.body.detail

      teacher.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the teacher", err);
          res.json({
            error: "There was an error saving the teacher",
          });
        }
        res.status(200); // OK
        res.json(teacher);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Teacher doesnt exist" });
  }
};

/**
 * Deletes a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherDelete = (req, res) => {
  // get teacher by id
  if (req.query && req.query.id) {
    Teacher.findById(req.query.id, function (err, teacher) {
      if (err) {
        res.status(404);
        console.log("error while queryting the teacher", err);
        res.json({ error: "Teacher doesnt exist" });
      }

      teacher.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log("error while deleting the teacher", err);
          res.json({
            error: "There was an error deleting the teacher",
          });
        }
        res.status(204); //No content
        res.json({});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Teacher doesnt exist" });
  }
};

module.exports = {
  teacherGet,
  teacherGetById,
  teacherPost,
  teacherPatch,
  teacherDelete,
};
