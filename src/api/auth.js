import { endpointFetch } from './endpoint';

export const requestCaptcha = async (params) => {
    const endpoint = '/api/captcha';
    const r = await endpointFetch(endpoint, null, { method: 'get', params });
    return r;
};

export const login = async (data) => {
    const endpoint = '/api/loginByPhone';
    const r = await endpointFetch(endpoint, data);
    return r;
};
