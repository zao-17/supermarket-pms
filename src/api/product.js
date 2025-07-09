// src/api/product.js
import axios from 'axios';

// 设置 API 基本路径
//const API_URL = '/api/products';  // 你可以根据你的后端 API 路径修改
const API_URL = 'http://localhost:8080/api/products';  // 使用完整路径


//echats
export const fetchSalesRank = async () => {
    const response = await axios.get('/api/products/sales-rank');
    return response.data; // 返回 [{name: "可乐", salesVolume: 100}, ...]
};


export const fetchProducts1 = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response);  // 打印 API 返回值，检查数据
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


// 创建新产品
export const createProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;  // 返回创建的产品数据
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// 更新产品
export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        return response.data;  // 返回更新后的产品数据

    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// 删除产品
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
//
export const sellProductAPI = async (product, sellAmount) => {
    try {
        const updatedProduct = {
            ...product,
            stock: product.stock - sellAmount,
            sales_volume: product.sales_volume + sellAmount,
            turnover:product.price*product.sales_volume
        };
        const response = await axios.put(`${API_URL}/${product.id}`, updatedProduct);
        console.log('Sell Product API Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error selling product:', error);
        throw error;
    }
};

