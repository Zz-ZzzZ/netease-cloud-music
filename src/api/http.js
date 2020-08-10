import axios from "axios";
import { Toast } from "vant";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";

axios.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    return config;
  },
  error => {
    Toast.fail("加载失败,请联系管理员");
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    Toast.clear();
    return data;
  },
  error => {
    Toast.fail("加载失败,请联系管理员");
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
