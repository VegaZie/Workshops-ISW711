const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/utn");

const {
  teacherPatch,
  teacherPost,
  teacherGet,
  teacherDelete
} = require("./controllers/teacherController.js");

const {
  studentGet,
  studentPost,
  studentPatch,
  studentDelete
} = require("./controllers/studentsController");

const {
  coursePost, courseGet, coursePatch, courseDelete
} = require("./controllers/courseController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));


// students
app.get("/api/students", studentGet);
app.post("/api/students", studentPost);
app.patch("/api/students", studentPatch);
app.put("/api/students", studentPatch);
app.delete("/api/students", studentDelete);

//teachers
app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers", teacherPatch);
app.put("/api/teachers", teacherPatch);
app.delete("/api/teachers", teacherDelete);

// courses
app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);
app.patch("/api/courses", coursePatch);
app.put("/api/courses", coursePatch);
app.delete("/api/courses", courseDelete);




app.listen(3001, () => console.log(`Example app listening on port 3001!`))
