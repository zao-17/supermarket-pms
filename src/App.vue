
<template>
  <div>
    <nav>
      <router-link to="/">商品管理</router-link>
      <router-link to="/stock">库存管理</router-link>
      <router-link to="/user">用户管理</router-link>
      <router-link to="/sales-statistics">销售统计</router-link>
    </nav>
      <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style>

nav {
  padding: 10px;
  background-color: #976767;
}
nav a {
  margin-right: 15px;
  text-decoration: none;
  color: black;
}
</style>
