const API_BASE_URL = 'https://enhanced-remotely-bobcat.ngrok-free.app';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/users/register`,
  login: `${API_BASE_URL}/api/users/login`,
  getUsers: `${API_BASE_URL}/api/users/getUsers`,
  // Thêm các endpoint khác ở đây
};

export default API_ENDPOINTS;