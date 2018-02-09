import fetch from 'isomorphic-fetch';

const apiURL = (path) => {
  const element = document.querySelector('meta[name="jobs-api-url"]');
  const jobsApiURL = element && element.getAttribute('content');
  return `${jobsApiURL}/${path}`;
};

const postRequest = (path, body, cb) => {
  const url = apiURL(path);
  const metadata = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(url, metadata).then(function(response) {
    response.json().then(cb);
  });
};

export default (path, cb) => {
  const url = apiURL(path);
  return fetch(url).then(function(response) {
    response.json().then(cb);
  });
};

export {postRequest};