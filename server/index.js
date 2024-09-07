const express = require('express')
require('dotenv').config()
require('./database/connection')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: 'https://codeverification-task-back.vercel.app/', 
    credentials: true,
  }));

const generationRoute = require('./routes/codegenerator')
const verificationRoute = require('./routes/codeverification')

app.use(generationRoute)
app.use(verificationRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
