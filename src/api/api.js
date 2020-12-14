export const API_URL = "https://api.themoviedb.org/3/";
export const API_KEY_V3 = "dd4d3580d5d050f5ede3676f3a13bb25";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => resolve(data))
      .catch((response) => response.json().then((error) => reject(error)));
  });
};
