const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const config = require("config")
const { check, validationResult } = require("express-validator")
const authMiddleware = require("../middlewares/authMiddleware")
const exp = 2 * 24 * 60 * 60
// #route: /api/users
// method   POST
// #operation: creating a new user
// #accessibility:   public
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).send("Server Error")
  }
})
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mrabdu965@gmail.com",
    pass: "lujain188965ge",
  },
  tls: { rejectUnauthorized: false },
})

router.get("/confirmation/:token", async (req, res) => {
  try {
    const userId = await jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    ).user.id
    const user = await User.findByIdAndUpdate(
      userId,
      { confirmed: true },
      { new: true }
    )(user.confirmed === true)
    res.redirect("http://localhost:3000/login")
  } catch (error) {}
})
// #route: /api/users
// #operation: creating a new user
// #accessibility:   public
router.post(
  "/",
  [
    check("userName", "please enter your userName").not().isEmpty(),
    check("email", "please enter your email").isEmail(),
    check("password", "please enter a longer password").isLength({ min: 6 }),
    check("profileType", "please choose a profile type").not().isEmpty(),
  ],
  async (req, res) => {
    // res.send("register a new user");
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }

    const { userName, email, password, isAdmin, profileType, photo } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: "user already exists" })
      }

      user = new User({
        userName,
        email,
        password,
        profileType,
        isAdmin,
        photo,
      })
      // hashing user's password

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
       await user.save()
       // generating jwt
       const payload = {
         user: {
           id: user._id,
         },
       }
       jwt.sign(
         payload,
         process.env.JWT_SECRET_KEY,
         { expiresIn: 36000 },
         (err, token) => {
           if (err) throw err
           //  console.log(user.email)
           //  const url = `http://localhost:8000/api/users/confirmation/${token}`
           //  transporter.sendMail({
           //    from: "from <carrerland000@gmail.com>",
           //    to: user.email,
           //    subject: "Email Confirmation",
           //    html: ` <h4 style="color:red background-black">Thanks for Choosing HireLand!</h4> <br/> <h3>Please click here
           //             to Confirm your Email:
           //             ${url} <a href=${url}></a> </h3>`,
           //  })
           res.status(200).json(token)
         }
       )
    } catch (error) {
      //
      res.status(500).send("Server Error")
    }
  }
)
// #route:           /api/users/:id
// #operation:       deleting a user
// #accessibility:   protected
// [#note:           admins have the  access to delete users]
router.delete("/:id", authMiddleware, async (req, res) => {});

// [#route:           /api/users/me]
// [#operation:       updating the user's credential]
// [#accessibility:   protected]
// [#note:            admins can't update users' acounts]
router.put("/me", authMiddleware, async (req, res) => {});
module.exports = router;
