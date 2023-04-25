import React from 'react';

const RepoList = ({ repos }) => {
  console.log('RepoList received repos:', repos);
  console.log('Typeof repos:', typeof repos);

  if (typeof repos === 'string') {
    repos = JSON.parse(repos);
  }

  return(

    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      <ul>
        {repos.map((repo) => (
          <li key={repo._id}>
            <a href={repo.repoURL}>{repo.repoName}</a> by{' '}
            <a href={repo.userURL}>{repo.user}</a> - Updated at {repo.updatedAt}
          </li>
        ))}
      </ul>
    </div>

  )

};

export default RepoList;
