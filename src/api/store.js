import * as Vuex from 'vuex';

import { getAppGlobal, setAppGlobal } from '../utils';

/**
 * Create a vuex store
 */
export const createStore = () => {
    const store = new Vuex.Store({
        strict: false,
        state: () => {
            return {};
        },
        getters: {
            getItem: (state) => (item) => {
                return state[item];
            },
        },
        mutations: {
            setItem: (state, { item, value }) => {
                state[item] = value;
            },
        },
    });

    return store;
};
/**
 * Gets the primary store and creates it if it doesn't exist
 */
export const getStore = () => {
    let store = getAppGlobal('store');
    if (!store) {
        store = createStore();
        setAppGlobal('store', store);
    }
    return store;
};
/**
 * Store an item in application store/cache
 *
 * If a typical app function is used in an endpoint, then there will be no store
 * However we don't want to break code that would otherwise work
 */
export const storeItem = (item, value) => {
    return getStore().commit('setItem', { item, value });
};
/**
 * Get a reactive value from the application store
 * @param key - ID in the flat store
 */
export const stored = (key) => {
    if (!key) return;

    return getStore().getters['getItem'](key);
};

export const getStoreState = () => {
    return getStore().state;
};
