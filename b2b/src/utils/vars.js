export const baseUrl = 'https://storage.techlines.es/api/';

export const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  'Content-Type': 'application/json',
})