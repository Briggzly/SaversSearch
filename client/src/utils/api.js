export default function apiRequest (path, options = {}) {
    return fetch("http://localhost:5000" + path, {
        ...options, 
        headers: {
            ...options.headers,
            jwt_token: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
}