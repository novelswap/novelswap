'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = Number(process.env.PORT || 6969);
const http = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'dist')));

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start skynet
http.listen(port, () => {
  console.log('Listening on: ' + port);
});

module.exports = app;
