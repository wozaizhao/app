import { endpointFetch } from './endpoint';

export const upload = async (data) => {
    const endpoint = '/api/user/upload';
    const r = await endpointFetch(endpoint, 'post', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return r;
};
