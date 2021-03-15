<template>
    <div>
        <ul>
            <li v-for = "(value, key) in datapacket[0]" :key = value.index>
                {{key}} : {{value}} <br> 
                <input  placeholder = "0" min = 0 type="number" v-model = "updatedData[key]" /> 
                <br>
            </li>
        </ul>
        <button v-on:click = "updateOrder">Update Order </button>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            datapacket : [],
            updatedData : {},
            food : [],
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.$route.params.docId).get().then(doc => this.datapacket.push(doc.data()));
            database.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.food.push(doc.data().name);
                });
            })
        },
        updateOrder:function() {
            console.log(this.updatedData);
            if (Object.keys(this.updatedData).length == 0) {
                database.collection('orders').doc(this.$route.params.docId).delete();
            } else {
                console.log(this.food);
                for (var i = 0; i < this.food.length; i++) {
                    for (var j = 0; j < this.food.length; j++) {
                        if (!(this.food[i] in this.updatedData)) {
                            this.updatedData[this.food[i]] = 0;
                        }
                    }
                }
                database.collection('orders').doc(this.$route.params.docId).set(this.updatedData);
            }
            this.$router.push({path: '/orders'})
        },
    },
    created:function() {
        this.fetchItems();
    }
}
</script>

<style scoped>
ul {
    padding:0px;
    margin-bottom:20px;
    list-style-type: none;
}

li {
    padding:10px;
}

button {

  width: 100px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>