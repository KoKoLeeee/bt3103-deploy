<template>
  <div>
    <ul>
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/orders" exact>Orders</router-link></li>
      <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>

    <ul>
      <li v-for="order in orders" v-bind:key="order[0]">
        <p v-for="item in order[1]" v-bind:key="item[0]">
          {{ item[0] }}: {{ item[1] }}
        </p>
        <button v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button>
        <button v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      orders: [],
    };
  },

  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            this.orders.push([
              doc.id,
              [
                ["Prawn omelette", data.prawn],
                ["Dry Beef Hor Fun", data.horfun],
                ["Sambal Kang Kung", data.kangkung],
                ["Pork Fried Rice", data.pork],
                ["Mapo Tofu", data.tofu],
                ["Cereal Prawn", data.cereal],
              ],
            ]);
          });
        });
    },

    deleteItem: function (event) {
      let doc_id = event.target.getAttribute("id");
      database
        .collection("orders")
        .doc(doc_id)
        .delete()
        .then(() => location.reload());
    },

    route: function (event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: "modify", params: { doc_id: doc_id } });
    },
  },

  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
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

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  flex-wrap: wrap;
}

p {
  margin: 0px;
  width: 60%;
  float: left;
}
</style>