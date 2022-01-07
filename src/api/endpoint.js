import { updateUser } from './userCurrent';
import axios from 'axios';
import { Toast } from 'vant';

// import { emitEvent } from './event';
import { clientToken } from './jwt';
import { dLog } from '../utils';

/**
 * Make a request with Authorization header which represents the auth
 * state of the logged in user (bearer)
 */
export const endpointRequest = async (options = {}) => {
    const { headers = {}, method } = options;

    // Must be capitalized as name is a standard
    const Authorization = `Bearer ${clientToken({ action: 'get' })}`;

    // Allow endpoints to deduce which app is requesting from them
    const source = 'app';

    options.headers = { Authorization, from: source, ...headers };

    options.method = method ?? 'POST';

    options.baseURL = '';

    dLog('info', 'http request', options);

    let data;
    try {
        const response = await axios.request(options);
        data = response.data;
    } catch (error) {
        dLog('error', 'server request error', error);
        data = { status: 'error', message: 'server request error', data: error };
    }

    dLog('info', 'http response', data);

    return data;
};

export const endpointFetch = async (url, data, options = {}) => {
    const r = await endpointRequest({
        url,
        data,
        ...options,
    });

    if (r.message) {
        Toast(r.message);
        // const notifyType = r.status == 'error' ? 'notifyError' : 'notifySuccess';
        // emitEvent(notifyType, { message: r.message, more: r.more })
    }

    if (r.user) {
        updateUser(() => r.user);
    }

    if (r.token) {
        clientToken({ action: 'set', token: r.token });
    }

    return r;
};
