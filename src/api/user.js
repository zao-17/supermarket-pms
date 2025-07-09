import axios from 'axios';

// 定义 API 基础地址
const API_URL = 'http://localhost:8080/api/users';

// 获取管理员数据
export const fetchUsers = async () => {
    try {
        const response = await axios.get(API_URL, {
            withCredentials: true,
            headers: {
                // 确保请求头没有问题
            }
        });
        console.log("API Response:", response);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        if (error.code === 'ERR_NETWORK') {
            console.error('网络连接错误，请检查网络设置。');
        }
        if (error.response) {
            console.error('服务器返回错误状态码:', error.response.status);
            console.error('错误信息:', error.response.data);
        }
        throw error;
    }
};

// 创建新的管理员
export const createUser = async (user) => {
    try {
        const response = await axios.post(API_URL, user, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json' // 确保设置正确的 Content-Type
            }
        });
        console.log("Create User API Response:", response); // 打印响应信息
        return response.data;
    } catch (error) {
        console.error('Error creating users:', error);
        if (error.code === 'ERR_NETWORK') {
            console.error('网络连接错误，请检查网络设置。');
        }
        if (error.response) {
            console.error('服务器返回错误状态码:', error.response.status);
            console.error('错误信息:', error.response.data);
        }
        throw error;
    }
};

// 更新管理员信息
export const updateUser = async (id, user) => {
    try {
        // 修改为使用 API_URL
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data; // 假设返回的是更新后的用户数据
    } catch (error) {
        console.error('55555Error updating user:', error);
        throw error;
    }
};

// 删除管理员
export const deleteUser = async (id) => {
    try {
        // 修改为使用 API_URL
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // 假设返回的是删除后的状态信息
    } catch (error) {
        console.error('4444Error deleting user:', error);
        throw error;
    }
};