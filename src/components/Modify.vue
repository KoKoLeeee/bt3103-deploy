<template>
  <div>
      <ul>
          <li v-for="(item, key, index) in datapacket" v-bind:key="key">
              {{key}}: {{item}}
              <br><br>
              <input v-bind:id="index" placeholder="0" type="number" min="0" v-model="copy[key]">
        </li>
      </ul>

      <button v-on:click="updateOrder()">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      datapacket: {
          'Prawn omelette': 0,
          'Dry Beef Hor Fun': 0,
          'Sambal KangKung': 0,
          'Pork Fried Rice': 0,
          'Mapo Tofu': 0,
          'Cereal Prawn': 0
      },

      copy: {
          'Prawn omelette': 0,
          'Dry Beef Hor Fun': 0,
          'Sambal KangKung': 0,
          'Pork Fried Rice': 0,
          'Mapo Tofu': 0,
          'Cereal Prawn': 0
      }
    };
  },

  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .doc(this.$route.params.doc_id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          this.datapacket['Prawn omelette'] = data.prawn;
          this.datapacket['Dry Beef Hor Fun'] = data.horfun;
          this.datapacket['Sambal KangKung'] = data.kangkung;
          this.datapacket['Pork Fried Rice'] = data.pork;
          this.datapacket['Mapo Tofu'] = data.tofu;
          this.datapacket['Cereal Prawn'] = data.cereal; 
        });
    },

    updateOrder: function() {
        const duplicate = this.copy;
        database.collection('orders').doc(this.$route.params.doc_id).update({
            prawn: Number(duplicate['Prawn omelette']),
            horfun: Number(duplicate[ 'Dry Beef Hor Fun']),
            kangkung: Number(duplicate['Sambal KangKung']),
            pork: Number(duplicate['Pork Fried Rice']),
            tofu: Number(duplicate[ 'Mapo Tofu']),
            cereal: Number(duplicate['Cereal Prawn'])
        }).then(() => this.$router.push({ path:'/orders'}))

    }
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px 0px;
  margin: 10px;
  font-size: 15px;
}

button {
    border-radius: 5px;
    height: 40px;
    width: 200px;
    background-color: lightpink;
    font-size: 20px;
}
</style>