import queryString from "query-string";

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

export default class CallApi {
  static get(endpoint, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_V3,
      ...params,
    };
    return fetchApi(
      `${API_URL}${endpoint}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  static post(endpoint, options = {}) {
    const { params = {}, body = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_V3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${endpoint}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  }

  static delete(endpoint, options = {}) {
    const { params = {}, body } = options;
    const queryStringParams = {
      api_key: API_KEY_V3,
      ...params,
    };

    return fetchApi(
      `${API_URL}${endpoint}?${queryString.stringify(queryStringParams)}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  }
}
