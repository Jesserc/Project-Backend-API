const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authCtrl");
const { validateRegister } = require("../middleware/validate");


router.post("/login", authCtrl.login)

router.post("/register", validateRegister, authCtrl.register)

router.get('/logout', authCtrl.logout)

router.get("/refresh_token", authCtrl.refreshToken)





module.exports = router;
