import axios from '@/axios';

export default {
  listAll(params) {
    return axios.get('/products/all', { params });
  },
  remove(id) {
    return axios.delete(`/products/${id}`);
  },
};
