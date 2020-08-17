import axios from "axios";
import { Toast } from "vant";

axios.defaults.timeout = 20000;
axios.defaults.baseURL = "/api";

// 等待所有axios请求加载完毕后，隐藏loading
let requestNum = 0;

axios.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    Toast.loading({
      message: "加载中...",
      forbidClick: true
    });
    requestNum++;
    return config;
  },
  error => {
    Toast.fail("加载失败,请联系管理员");
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  data => {
    if (requestNum >= 0) {
      requestNum--;
    } else {
      Toast.clear();
      requestNum = 0;
    }
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