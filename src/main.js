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
    RadioGroup,
    Radio,
    // Picker,
} from 'vant';

import { getRouter, addRoutes } from './api/router';
import { getStore } from './api/store';
import { routes } from './routes';
import App from './App.vue';
import 'lib-flexible/flexible.js';

import './plugins/gt4';

import VConsole from 'vconsole';

// eslint-disable-next-line
const vConsole = new VConsole();

// 引入全局样式
import './style/index.less';

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
export const wzzApp = async () => {
    await setupApp();

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
    app.use(RadioGroup);
    app.use(Radio);
    // app.use(Picker);

    await router.isReady();

    return { app, router, store };
};

wzzApp().then(({ app }) => {
    app.mount('#app');
});
