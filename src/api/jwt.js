import { setCookie, getCookie, removeCookie } from './cookie';
/**
 * Gets, Sets or Destroys the user JWT token out of local storage
 */
export const clientToken = (args = {}) => {
    const domain = process.env.NODE_ENV == 'production' ? window.location.hostname : undefined;

    const { action = 'get', token } = args;
    const TOKEN_KEY = 'wzzUser';
    if (action === 'destroy') {
        removeCookie(TOKEN_KEY, { domain });
    } else if (action == 'set' && token) {
        setCookie(TOKEN_KEY, token, { expires: 14, domain });
    } else {
        const cookieValue = getCookie(TOKEN_KEY);
        return cookieValue ? cookieValue : '';
    }
};
