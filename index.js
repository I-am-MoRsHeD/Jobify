const express = require('express');
const mongoose = require('mongoose');
const companyRoutes = require("./routes/companyRoutes/index");
const jobsRoutes = require("./routes/jobRoutes/index");
const userRoutes = require("./routes/userRoutes/index");
const authRouter = require("./routes/authRoutes/index");
const applyMiddleware = require('./middlewares');

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
applyMiddleware(app);

const dburi = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.glfurem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectDB = async () => {
    try {
        await mongoose.connect(dburi);
        console.log('DB is connected');
    } catch (error) {
        console.log('DB is not connected');
        console.log(error.message);
    }
}

// app.use routes
app.use('/companies', companyRoutes);
app.use('/jobs', jobsRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Jobify is finding jobs')
})

app.listen(port, async () => {
    console.log(`Jobify is running on port ${port}`)
    await connectDB();
})