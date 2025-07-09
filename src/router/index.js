import { createRouter, createWebHistory } from 'vue-router';
import ProductList1 from '@/views/ProductList.vue'; // 确保路径正确
import StockView from '@/views/StockView.vue';
import UserView from "@/views/UserView.vue";
import SalesStatistics from '@/views/SalesStatistics.vue';

const routes = [
    {
        path: '/',
        name: 'ProductList',
        component: ProductList1,
    },
    // 可以继续添加更多的路由配置
    {
        path: '/stock',
        name: 'StockView',
        component: StockView,
    },
    {
        path: '/user',
        name: 'UserView', // 新增的路由配置
        component: UserView, // 引入用户管理页面
    },
    {
        path: '/sales-statistics',
        name: 'SalesStatistics',
        component: SalesStatistics,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
