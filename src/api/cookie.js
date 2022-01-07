import Cookies from 'js-cookie';

/**
 * Simple set browser cookie
 * https://stackoverflow.com/a/23086139/1858322
 */
export const setCookie = (name, value, attributes) => {
    return Cookies.set(name, value, attributes);
};
/**
 * Get a browser cookie by name
 */
export const getCookie = (name) => {
    return Cookies.get(name);
};
export const removeCookie = (name, attributes) => {
    return Cookies.remove(name, attributes);
};
