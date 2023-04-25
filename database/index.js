const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useUnifiedTopology: true,  useNewUrlParser: true  });

let repoSchema = mongoose.Schema({
  repoName: String,
  user: String,
  repoURL: String,
  userURL: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  repo = new Repo;
  repo.save((err,result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
}


module.exports.save = save;
module.exports.Repo = Repo;