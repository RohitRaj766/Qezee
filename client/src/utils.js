export const setToken = (token) => {
    console.log("Token in Utils :: ", token)
    const expirationTime = new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toUTCString();
    document.cookie = `token=${token}; expires=${expirationTime};`;
};

export  const removeTokenFromCookies = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};