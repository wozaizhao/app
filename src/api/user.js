import { computed } from 'vue';
import { clientToken } from './jwt';
import { dLog } from '../utils';
import { getRouter, loginRoute, routeAuthRedirects } from './router';
import { stored, storeItem } from './store';
import { endpointFetch } from './endpoint';

export const requestCaptcha = async (params) => {
    const endpoint = '/api/captcha';
    const r = await endpointFetch(endpoint, 'get', params);
    return r;
};

export const login = async (data) => {
    const endpoint = '/api/loginByPhone';
    const r = await endpointFetch(endpoint, 'post', data);
    return r;
};

export const shortcutLogin = async (data) => {
    const endpoint = '/api/shortcutLogin';
    const r = await endpointFetch(endpoint, 'post', data);
    return r;
};

export const updateUserInfo = async (data) => {
    const endpoint = '/api/user/edit';
    const r = await endpointFetch(endpoint, 'put', data);
    return r;
};

/**
 * Information for the currently logged in user
 */
export const currentUser = () => {
    return stored('currentUser');
};
/**
 * Active user computed
 */
export const activeUser = computed(() => {
    return currentUser();
});
/**
 * Is the current visitor logged in?
 */
export const isLoggedIn = computed(() => {
    return currentUser() ? true : false;
});

export const cacheUser = ({ user }) => {
    if (user && user.userId) storeItem(user.userId, user);
};

/**
 * Logs out current user and deletes local data
 */
export const deleteCurrentUser = () => {
    dLog('info', 'deleted current user');
    clientToken({ action: 'destroy' });
    storeItem('currentUser', undefined);
};
/**
 * Set persistent user info
 */
export const setCurrentUser = (args) => {
    const { user, token = '' } = args;

    if (!user) return deleteCurrentUser();

    storeItem('currentUser', user);

    if (token) {
        clientToken({ action: 'set', token });
    }
};
/**
 * Logs out the current user
 */
export const logout = async (args = {}) => {
    deleteCurrentUser();

    const theCurrentRoute = getRouter().currentRoute.value;

    if (args.redirect || !theCurrentRoute || theCurrentRoute.matched.some((r) => r.meta.auth)) {
        const { redirect: path = loginRoute() } = args;
        getRouter().push({ path });
    } else {
        // emitEvent("resetUi")
    }
};
/**
 * On initial client load, this makes the HTTP request for user auth status
 */
export const requestCurrentUser = async () => {
    const token = clientToken({ action: 'get' });

    let user = undefined;

    if (token) {
        const endpoint = '/api/user/currentUser';
        const { status, data } = await endpointFetch(endpoint, 'get');

        // If there is a token error, then delete it and force login
        if (status == 'error') {
            logout();
        }

        user = data.user;

        if (user) {
            setCurrentUser({ user });
        }
    }

    // redirect before resolve
    await routeAuthRedirects(user);

    dLog('info', 'user loaded', user);

    return user;
};

/**
 * Updates the current locally stored user
 */
export const updateUser = async (cb) => {
    const user = currentUser();
    const newUser = await cb(user);
    if (newUser) {
        setCurrentUser({ user: newUser });
    }
};
