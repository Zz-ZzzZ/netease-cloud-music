import axios from "axios";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";

axios.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
