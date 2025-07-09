// vite.config.js
import { defineConfig } from 'vite';  // 导入 Vite 的配置方法
import vue from '@vitejs/plugin-vue';  // 导入 Vite Vue 插件
import path from 'path';  // 用于路径解析

// Vite 配置
export default defineConfig({
    plugins: [vue()],  // 配置 Vue 插件
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),  // 设置路径别名 '@' 指向 src 文件夹
        },
    },
});
