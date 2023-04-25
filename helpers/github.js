const axios = require('axios');
const config = require('../config.js');
const {URL} = require('url');
const { Repo } = require('../database/index.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const endpoint = new URL(`/users/${username}/repos`, 'https://api.github.com').href;

  let options = {
    url: endpoint,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options).then((res) => {
    var repos = res.data.map((repo) => {
      return {
        repoName: repo.name,
        user: repo.owner.login,
        repoURL: repo.html_url,
        userURL: repo.owner.html_url,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
      };
    })
    cb(null, repos);
  }).catch((err) => {
    console.error('Error in getReposByUsername:', err);
    cb(err);
  });
}

// client/src/api.js

const fetchTopRepos = async (cb) => {
  try {
    const repos = await Repo.find().sort({ updatedAt: -1 }).limit(25).exec();
    if (cb) {
      cb(null, repos);
    } else {
      return repos;
    }
  } catch (err) {
    console.error('Error in fetchTopRepos:', err);
    if (cb) {
      cb(err, null);
    } else {
      throw err;
    }
  }
};


module.exports.getReposByUsername = getReposByUsername;
module.exports.fetchTopRepos = fetchTopRepos;