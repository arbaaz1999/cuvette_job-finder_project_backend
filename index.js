const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoute');
const jobRouter = require('./routes/jobRoute');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json()); // to accept data in json format
dotenv.config(); // to configure environmental variables
connectDB(); // function to connect with mongo database
port = process.env.PORT || 8000


app.use('/v1/api/users', userRouter);
app.use('/v1/api/jobs', jobRouter)

app.use(errorHandler)

app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log('app is running on ', port)
})