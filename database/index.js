const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  login: String,
  id: Number,
  node_id: String,
  avatar_url: String,
  url: String,
  html_url: String,
  repos_url: String,
  type: String,
  site_admin: Boolean,
  name: String,
  company: String,
  location: String,
  email: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: String,
  updated_at: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;