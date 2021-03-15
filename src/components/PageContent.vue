<template>
    <div>
        <ul id = "itemsList">
            <li v-for = "item in itemList" :key = "item.id">  
                <p id = "itemName">{{item.name}}</p>
                <img :src = "item.imageURL"/>
                <p id = "price"> ${{item.price}}</p>
                <QuantityCounter v-bind:item = "item" v-on:counter = "onCounter"></QuantityCounter>
            </li>
        </ul>
        <Basket v-bind:itemsSelected = "itemsSelected"/>
    </div>
</template>

<script>
import Basket from './Basket.vue'
import database from '../firebase.js'


export default {
    components : {
        Basket,
    },
    data()  {
        return {
            itemsSelected : [],
            itemList : [],
        }
    },
    methods : {
        onCounter: function(item, count) {
            console.log(item.name, count);
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                var flag = false;
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name === item.name && count > 0) {
                        this.itemsSelected.splice(i,1,);
                        this.itemsSelected.splice(i,0, [item.name, count, item.price]);
                        flag = true;
                        break;
                    }
                // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    else if (item_name === item.name && count == 0) {
                        this.itemsSelected.splice(i, 1);
                        flag = true;
                        break;
                    }
                }

                if (!flag) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
                // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                
                
            }
            console.log(this.itemsSelected);
        }, 
        fetchItems : function() {
            database.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.itemList.push(doc.data());
                });
            })
        }
    },
    created:function() {
        this.fetchItems();
    }
}




</script>

<style scoped>
    #itemsList {
    width: 70%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
    float:left;
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

    img {
    width: 135px;
    height: 135px;
    }

    #price {
    font-size: 30px;
    }

    #itemName {
    font-size: 30px;
    }

    #shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
    }
</style>