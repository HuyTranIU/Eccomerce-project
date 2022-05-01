const app = require('./app')

const cloundinary = require('cloudinary')
const connectDatabase = require('./config/database')

// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`)

    process.exit(1)
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({ path: 'backend/config/config.env' })

}

// connecting to database
connectDatabase()

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server on working on http://loaclhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandle Promise Rejection`)

    server.close(() => {
        process.exit(1)
    })
})