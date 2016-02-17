import axios from 'axios';

export default {
  getPopularUsers(language) {
    return axios.get(`https://api.github.com/search/users?q=language:${language}&sort=followers&order=desc&page=1&per_page=10`);
  },

  getUserFollowers(login) {
    return axios.get(`https://api.github.com/users/${login}/followers?per_page=1&page=1`);
  }
};
