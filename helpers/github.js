const axios = require('axios');
const config = require('../config.js');
const {URL} = require('url');

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
      return {repoName: repo.name, user: repo.owner.login, repoURL: repo.html_url, userURL: repo.owner.html_url};
    })
    cb(null, repos);
  }).catch((err) => {
    console.error('Error in getReposByUsername:', err);
    cb(err);
  });
}

module.exports.getReposByUsername = getReposByUsername;