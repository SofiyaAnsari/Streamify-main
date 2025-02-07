const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken");


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error while registering user." });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: 'No user found with the provided email.' });
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({ error: 'Wrong password or username.' });
    }

    const accessToken=jwt.sign({id:user._id,isAdmin:user._isAdmin},process.env.SECRET_KEY,{expiresIn:"5d"});
    const {password,...info}=user._doc;

    res.status(200).json({...info,accessToken});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error while logging in.' });
  }
});

module.exports = router;
