import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      data: JSON.stringify({username: term}),
      contentType: "application/json",
      success: (data) => {
        console.log('Search successful:', data);
        // Update the repos state if needed, e.g., setRepos(data)
      },
      error: (err) => {
        console.error('Error in search:', err);
      }
    });
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));