import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                label:"",
                borderColor : "#3e95cd",
                fill: false
            },
            { 
                data: [],
                label:"",
                borderColor : "#8e5ea2",
                fill: false
            },
            { 
                data: [],
                label:"",
                borderColor : "#3cba9f",
                fill: false
            },
            { 
                data: [],
                label:"",
                borderColor : "#e8c3b9",
                fill: false
            },
            { 
                data: [],
                label:"",
                borderColor : "#c45850",
                fill: false
            },
            { 
                data: [],
                label:"",
                borderColor : "#FF4500",
                fill: false
            },]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: "PSI Twenty Four Hourly (By Region)"
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var timestamps = response.data.items;
            for (let i in timestamps) {
                var details = timestamps[i];
                this.datacollection.labels.push(details['timestamp']);
                var j = 0;
                for (const key in details["readings"]["psi_twenty_four_hourly"]) {
                    this.datacollection.datasets[j].data.push(details["readings"]["psi_twenty_four_hourly"][key])
                    this.datacollection.datasets[j].label = key;
                    j++;
                    if (j > 5) {
                        j = 0;
                    }
                }
            }
            console.log(this.datacollection.labels);
            this.renderChart(this.datacollection, this.options);
        })
    }
  },
  created () {
    this.fetchItems()
  }
}