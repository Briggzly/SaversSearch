export default function apiRequest(path, options = {}) {
  return fetch(process.env.REACT_APP_API_BASE_URI + path, {
    ...options,
    headers: {
      ...options.headers,
      jwt_token: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
