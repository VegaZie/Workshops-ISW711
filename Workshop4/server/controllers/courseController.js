const courseModel = require("../models/courseModel");

const courseGet = (req, res) => {
  return courseModel.find((error, courses) => {
    if(error) {
      console.log('there was an error', error);
    }
    return courses;
  }).populate('teacher').exec();
};

const courseGetById = async (args) => {
  try {
    const course = await courseModel.findById(args.id).exec();
    if (course) {
      return {
        _id: course._id.toString(),
        name: course.name,
        credits: course.credits,
        teacher: course.teacher.toString(),
      };
    } else {
      throw new Error('Course not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  courseGet,
  courseGetById,
};
