const express = require('express');
let app = express();
const { save, Repo } = require('../database');
const { getReposByUsername, fetchTopRepos } = require('../helpers/github');
const bodyParser = require('body-parser');

// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(express.json());
app.use(bodyParser.json());

// Add this new route for fetching top repos
app.get('/api/top-repos', async (req, res) => {
  try {
    const repos = await fetchTopRepos();
    res.status(200).json(repos);
  } catch (err) {
    console.error('Error fetching top repos:', err);
    res.status(500).send(err);
  }
});

// This route should take the github username provided
// and get the repo information from the github API, then
// save the repo information in the database
app.post('/repos', async function (req, res) {
  const { username } = req.body;

  try {
    const data = await getReposByUsername(username);
    const savedRepos = [];

    for (const repo of data) {
      const existingRepo = await Repo.findOne({ repo_id: repo.repo_id });

      if (!existingRepo) {
        const savedRepo = await save(repo);
        savedRepos.push(savedRepo);
      } else {
        console.log('Repo already exists in the database');
      }
    }

    const topRepos = await fetchTopRepos();
    res.status(200).json(topRepos);
  } catch (error) {
    console.log('Error in POST /repos:', error);
    res.status(500).send(error);
  }
});

app.get('/repos', function (req, res) {
  fetchTopRepos((err, repos) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(repos);
    }
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
