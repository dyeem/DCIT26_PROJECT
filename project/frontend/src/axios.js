// src/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = Cookies.get('XSRF-TOKEN');
if (token) {
  axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(token);
}

export default axios;
