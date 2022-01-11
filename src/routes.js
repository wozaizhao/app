export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./views/home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/about.vue'),
    },
    {
        path: '/apps',
        name: 'apps',
        component: () => import('./views/apps.vue'),
    },
    {
        path: '/me',
        name: 'me',
        component: () => import('./views/me.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/login.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('./views/profile/profile.vue'),
    },
    {
        path: '/updateProfile',
        name: 'updateProfile',
        component: () => import('./views/profile/update.vue'),
    },
    {
        path: '/updateAvatar',
        name: 'updateAvatar',
        component: () => import('./views/profile/avatar.vue'),
    },
    //   ...blogRoutes,
    //   ...docsRoutes,
];
