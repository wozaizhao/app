import { createApp } from 'vue';
import {
    ConfigProvider,
    Form,
    Field,
    CellGroup,
    Button,
    Tabbar,
    TabbarItem,
    Cell,
    NavBar,
    Image as VanImage,
    Icon,
    ActionSheet,
} from 'vant';

import { getRouter, addRoutes } from './api/router';
import { getStore } from './api/store';
import { routes } from './routes';
// import { setupPlugins } from "@factor/api/extend"
// import { dLog } from './utils/logger';
// import { createHead } from "@vueuse/head"
// import { initializeUser } from "@factor/api/userCurrent"
import App from './App.vue';
import 'lib-flexible/flexible.js';

import './plugins/gt4';

import VConsole from 'vconsole';

// eslint-disable-next-line
const vConsole = new VConsole();

// 全局引入按需引入UI库 vant
// import './plugins/vant';
// 引入全局样式
import './style/index.less';

// createApp(App).use(router).mount('#app');

const setupApp = async () => {
    let userConfig = {
        routes: routes,
    };

    if (userConfig.routes) {
        addRoutes(userConfig.routes);
    }

    return userConfig;
};

/**
 * Create the main Vue app
 */
export const factorApp = async () => {
    await setupApp();

    //   const renderUrl = context.renderUrl

    // only run in  browser
    if (typeof window !== 'undefined') {
        // initializeUser()
    }

    const app = createApp(App);

    // add router and store
    const router = getRouter();
    const store = getStore();

    app.use(router);
    app.use(store);
    app.use(ConfigProvider);
    app.use(Form);
    app.use(Field);
    app.use(CellGroup);
    app.use(Cell);
    app.use(Button);
    app.use(Tabbar);
    app.use(TabbarItem);
    app.use(NavBar);
    app.use(VanImage);
    app.use(Icon);
    app.use(ActionSheet);

    await router.isReady();

    //   const head = createHead()
    //   app.use(head)

    //   runCallbacks("appReady", { app, head })

    return { app, router, store };
};
/**
 * In client mode, mount the app
 */
// add window watchers
//   initializeWindow()

factorApp().then(({ app }) => {
    app.mount('#app');
    // document.querySelector("#app")?.classList.add("loaded")
    // document.querySelector(".styles-loading")?.remove()
});
