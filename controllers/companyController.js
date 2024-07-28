const { default: mongoose } = require("mongoose");
const companySchema = require("../schemas/companySchema/companySchema");


const companyDB = new mongoose.model("Company", companySchema);

exports.getAllCompany = async (req, res) => {
    try {
        const data = await companyDB.find();
        // console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error occurred while fetching items",
        });
    }
};

exports.getAllCompanyByPagination = async (req, res) => {
    try {
        const { currentPage, itemsPerPage, role } = req.query;
        let skip = 0;
        if (currentPage && itemsPerPage && role === 'admin') {
            skip = parseInt(currentPage) * parseInt(itemsPerPage);
        }
        else {
            res.status(500).json({ message: 'Unauthorized access' })
        }
        const items = await companyDB.find().skip(skip).limit(itemsPerPage);

        if (!items || items.length === 0) {
            return res.status(404).json({
                message: "No items found"
            })
        }
        const totalCount = await companyDB.countDocuments();

        res.status(200).json({ items, totalCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error occurred while fetching jobs",
        });
    }
};

exports.saveCompany = async (req, res) => {
    try {
        const data = req.body;
        const query = { companyName: data?.companyName };
        const existingCompany = await companyDB.findOne(query);
        if (existingCompany) {
            return res.status(400).json({ message: "Company name has already been taken" })
        }
        const newCompany = new companyDB(data);
        await newCompany.save();
        res.status(200).json({ message: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}