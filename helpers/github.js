const axios = require('axios');
const config = require('../config.js');
const url = require('url');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options).then((response) => {
    console.log(JSON.stringify(response.data));
  })

}

getReposByUsername('MiladMoulayi');


module.exports.getReposByUsername = getReposByUsername;