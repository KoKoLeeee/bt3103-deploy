<template>
    <div>
        <h2>Menu:</h2>
        <ul>
            <li v-for="item in itemsSelected" v-bind:key="item.name">
                <h3>{{item[0]}} x {{item[1]}}</h3>
            </li>
        </ul>
        <button v-on:click="findTotal(); showprice=true" >Calculate Total</button>
        <p v-show="showprice">Subtotal: ${{subtotal}}</p>
        <p v-show="showprice">Grand Total: ${{grandtotal}}</p>
        <button v-show="showprice" v-on:click="sendOrder()">Add Order</button>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {

    data() {
        return {
            subtotal: 0,
            grandtotal: 0,
            showprice: false,
        }
    },

    props: {
        itemsSelected: {
            type: Array,
        }
        
    },
    
    methods: {
        findTotal: function() {
            var calc = 0;
            for (var i = 0; i < this.itemsSelected.length; i++){
                const curr_item = this.itemsSelected[i];
                const item_price = curr_item[2];
                const item_qty = curr_item[1];

                calc += item_price * item_qty;
            }

            this.subtotal = calc;
        },

        sendOrder: function() {
            var prawn = 0;
            var horfun = 0;
            var kangkung = 0;
            var pork = 0;
            var tofu = 0;
            var cereal = 0;

            this.itemsSelected.forEach(item => {
                const name = item[0];
                const qty = item[1];
                if (name == 'Prawn omelette') {
                    prawn = qty;
                } else if (name == 'Dry Beef Hor Fun') {
                    horfun = qty;
                } else if (name == 'Sambal KangKung') {
                    kangkung = qty;
                } else if (name == 'Pork Fried Rice') {
                    pork = qty;
                } else if (name == 'Mapo Tofu') {
                    tofu = qty;
                } else if (name == 'Cereal Prawn') {
                    cereal = qty;
                }
            });

            database.collection('orders').add({
                    prawn: prawn,
                    horfun: horfun,
                    kangkung: kangkung,
                    pork: pork,
                    tofu: tofu,
                    cereal: cereal
                }).then(() => location.reload())
        }
    },

    watch: {
        subtotal: function() {
            this.grandtotal = (this.subtotal * 1.07).toFixed(2);
        }
    }
    
}
</script>

<style scoped>
h2 {
    font-size: 30px;
}

h3 {
    font-size:25px;
    font-weight: normal;
}

button {
    border-radius: 15px;
    height: 45px;
    width: 280px;
    background-color: lightpink;
    font-size: 20px;
}

p {
    font-weight: bold;
    font-size: 25px;
}
</style>