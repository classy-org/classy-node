export default {
  create: {
    method: 'POST'
  },

  list: {
    method: 'GET'
  },

  retrieve: {
    method: 'GET',
    path: '/{id}'
  },

  update: {
    method: 'PUT',
    path: '/{id}'
  },

  del: {
    method: 'DELETE',
    path: '/{id}'
  }

};
