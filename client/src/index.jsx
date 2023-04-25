import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { fetchTopRepos } from './api';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const topRepos = await fetchTopRepos('/api/top-repos');
      setRepos(topRepos);
    };

    fetchRepos();
  }, []);

  const search = (term) => {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      data: JSON.stringify({ username: term }),
      contentType: "application/json",
      success: (data) => {
        console.log('Search successful:', data);
        console.log('Typeof data:', typeof data);
        setRepos(data);
      },
      error: (err) => {
        console.error('Error in search:', err);
      },
    });
  };

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos} />
      <Search onSearch={search} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
