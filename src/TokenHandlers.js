export const checkIsTokenExpired = () => {
    const expiration = localStorage.getItem('expiration');
    if (!expiration) return true;
  
    const expirationDate = new Date(expiration);
    const currentDate = new Date();
  
    return expirationDate <= currentDate;
};

export const checkIsLoggedIn = () => {
    const loggedIn = localStorage.getItem('userRole');
    if (loggedIn) return true;
  
    return false;
};

export const checkIsAdmin = () => {
    const loggedIn = localStorage.getItem('userRole');
    if(loggedIn && loggedIn=="Admin")
        return true;
    else
        return false;
};
