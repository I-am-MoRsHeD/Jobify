const { default: mongoose } = require("mongoose");
const userSchema = require("../schemas/userSchema/userSchema");

const userDB = new mongoose.model("Users", userSchema);

exports.getAllUser = async (req, res) => {
    try {
        const data = await userDB.find();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const query = { email: email }

        const data = await userDB.findOne(query);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

exports.saveUser = async (req, res) => {
    try {
        const data = req.body;
        const query = { email: data?.email };
        const existingEmail = await userDB.findOne(query)
        if (existingEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }
        const newUser = new userDB(data);
        await newUser.save();
        res.status(200).json({ message: 'success' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

exports.checkAdmin = async (req, res) => {
    const { email } = req.params;
    if (email !== req.decoded) {
        return res.status(403).send({ message: "forbidden access" });
    }
    const query = { email: email };
    const user = await userDB.findOne(query);

    const isAdmin = user?.role === "admin" ? true : false;

    res.send({ isAdmin });
}
