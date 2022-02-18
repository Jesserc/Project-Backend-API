const Students = require("../models/studentmodel");


const studentCtrl = {
    getHomeApi: async (req, res) => {


        res.status(200).json({msg: "Welcome to Creek Backend"});
    },

    getAllStudents: async (req, res) => {
        const student = await Students.find();
      
        res.status(200).json(student);
    },

    postAStudent: async (req, res) => {
        const { firstName, lastName, middleName, stateOfOrigin, dob, phoneNumber, email, gender,course, address, lga} = req.body;
      
        const newStudent = new Students({ firstName, lastName, middleName, stateOfOrigin, dob, phoneNumber, email, gender, course, address, lga });
        
        await newStudent.save();
      
        return res.status(200).json({
          msg: "registration successful"} );
      }
}




module.exports = studentCtrl;