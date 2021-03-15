<template>
    <div>
        <BarChart></BarChart>
        <LineChart></LineChart>
    </div>
</template>

<script>
import BarChart from "./charts/BarChart.vue"
import LineChart from "./charts/LineChart.js"

export default {
    components : {
        BarChart,
        LineChart,
    },
}
</script>

<style scoped>

</style>