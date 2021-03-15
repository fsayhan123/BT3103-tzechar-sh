<template>
    <div>
        <ul id = "boxList">
            <li id = "indivOrder" v-for = "item in orders" :key = "item.index"> 
                <ul> 
                    <li v-for = "(value, key) in item[1]" :key = value.index>
                        {{key}} : {{value}}
                    </li>
                </ul>
                <button v-bind:id = "item[0]" v-on:click = "deleteItem($event)"> Delete </button>
                <button v-bind:id = "item[0]" v-on:click = "route($event)"> Modify </button>
            </li>
        </ul>
    </div>
</template>


<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            orders : [],
        }
    }, 
    methods: {
        fetchItems : function() {
            database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.orders.push([doc.id, doc.data()]);
                });
            })
        },
        deleteItem: function(event) {
            const doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(() => location.reload());
        },
        route: function(event) {
            const item_id = event.target.getAttribute("id");
            this.$router.push({name: 'Modify',  params: { docId: item_id }})
        },
    },
    created:function() {
        this.fetchItems();
    }
}
</script>


<style scoped>
#boxList {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}


#indivOrder {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: left;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

#indivOrder > ul {
    float:left;
    list-style-type: none;
    width: 70%;
    
}

button {
  float:right;
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>