var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

// Axios: Promise-based HTTP client. Great for dealing with Async requests to APIs.
function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function (user) {
      return user.data;
    })
}

function getRepositories (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

// Reduce will reduce array (bummer!) to a single value. Receives a counter initially with 0, and adds the number
// of stars attributed to a repo to it.
function getStarsCount (repos) {
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count;
  }, 0)
}

function scoreIt (user, repos) {
  let public_repos = user.public_repos;
  let sumStars = getStarsCount(repos);
  let followers = user.followers;

  return (public_repos * 4) + (followers * 2) + sumStars;
} 

function errorHandler (error) {
  console.warn(error);
  
  return null;
}

// axios.all receives an array of promises.
function getUserData (user) {
  return axios.all([
    getProfile(user),
    getRepositories(user)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: scoreIt(profile, repos)
    }
  })
}

function sortPlayers (users) {
  return users.sort(function (one, two) {
    return two.score - one.score;
  })
}

module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(errorHandler)
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};
