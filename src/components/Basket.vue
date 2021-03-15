<template>
    <div>
        <p>Menu </p>
        <ul>
            <li v-for = "item in itemsSelected" :key = "item.itemName"> 
                {{item[0]}} x {{item[1]}}
            </li>
        </ul>
        <button v-on:click = "calculateTotal(); sendOrder();">Calculate Total</button>
        <p v-show = "disp"> Subtotal: ${{subtotal.toFixed(2)}}</p>
        <p v-show = "disp">Grand Total: ${{(subtotal * 1.07).toFixed(2)}} </p>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    name : "Basket",
    data () {
        return {
            subtotal : 0,
            disp : false,
            food : [],
        }
    },
    props : {
        itemsSelected : {
            type : Array,
        }
    },
    methods : {
        calculateTotal:function() {
            this.subtotal = 0;
            console.log(this.itemsSelected);
            for (let i in this.itemsSelected) {
                this.subtotal += this.itemsSelected[i][1] * this.itemsSelected[i][2];
            }
            if (this.disp == false) {
                this.disp = true;
            } else {
                this.disp = false;
            }
        }, 
        sendOrder: function() {
            var order = {};
            for (let i = 0; i < this.itemsSelected.length; i++) {
                const foodItem = this.itemsSelected[i];
                order[foodItem[0]] = foodItem[1];
            }
            //no hard code
            console.log(this.food);
            for (var i = 0; i < this.food.length; i++) {
                for (var j = 0; j < this.food.length; j++) {
                    if (!(this.food[i] in order)) {
                        order[this.food[i]] = 0;
                    }
                }
            }
            

            console.log(order);
            database.collection('orders').add(order).then(() => location.reload());
        }
    },
    created:function() {
        database.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.food.push(doc.data().name);
                });
        })
    }
}
</script>

<style scoped>
div {
    width : 100%;
    max-width: 30%;
    float : right;
}

p {
    font-size:30px;
}

li {
    height:50px;
    font-size: 20px;
}
</style>