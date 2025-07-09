// src/main.js

// 1. 引入 Vue 核心模块
import { createApp } from 'vue';
import App from './App.vue';

// 2. 引入 Element Plus UI 框架及其样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 3. 引入 Vue Router 相关模块
import { createRouter, createWebHistory } from 'vue-router';

// 4. 引入页面组件（确保该文件存在）
import ProductList from './views/ProductList.vue';
import StockView from './views/StockView.vue';  // 确保你有这个组件
import UserView from '@/views/UserView.vue';
import SalesStatistics from '@/views/SalesStatistics.vue';
// 5. 定义路由规则
const routes = [
    { path: '/', component: ProductList },  // 商品管理
    { path: '/stock', component: StockView }, // 库存管理
    { path: '/user', component: UserView },
    {
        path: '/sales-statistics',
        component: SalesStatistics,
    }
];

// 6. 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 7. 创建 Vue 应用并挂载插件
const app = createApp(App);
app.use(ElementPlus); // 注册 ElementPlus
app.use(router);      // 注册 Vue Router

// 8. 挂载到 HTML 的 #app 节点上
app.mount('#app');
