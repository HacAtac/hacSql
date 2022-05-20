const express = require('express')
const mysql = require('mysql2')

const PORT = process.env.PORT || 3001

const app = express()

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Chiefy21!',
    database: 'election',
  },
  console.log(`Connected to election database`)
)

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows)
})

//Default response for any other request (NOT FOUND)
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
