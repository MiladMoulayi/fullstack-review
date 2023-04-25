import axios from 'axios';

export const fetchTopRepos = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching top repos:', error);
    return [];
  }
};