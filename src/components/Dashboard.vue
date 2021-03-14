<template>
<div>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>

    <h1>
        BAR CHART
    </h1>
    <barchart></barchart>

    <h1>
        Line Chart
    </h1>
    <linechart></linechart>
</div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import LineChart from './charts/LineChart.vue'

export default {
  name: 'app',
  components: {
    barchart: BarChart,
    linechart: LineChart,
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

h1 {
    text-align: center;
    background-color: lightskyblue;
    padding: 20px 0px;
}
</style>