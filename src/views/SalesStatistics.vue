<template>
  <div style="padding: 20px;">
    <el-page-header content="销售统计" class="mb-4" />
    <!-- 添加排序按钮 -->
    <div class="mb-3">
      <el-button @click="sortBySalesVolume('asc')">按销量升序排序</el-button>
      <el-button @click="sortBySalesVolume('desc')">按销量降序排序</el-button>
      <el-button @click="sortByTurnover('asc')">按营业额升序排序</el-button>
      <el-button @click="sortByTurnover('desc')">按营业额降序排序</el-button>
      <el-button @click="resetSort">重置排序</el-button>
      <div>当前排序: {{ sortStatus }}</div>
    </div>
    <el-table :data="products" border style="width: 100%">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="sales_volume" label="销量" />
      <el-table-column prop="turnover" label="营业额" />
      <el-table-column prop="cost_price" label="成本价格" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchProducts1 } from '@/api/product';

const products = ref([]);
const originalProducts = ref([]);
const sortStatus = ref('无');

const fetchData = async () => {
  try {
    const data = await fetchProducts1();
    products.value = [...data];
    originalProducts.value = [...data];
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// 按销量排序
const sortBySalesVolume = (order) => {
  if (order === 'asc') {
    products.value.sort((a, b) => a.sales_volume - b.sales_volume);
    sortStatus.value = '按销量升序排序';
  } else {
    products.value.sort((a, b) => b.sales_volume - a.sales_volume);
    sortStatus.value = '按销量降序排序';
  }
};

// 按营业额排序
const sortByTurnover = (order) => {
  if (order === 'asc') {
    products.value.sort((a, b) => a.turnover - b.turnover);
    sortStatus.value = '按营业额升序排序';
  } else {
    products.value.sort((a, b) => b.turnover - a.turnover);
    sortStatus.value = '按营业额降序排序';
  }
};

// 重置排序
const resetSort = () => {
  products.value = [...originalProducts.value];
  sortStatus.value = '无';
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

.mb-3 {
  margin-bottom: 1rem;
}

.mb-4 {
  margin-bottom: 1.5rem;
}
</style>