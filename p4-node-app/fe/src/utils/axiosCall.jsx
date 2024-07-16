import axios from "axios";

const base = "https://mailmen-api.vercel.app/api/v1";

const axiosCall = async (method, endPoint, body) => {
  if (!endPoint) {
    throw new Error("Endpoint is required.");
  }

  const token = localStorage.getItem("token");

  let headers = {};

  if (body instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    url: `${base}/${endPoint}`,
    headers,
    data: body
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Axios call error:", error);
    throw error;
  }
};

export default axiosCall;
