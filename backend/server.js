//! start the server

const app = require('./src/app');
const connectDB = require('./db/db');
const dotenv = require('dotenv');
dotenv.config();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});