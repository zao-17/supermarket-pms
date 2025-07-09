<template>
  <div ref="chart" style="width: 600px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { fetchSalesRank } from '@/api/product';

export default {
  async mounted() {
    // 1. 获取数据
    const salesData = await fetchSalesRank();

    // 2. 提取图表需要的数组
    const names = salesData.map(item => item.name);
    const values = salesData.map(item => item.salesVolume);

    // 3. 初始化图表
    const chart = echarts.init(this.$refs.chart);
    chart.setOption({
      title: { text: '商品销量TOP10' },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: names,
        axisLabel: { rotate: 30 } // 商品名过长时旋转
      },
      yAxis: { type: 'value' },
      series: [{
        name: '销量',
        type: 'bar',
        data: values,
        itemStyle: { color: '#5470c6' } // 自定义柱状颜色
      }]
    });

    // 4. 窗口缩放时自适应
    window.addEventListener('resize', () => chart.resize());
  }
};
</script>