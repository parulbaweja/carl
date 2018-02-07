import fetch from 'isomorphic-fetch';

const apiURL = (path) => {
  const element = document.querySelector('meta[name="jobs-api-url"]');
  const locamoApiURL = element && element.getAttribute('content');
  return `${locamoApiURL}/${path}`;
};

export default (path, cb) => {
  const url = apiURL(path);
  return fetch(url).then(function(response) {
    response.json().then(cb);
  });
};
