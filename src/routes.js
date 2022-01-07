export const routes = [
    {
        path: '/',
        component: () => import('./views/home.vue'),
    },
    {
        path: '/about',
        component: () => import('./views/about.vue'),
    },
    {
        path: '/login',
        component: () => import('./views/login.vue'),
    },
    //   ...blogRoutes,
    //   ...docsRoutes,
];
