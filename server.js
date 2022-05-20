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

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows)
// })

//GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err)
//   }

//   console.log(row)
// })

//DELETE a single candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err)
//   }

//   console.log(result)
// })

//Create a new candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?, ?, ?, ?)`

// const params = [1, 'Ronald', 'McDonald', 1]

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err)
//   }

//   console.log(result)
// })

//Default response for any other request (NOT FOUND)
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
