const express = require("express");
const router = express.Router();
const studentCtrl = require("../controllers/studentCtrl");


router.get("/", studentCtrl.getHomeApi)

router.get("/students", studentCtrl.getAllStudents)


router.post("/student", studentCtrl.postAStudent)



module.exports = router;
