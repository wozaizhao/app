import { endpointFetch } from './endpoint';

export const upload = async (data) => {
    const endpoint = '/api/user/upload';
    const r = await endpointFetch(endpoint, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return r;
    // {"data":{"hash":"FpqWuUumOc74a6NBT1z-bdaZg8DK","persistentId":"","key":"FpqWuUumOc74a6NBT1z-bdaZg8DK"},"message":"","status":"success"}
};
