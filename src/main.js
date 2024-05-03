import { createApp } from 'vue'
import App from './App.vue'
import'./assets/base.css'
import 'amfe-flexible';
import router from './router/index.js'
import store from './store/index.js'
import { Button,Icon,Toast } from 'vant';

// // 1. 引入你需要的组件
// import { Button,Icon } from 'vant';
// // 2. 引入组件样式
// import 'vant/lib/index.css';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import './api/mock.js'


const app =createApp(App)
app.use(router).use(store)
// // 3. 注册你需要的组件
// app.use(Button).use(Icon);
app.mount('#app')
