import axios from 'axios';

axios.defaults.withCredentials = true;
class Service {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.apiUrl || "http://127.0.0.1:8000" + '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Get the CSRF token from the Laravel endpoint
    this.getCsrfToken();
  }

  async getCsrfToken() {
    try {
      const response = await axios.get(process.env.apiUrl || "http://127.0.0.1:8000" + 'sanctum/csrf-cookie');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data;  // Add the token to requests
    } catch (error) {
      console.log('Failed to get CSRF token', error);
    }
  }

  setAuthorizationHeader(token) {
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  async get(url, params = {}, token) {
    if (token) this.setAuthorizationHeader(token);
    return this.axiosInstance.get(url, { params });
  }

  async post(url, data, token) {
    if (token) this.setAuthorizationHeader(token);
    return this.axiosInstance.post(url, data);
  }

  async put(url, data, token) {
    if (token) this.setAuthorizationHeader(token);
    return this.axiosInstance.put(url, data);
  }

  async delete(url, token) {
    if (token) this.setAuthorizationHeader(token);
    return this.axiosInstance.delete(url);
  }
}

export default new Service();