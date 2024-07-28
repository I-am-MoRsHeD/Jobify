const logout = (req, res) => {
const user = req.body;
res.clearCookie("accessToken", {maxAge: 0}).send({success: true});
};

module.exports = logout;