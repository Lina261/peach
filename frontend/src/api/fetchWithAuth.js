import { baseUrl } from "../constants";

const checkEnspiration = (token) => {
  let data = JSON.parse(atob(token.split(".")[1]));
  return data.exp > Date.now() / 1000;
};

const fetchWithAuth = async (path, options = {}) => {
  if (!checkEnspiration(localStorage.getItem("access"))) {
    console.log("Token expired!");
    let response = await fetch(baseUrl + "token/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: localStorage.getItem("refresh") }),
      headers: { "Content-type": "application/json" },
    });
    let updatedToken = await response.json();
    localStorage.setItem("access", updatedToken.access);
  }
  options.headers["Authorization"] = `Bearer ${localStorage.getItem("access")}`;
  let response = await fetch(path, options);
  if (response.status !== 401) {
    return response;
  }
  if (!checkEnspiration(localStorage.getItem("refresh"))) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "http://localhost:3000/";
  }
};

export { fetchWithAuth };
