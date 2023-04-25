const express = require('express');
let app = express();
const {save, Repo} = require('../database');
const {getReposByUsername} = require('../helpers/github');
const bodyParser = require('body-parser');


// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(express.json());
app.use(bodyParser.json());


// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database

app.post('/repos', function (req, res) {
  const {username} = req.body;
  getReposByUsername(username, (err, data) => {
    if (err) {
      console.log('Error!');
    } else {
      console.log({data});
    }
  })
  res.send('POST request to GitHub API');
});

// This route should send back the top 25 repos

app.get('/repos', function (req, res) {
  res.send(res.body);
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

