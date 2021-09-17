const express = require('express')

const server = express()

server.all("/", (req, res) => {
  res.send("Bot is running.")
})

function cronPing() {
  server.listen(6969, () => {
    console.log("Server is pinged.")
  })
}

module.exports = cronPing