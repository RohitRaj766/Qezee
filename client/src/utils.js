import Cookies from 'js-cookie';

export const setToken = (token) => {
  Cookies.set('token', token, { expires: 2 / 24 });
};

export const removeTokenFromCookies = () => {
  Cookies.remove('token');
};

export const getToken = () => {
  return Cookies.get('token');
};