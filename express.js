const express = require('express');
const morgan  = require('morgan');
const fs      = require('fs');
const path    = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms :user-agent', {
  stream: accessLogStream
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/whoami', (req, res) => {
  res.json({
    ip: req.ip,
    ua: req.get('User-Agent'),
  });
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
