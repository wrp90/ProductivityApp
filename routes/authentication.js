const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util = require("util");

const passwordHash = require("../../config/passwordHash");

const authenticateUser = require("../middleware/authenticateUser");
const validateBodyWith = require("../middleware/validateBodyWith");

const { loginValidator, registerValidator } = require("../validation");

const { User } = require("../../models");

const jwtSign = util.promisify(jwt.sign);

router.post("/authenticated", authenticateUser, (req, res) => {

    res.json(req.user);

});

router.post("/login", validateBodyWith(loginValidator), async (req, res) => {

    const { email, password } = req.body;

    try {

        const user =
            await User
                .findOne({ email });

        if (!user) {
            return res.status(404).json({ default: "Email or password is invalid." });
        }

        const {
            password: encryptedPassword,
            ...secureUser
        } = user._doc;

        const isMatch = await bcrypt.compare(password, encryptedPassword);

        if (!isMatch) {
            return res.status(404).json({ default: "Email or password is invalid." });
        }

        const payload = {
            id: secureUser._id,
            email: secureUser.email,
            name: secureUser.name
        };

        const token = await jwtSign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 31556926 
            }
        );

        return res.json({
            success: true,
            token: "Bearer " + token,
            user: secureUser
        })


    } catch (err) {

        console.log(err);
        res.status(500).json({ default: "Something went wrong trying to log in." });

    }

});


router.post("/register", validateBodyWith(registerValidator), async (req, res) => {

    try {

        const { name, email, password, neighborhood } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ email: "Email already exists." });
        }

        const newUser = new User({
            name,
            email,
            password: await passwordHash(password),
            neighborhood
        });

        await newUser.save();

        const {
            password: encryptedPassword,
            ...secureUser
        } = newUser._doc;

        res.json(secureUser);

    } catch (err) {

        console.log(err);
        res.status(500).json({ default: "Something went wrong creating your account." });

    }

});

module.exports = router;