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

export const setAdminToken = (token) => {
  Cookies.set('tokenAdmin', token, { expires: 2 / 24 });
};

export const getAdminToken = () => {
  return Cookies.get('tokenAdmin');
};

export const removeAdminTokenFromCookies = () => {
  Cookies.remove('tokenAdmin');
};