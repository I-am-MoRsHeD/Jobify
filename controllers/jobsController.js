const { default: mongoose } = require("mongoose");
const jobsSchema = require("../schemas/jobsSchema/jobsSchema");


const jobsDB = new mongoose.model("Jobs", jobsSchema);

exports.getAllJobs = async (req, res) => {
    try {
        const data = await jobsDB.find();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

exports.getJobsByCompany = async (req, res) => {
    try {
        const { companyName } = req.query;
        const query = { companyName: companyName }

        const data = await jobsDB.find(query);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

exports.getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { _id: new Object(id) };
        const findJob = await jobsDB.find(query);
        res.send(findJob);
    } catch (error) {
        res.status(500).json({
            message: "Error occurred while fetching items",
        });
    }
}

exports.getJobsByPagination = async (req, res) => {
    try {
        const { currentPage, itemsPerPage, role } = req.query;
        let skip = 0;
        if (currentPage && itemsPerPage && role === 'admin') {
            skip = parseInt(currentPage) * parseInt(itemsPerPage);
        }
        else {
            res.status(500).json({ message: 'Unauthorized access' })
        }
        const items = await jobsDB.find().skip(skip).limit(itemsPerPage);

        if (!items || items.length === 0) {
            return res.status(404).json({
                message: "No items found"
            })
        }
        const totalCount = await jobsDB.countDocuments();

        res.status(200).json({ items, totalCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error occurred while fetching jobs",
        });
    }
}

exports.saveJobs = async (req, res) => {
    try {
        const data = req.body;
        const query = { jobId: data?.jobId };
        const existingJobId = await jobsDB.findOne(query)
        if (existingJobId) {
            return res.status(400).json({
                message: 'JobId has already been taken'
            })
        }
        const newJobs = new jobsDB(data);
        await newJobs.save();
        res.status(200).json({ message: 'success' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
}

exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = { _id: new Object(id) };
        const updatedDoc = req.body;
        await jobsDB.findByIdAndUpdate(filter, updatedDoc, {
            new: true
        })
        res.status(200).json({
            message: "success",
        });
    } catch (error) {
        console.error("Error updating jobs", error);
        res.status(500).json(error);
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const query = { _id: new Object(id) };

        const result = await jobsDB.deleteOne(query);
        if (result.deletedCount === 1) {
            res.status(202).send({
                message: "Job is deleted successfully",
                success: true,
                deletedCount: result.deletedCount,
            });
        }
    } catch (err) {
        console.error("Error deleting job:", err);
        res.status(500).json({ message: "An error occurred" });
    }
}
