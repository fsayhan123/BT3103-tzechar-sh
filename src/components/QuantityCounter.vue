<template>
    <div>
        <button v-on:click = "increase"> + </button>
        {{counter}}
        <button v-on:click = "decrease"> - </button>
    </div>
</template>

<script>
export default {
    name : "QuantityCounter",
    data () {
        return {
            counter: 0,
        }
    },
    props : {
        item : {
            type : Object,
        }
    },
    methods: {
        increase: function() {
            if (this.counter < 10) {
                this.counter++;
                this.$emit('counter', this.item, this.counter);
            } else {
                alert("You cannot buy more than 10 items.");
            }
        },
        decrease: function() {
            if (this.counter > 0) {
                this.counter--;
                this.$emit('counter', this.item, this.counter);
            }
        },
    },
}
</script>

<style scoped>
    button {
        height:30px;
        width:30px;
        margin:5px;
    }

</style>