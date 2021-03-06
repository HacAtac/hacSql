const express = require('express')
const mysql = require('mysql2')
const inputCheck = require('./utils/inputCheck')

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

app.get('/api/candidates', (req, res) => {
  const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id`
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: err.message })
    }
    res.json({
      message: 'Success',
      data: rows,
    })
  })
})

//GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err)
//   }

//   console.log(row)
// })

//GET a single canddiate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE candidates.id = ${req.params.id}`
  db.query(sql, (err, row) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: err.message })
    }
    res.json({
      message: 'Success',
      data: row,
    })
  })
})

//DELETE a single candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if (err) {
//     console.log(err)
//   }

//   console.log(result)
// })
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ${req.params.id}`
  db.query(sql, (err, row) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: err.message })
    } else {
      if (row.affectedRows === 0) {
        return res.status(404).json({ error: 'Candidate not found' })
      }
    }
    res.json({
      message: `Successfully deleted candidate with id ${req.params.id}`,
      changes: row.affectedRows,
    })
  })
})

//Create a new candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?, ?, ?, ?)`

// const params = [1, 'Ronald', 'McDonald', 1]

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err)
//   }

//   console.log(result)
// })
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(
    body,
    'first_name',
    'last_name',
    'industry_connected'
  )
  if (errors) {
    res.status(400).json({ error: errors })
    return
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?, ?, ?)`

  const params = [body.first_name, body.last_name, body.industry_connected]

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.json({
      message: 'Success',
      data: body,
    })
  })
})

//UPDATE a candidates party
app.put('/api/candidate/:id', (req, res) => {
  const errors = inputCheck(req.body, 'party_id')
  if (errors) {
    res.status(400).json({ error: errors })
    return
  }
  const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`
  const params = [req.body.party_id, req.params.id]
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: err.message })
    } else {
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Candidate not found' })
      }
    }
    res.json({
      message: 'Success',
      data: req.body,
      changes: result.affectedRows,
    })
  })
})

//GET all parties
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`
  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({
      message: 'Success',
      data: rows,
    })
  })
})

//GET a single party
app.get('/api/party/:id', (req, res) => {
  const sql = `SELECT * FROM parties WHERE id = ${req.params.id}`
  db.query(sql, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({
      message: 'Success',
      data: row,
    })
  })
})

//DELETE a single party
app.delete('/api/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ${req.params.id}`
  db.query(sql, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    } else {
      if (row.affectedRows === 0) {
        return res.status(404).json({ error: 'Party not found' })
      }
    }
    res.json({
      message: `Successfully deleted party with id ${req.params.id}`,
      changes: row.affectedRows,
    })
  })
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
