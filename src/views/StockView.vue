<template>
  <div style="padding: 20px;">
    <el-page-header content="库存管理" class="mb-4" />

    <el-table :data="products" border style="width: 100%">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="stock" label="库存">
        <template #default="scope">
          <span :style="{ color: scope.row.stock < scope.row.warn_stock ? 'red' : 'inherit' }">
            {{ scope.row.stock }} <span v-if="scope.row.stock < scope.row.warn_stock ">(库存不足)</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="warn_stock" label="预警数量" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts1 } from '@/api/product'

const products = ref([])

const fetchData = async () => {
  try {
    const data = await fetchProducts1();
    console.log("API Response:", data);

    // 排序：先按是否库存不足，再按库存数量升序
    data.sort((a, b) => {
      const aIsLow = a.stock < a.warn_stock;
      const bIsLow = b.stock < b.warn_stock;

      if (aIsLow !== bIsLow) {
        return aIsLow ? -1 : 1;
      }

      return a.stock - b.stock;
    });

    products.value = [...data];
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};


onMounted(fetchData)
</script>
