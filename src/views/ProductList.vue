
<template>
  <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
    <el-input
        v-model="searchKeyword"
        placeholder="请输入商品名称"
        clearable
        @input="handleSearch"
        style="width: 300px;"
    />

  </div>
  <div style="padding: 20px;">
    <el-page-header content="商品管理" class="mb-4" />

    <el-button type="primary" @click="openCreateForm" class="mb-3">添加新商品</el-button>

    <el-table :data="paginatedProducts" border style="width: 100%"> //修改数据源
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="description" label="公司" />
      <el-table-column prop="price" label="价格" />
<!--      <el-table-column prop="sales_volume" label="销量" />-->
<!--      <el-table-column prop="turnover" label="营业额" />-->
<!--      <el-table-column prop="cost_price" label="成本价格" />-->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="editProduct(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDeleteProduct(scope.row.id)">删除</el-button>
          <el-button size="small" type="success" @click="openSellProduct(scope.row)">售出</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单 -->
    <el-dialog v-model="isModalVisible" :title="modalTitle" width="400px" center>
      <el-form :model="productForm" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="productForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="productForm.description" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="productForm.price" :min="0" :step="0.1" controls-position="right" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="productForm.stock" :min="0" :step="1" controls-position="right" />
        </el-form-item>
        <el-form-item label="预警数量">
          <el-input-number v-model="productForm.warn_stock" :min="0" />
        </el-form-item>

        <!-- 新增售出数量 -->
        <el-form-item label="售出数量">
          <el-input-number v-model="sellAmount" :min="1" controls-position="right" />
        </el-form-item>
<!--        新增成本-->
        <el-form-item label="成本价格">
          <el-input-number v-model="productForm.cost_price" :min="0" :step="1" controls-position="right" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="closeModal">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
<!--        <el-button type="success" @click="sellProduct">售出</el-button>-->
      </template>
    </el-dialog>

    <!-- 新的售出对话框 -->
    <el-dialog v-model="isSellModalVisible" :title="sellModalTitle" width="300px" center>
      <el-form :model="sellForm" label-width="80px">
        <el-form-item label="售出数量">
          <el-input-number v-model="sellAmount" :min="1" :step="1" controls-position="right" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="closeSellModal">取消</el-button>
        <el-button type="success" @click="sellProduct">售出</el-button>
      </template>
    </el-dialog>
</div>


  <!-- 图表容器 -->
  <div id="sales-chart" style="width: 100%; height: 400px; margin-top: 30px;"></div>


    <!-- 分页控件 -->
  <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="filteredProducts.length"
      @current-change="handlePageChange"
      style="margin-top: 16px; text-align: right;"
  />

</template>
<script setup>
import * as echarts from 'echarts';

const renderSalesChart = () => {
  // 排序前 N 名销量排行
  const sorted = [...products.value]
      .sort((a, b) => b.sales_volume - a.sales_volume)
      .slice(0, 10); // 取前 10 名

  const chartDom = document.getElementById('sales-chart');
  if (!chartDom) return;

  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: '商品销量排行榜',
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: sorted.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      name: '销量'
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: sorted.map(item => item.sales_volume),
        itemStyle: {
          color: '#409EFF'
        }
      }
    ]
  };
  myChart.setOption(option);
};


import { ref, onMounted,  nextTick  ,computed } from "vue";

import { fetchProducts1, createProduct, updateProduct, deleteProduct,sellProductAPI} from "@/api/product"; // 假设你有sellProductAPI

// 分页和搜索相关状态
const searchKeyword = ref("");       // 搜索关键词
const currentPage = ref(1);         // 当前页
const pageSize = ref(10);            // 每页条数

// 搜索过滤后的商品列表
const filteredProducts = computed(() =>
    products.value.filter(item =>
        item.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
);

// 当前页要显示的商品数据
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredProducts.value.slice(start, start + pageSize.value);
});

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1; // 搜索时重置为第一页
};

// 页码变更处理
const handlePageChange = (page) => {
  currentPage.value = page;
};


const products = ref([]);
const isModalVisible = ref(false);
const modalTitle = ref("");
const productForm = ref({
  id: null,
  name: "",
  description: "",
  price: 0,
  stock: 0,
  sales_volume: 0,
  turnover: 0,
  cost_price: 0,
  warn_stock: 0
});

const isSellModalVisible = ref(false);
const sellModalTitle = ref("售出商品");
const sellAmount = ref(1); // 默认售出1个
const sellForm = ref({
  amount: 1
});

// const fetchData = async () => {
//   try {
//     const data = await fetchProducts1(); // 获取商品数据
//     products.value = [...data];  // 确保 Vue 响应式更新
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// };

const fetchData = async () => {
  try {
    const data = await fetchProducts1();
    products.value = [...data];
    await nextTick();  // 等待 DOM 更新后再渲染图表
    renderSalesChart();  // 渲染图表
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


const openCreateForm = () => {
  modalTitle.value = "增加商品";
  productForm.value = { id: null, name: "", description: "", price: 0, stock: 0 };
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const saveProduct = async () => {
  try {
    if (productForm.value.price < 0) {
      alert("价格不能为负数！");
      return;
    }

    if (productForm.value.id) {
      await updateProduct(productForm.value.id, productForm.value);
    } else {
      await createProduct(productForm.value);
    }
    await fetchData(); // 更新商品列表
    closeModal();
  } catch (error) {
    console.error("Error saving product:", error);
    alert("保存失败，请检查数据！");
  }
};

// 编辑商品
const editProduct = (product) => {
  modalTitle.value = "编辑商品";
  productForm.value = { ...product };

  isModalVisible.value = true;
  console.log('dddddddddd'); // 打印更新后的商品数据
  console.log("提交的数据：", productForm.value);


};

// 删除商品
const handleDeleteProduct = async (id) => {
  try {
    const confirmResult = window.confirm('确定要删除该商品吗？');
    if (confirmResult){
      await deleteProduct(id);
      await fetchData(); // 更新商品列表
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("删除失败，请稍后重试！");
  }
};

// 售出商品
const openSellProduct = (product) => {
  sellModalTitle.value = "售出商品";
  productForm.value = { ...product };
  sellAmount.value = 1; // 默认售出1个
  isSellModalVisible.value = true;
};


const sellProduct = async () => {
  if (sellAmount.value <= 0 || sellAmount.value > productForm.value.stock) {
    alert("库存不足或输入数量不合法！");
    return;
  }
  try {
    const response = await sellProductAPI(productForm.value, sellAmount.value);
    console.log('API Response:', response);

    await fetchData();
    await nextTick();
    renderSalesChart(); // 添加

    closeModal();
    alert(`售出${sellAmount.value}个商品成功！`);
  } catch (error) {
    console.error("Error selling product:", error);
    alert("售出失败，请稍后重试！");
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

