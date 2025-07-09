<template>
  <div style="padding: 20px;">
    <el-page-header content="管理员管理" class="mb-4" />

    <el-button type="primary" @click="openCreateForm" class="mb-3">添加新管理员</el-button>

    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="role" label="角色" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="editUser(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDeleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单 -->
    <el-dialog v-model="isModalVisible" :title="modalTitle" width="400px" center>
      <el-form :model="userForm" label-width="80px">
        <el-form-item label="用户名" :rules="[{ required: true, message: '用户名不能为空', trigger: 'blur' }]">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]">
          <el-input type="password" v-model="userForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色" :rules="[{ required: true, message: '角色不能为空', trigger: 'blur' }]">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="ADMIN" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userForm.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="userForm.age" :min="18" :max="100" controls-position="right" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userForm.sex" placeholder="请选择性别">
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="closeModal">取消</el-button>
        <el-button type="primary" @click="saveUser">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/api/user"; // 假设你有对应的 API

const users = ref([]);
const isModalVisible = ref(false);
const modalTitle = ref("");
const userForm = ref({
  id: null,
  username: "",
  password: "",
  role: "",
  phone: "",
  age: null,
  sex: "",
});

const fetchData = async () => {
  try {
    const data = await fetchUsers(); // 获取管理员数据
    users.value = [...data];
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const openCreateForm = () => {
  modalTitle.value = "添加管理员";
  userForm.value = { id: null, username: "", password: "", role: "", phone: "", age: null, sex: "" };
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const saveUser = async () => {
  try {
    if (!userForm.value.username || !userForm.value.password || !userForm.value.role) {
      alert("所有字段都必须填写！");
      return;
    }

    if (userForm.value.id) {
      await updateUser(userForm.value.id, userForm.value);
    } else {
      await createUser(userForm.value);
    }

    await fetchData(); // 更新用户列表
    closeModal();
  } catch (error) {
    console.error("Error saving user:", error);
    alert("保存管理员失败，请检查数据！");
  }
};

const editUser = (user) => {
  modalTitle.value = "编辑管理员";
  userForm.value = { ...user };
  isModalVisible.value = true;
};

const handleDeleteUser = async (id) => {
  try {
    await deleteUser(id);
    await fetchData(); // 更新用户列表
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("删除管理员失败，请稍后重试！");
  }
};

onMounted(fetchData);
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.el-page-header {
  margin-bottom: 20px;
}

.el-button + .el-button {
  margin-left: 10px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
