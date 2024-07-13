import axios from "axios";

const base = "http://127.0.0.1:8080/api/v1";

const axiosCall = async (method, endPoint, body) => {
  if(!endPoint) {
   throw new Error("endpoint is required.");
  }

  const config = {
    method,
    url: `${base}/${endPoint}`,
    data: body
  }

  const data = await axios(config);
  return data;
}

export default axiosCall;
