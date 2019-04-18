const express = require('express');

const server = express();

// Middleware
server.use(express.json());

const bands = [
    {id: 1, band: 'Red Hot Chili Peppers'},
    {id: 2, band: 'Led Zeppelin'},
    {id: 3, band: 'Eminem'},
    {id: 4, band: 'John Butler Trio'},
]

server.get('/', async (req, res) => {
    res.status(200).json(bands);
})

server.post("/", (req, res) => {
    const { id, band } = req.body;
    if (!id || !band) {
      res.status(500).end();
    } else {
      res.status(201).json(req.body);
    }
  });
  
  server.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(500).end();
    } else {
      res.status(200).json({ id });
    }
  });

  server.put("/:id", (req, res) => {
    const { band } = req.body;
    if (!band) {
      res.status(500).end();
    } else {
      res.status(200).json(req.body);
    }
  });

module.exports = server;