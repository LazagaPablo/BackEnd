const express = require('express')
const app = express()
const routes = require('./routes/index')
const PORT = 8080

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
server.on('error', err => console.log(err))

// Routes
app.use(express.json())
app.use(routes)
