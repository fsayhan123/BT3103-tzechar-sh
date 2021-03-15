<template>
  <div>
      <h1>Bar Chart</h1>
      <Chart></Chart>
  </div>
</template>

<script>
import Chart from './BarChart.js'

export default {
    components : {
        Chart,
    },
};
</script>

<style scoped>
h1 {
  background-color:cornflowerblue;
  font-family: Arial, Helvetica, sans-serif;
  height:150px;
  display:flex;
  width:100;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
