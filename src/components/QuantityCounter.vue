<template>
    <div>
        <button v-on:click="decrement()">-</button>
        <span>{{counter}}</span>
        <button v-on:click="increment()">+</button>
    </div>
    
</template>


<script>
export default {
    data() {
        return {
            counter: 0,
        }
    },

    props: {
        item: {
            type: Object,
        }
    },

    methods: {
        increment: function() {
            if (this.counter == 10) {
                alert("You cannot buy more than 10 times.")
            } else {
                this.counter++
            }
            this.$emit('counter', this.item, this.counter)
        },

        decrement: function() {
            if (this.counter > 0) {
                this.counter--
            }
            this.$emit('counter', this.item, this.counter)
        }
    }
}
</script>

<style scoped>
button {
    background-color: pink;
    width: 50px;
    height: 50px;
    font-size: 30px;
    font-weight: bold;
    border-radius: 10px;
}

span {
    margin: 50% 3%;
    font-size: 40px;
}
</style>