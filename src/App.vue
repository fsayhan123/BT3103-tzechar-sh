<template>
  <div>
    <h1>Say Han's Zi Char</h1>
    <ul>
      <li> <router-link to = "/" exact>Home</router-link> </li>
      <li> <router-link to = "/orders" exact>Orders</router-link> </li>
      <li> <router-link to = "/dashboard" exact> Dashboard </router-link></li>
    </ul>
    <router-view></router-view>

  </div>

</template> 

<script>

export default { 
  data () {
    return {
      
    }
  },
}
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



</style>
