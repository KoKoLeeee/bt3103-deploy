import { Bar } from 'vue-chartjs';
import database from '../../firebase.js';

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Pork Fried Rice", "Mapo Tofu", "Sambal Kangkung", "Cereal Prawn", "Dry Beef Hor Fun", "Prawn omelette"],
            datasets: [{
                label: "Amount of each Dish",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [0, 0, 0, 0, 0, 0]
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero: true,
                        precision: 0
                    }
                 }],
                 
            }
        },
        
        
    }
  },

  methods: {
    fetchItems: function() {
        database.collection('orders').get().then(querySnapShot => {
            querySnapShot.forEach(doc => {
                const data = doc.data()
                this.datacollection.datasets[0].data[0] += data.pork
                this.datacollection.datasets[0].data[1] += data.tofu
                this.datacollection.datasets[0].data[2] += data.kangkung
                this.datacollection.datasets[0].data[3] += data.cereal
                this.datacollection.datasets[0].data[4] += data.horfun
                this.datacollection.datasets[0].data[5] += data.prawn

                this.renderChart(this.datacollection, this.options)
            })
        })
    }
  },

  created() {
    this.fetchItems()
  },

  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}