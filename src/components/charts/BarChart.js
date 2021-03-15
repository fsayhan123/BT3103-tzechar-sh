import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Total Number for each Dish",
                backgroundColor: [],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number for each Dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },

  methods: {
    fetchItems : function() {
        database.collection('menu').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data().col);
                this.datacollection.datasets[0].backgroundColor.push(doc.data().col);
            })
        });
        database.collection('orders').get().then(snapshot => {
            const temp = {};
            snapshot.docs.forEach(doc => {
                var order = doc.data();
                for (const key in order) {
                    if (key in temp) {
                        temp[key] += order[key];
                    } else {
                        temp[key] = order[key];
                    }
                }
            });
            const foodItems = [];
            for (const key in temp) {
                foodItems.push(key);
            }
            foodItems.sort();
            for (const i in foodItems) {
                this.datacollection.datasets[0].data.push(temp[foodItems[i]]);
                this.datacollection.labels.push(foodItems[i]);
            }
            this.renderChart(this.datacollection, this.options);
        });
    }
  },

  created() {
      this.fetchItems();
      
  },
}
