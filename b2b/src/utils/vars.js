export const baseUrl = 'http://localhost:4000/api/';

export const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  'Content-Type': 'application/json',
})