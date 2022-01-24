import { createRouter, createWebHistory } from 'vue-router';
import { currentUser, shortcutLogin } from './user';
import { dLog } from '../utils';
import { getAppGlobal, setAppGlobal } from '../utils';

/**
 * Add the hooks on changes
 */
const routerHooks = (router) => {
    router.afterEach((to) => {
        /**
         * Add query hook functionality
         * uses _action param to call a hook from query
         */
        const openID = to.query.openid;
        console.log('openID', openID);
        // const isLoggedIn = isLoggedIn();
        console.log('isLoggedIn', currentUser());
        if (openID && !currentUser()) {
            // do
            shortcutLogin({
                openID,
            }).then((res) => {
                console.log(res);
            });
        }
        // const queryHook = to.query._action;
        // if (queryHook) {
        //     //   runCallbacks(`routeQueryAction`, to)
        // }
    });
};
/**
 * Creates a vue router
 */
export const createFactorRouter = () => {
    const history = createWebHistory();

    const routes = [];

    const router = createRouter({
        history,
        routes,
        scrollBehavior: (to, from, savedPosition) => {
            if (savedPosition) {
                return savedPosition;
            } else if (to != from) {
                return { top: 0 };
            }
        },
    });

    routerHooks(router);

    return router;
};
/**
 * Gets the primary router and creates it if it doesn't exist
 */
export const getRouter = () => {
    let router = getAppGlobal('router');
    if (!router) {
        router = createFactorRouter();
        setAppGlobal('router', router);
    }
    return router;
};
/**
 * Adds a route to the router
 */
export const addRoute = (route) => {
    const router = getRouter();
    router.addRoute(route);
};
/**
 * Adds multiple routes to the router
 */
export const addRoutes = (routes) => {
    const router = getRouter();
    routes.forEach((r) => {
        router.addRoute(r);
    });
};
/**
 * Get the current route being viewed
 */
export const currentRoute = () => {
    return getRouter().currentRoute.value;
};
/**
 * Does the current route require authentication?
 */
export const routeRequiresAuth = () => {
    const route = currentRoute();

    return route ? route.matched.some((_) => _.meta.auth || _.meta.authRedirect) : false;
};

export const loginRoute = () => {
    return '/login';
};

export const routeAuthRedirects = async (user) => {
    const router = getRouter();
    await router.isReady();
    const { matched } = router.currentRoute.value;

    let authConfig = { redirect: '/' };
    matched.forEach(({ meta: { auth } }) => {
        if (auth) {
            authConfig = { ...authConfig, ...auth };
        }
    });

    for (const matchedRoute of matched) {
        const auth = matchedRoute.meta.auth;
        if (auth) {
            const redirect = await auth({ user });

            if (redirect) {
                dLog('event', 'auth required redirect', { redirect });
                await router.push({ path: redirect });
            }
        }
    }
};
