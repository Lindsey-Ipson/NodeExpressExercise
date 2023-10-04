const express = require('express');
const ExpressError = require('./expressError')
const axios = require('axios');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));


app.post('/', async (req, res, next) => {
  try {
    let results = await Promise.all(req.body.developers.map(async (d) => {
      return await axios.get(`https://api.github.com/users/${d}`);
    }));

    let output = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(output));
  } catch (err) {
    next(err);
  }
});


app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});


app.use(function(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;

  return res.status(status).json({
    error: {message, status}
  });
});


module.exports = app;
