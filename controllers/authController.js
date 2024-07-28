const jwt = require("jsonwebtoken");
require("dotenv").config();


const authController = async (req, res, next) => {
try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d"
    });

    res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 31536000000,
    })
    .send({ success: true});
} catch (error) {
    console.error("Error generating auth cookie:", error);
    next(error)
}
};

module.exports = authController;
