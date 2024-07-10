export const setToken = (token) => {
    const expirationTime = new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toUTCString();
    document.cookie = `token=${token}; expires=${expirationTime};`;
  };