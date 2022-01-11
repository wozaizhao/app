import { updateUser } from './userCurrent';
import { getRouter } from './router';

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
        if (error && error.response) {
            const { name, query } = getRouter().currentRoute.value;
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break;
                case 401:
                    error.message = '未授权，请登录';
                    if (name !== 'login') {
                        getRouter().push({
                            path: `/login?redirect=${name}&query=${query}`,
                        });
                    }
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器内部错误';
                    break;
                case 501:
                    error.message = '服务未实现';
                    break;
                case 502:
                    error.message = '网关错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网关超时';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break;
                default:
                    error.message = 'server request error';
                    break;
            }
        }
        // Toast(error.message);
        data = { status: 'error', message: error.message, data: error };
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

    if (r.data.user) {
        updateUser(() => r.data.user);
    }

    if (r.data.token) {
        clientToken({ action: 'set', token: r.data.token });
    }

    return r;
};
