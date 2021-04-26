function generateEndpoint(endpoint: string): string {
  const someURL = process.env.VUE_APP_API_BASE_URL;
  return endpoint.match(/^http/i)
    ? endpoint
    : someURL + endpoint;
}

const defaultHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/json' }

function handleErrors(response) {
  if (!response.ok) {
    throw response.json();
  }
  return response;
}

export default {
  get: function(endpoint: string) {

    return fetch(generateEndpoint(endpoint), {
      method: "GET",
      headers: defaultHeaders,
      credentials: 'include',
    }).then(handleErrors)
      .then((response) => response.json())
      .catch((error) => error);
  },
  get_all: function(endpoint: string) {

    return fetch(generateEndpoint(endpoint), {
      method: "GET",
      headers: defaultHeaders,
      credentials: 'include',
    }).then(handleErrors)
      .then((response) => response.json())
      .catch((error) => error);
  },
  post: function(endpoint: string, data = {}) {
    return fetch(generateEndpoint(endpoint), {
      method: "POST",
      headers: defaultHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(data),
    }).then(handleErrors)
      .then((response) => response.json())
      .catch((error) => error);
  },
  update: function(endpoint: string, data = {}) {
    return fetch(generateEndpoint(endpoint), {
      method: "PATCH",
      headers: defaultHeaders,
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(handleErrors)
      .then((response) => response.json())
      .catch((error) => error);
  },
  delete: function(endpoint: string, data = {}) {
    return fetch(generateEndpoint(endpoint), {
      method: "DELETE",
      headers: defaultHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(data),
    }).then(handleErrors)
      .then((response) => response.json())
      .catch((error) => error);
  },
};
