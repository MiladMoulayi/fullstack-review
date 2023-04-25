import React from 'react';

const RepoList = ({ repos }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return(

    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      <ol>
        {repos.map((repo) => (
          <li key={repo._id}>
            <ul>
              <li><a href={repo.repoURL} target="_blank">{repo.repoName}</a></li>
              <li>by{' '}<a href={repo.userURL} target="_blank">{repo.user}</a></li>
              <li>Updated {formatDate(repo.updatedAt)}</li>
            </ul>
            <p></p>
          </li>
        ))}
      </ol>
    </div>

  )

};

export default RepoList;
