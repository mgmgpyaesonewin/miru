<script>
import { Line } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

export default {
  components: {
    hexToRgba,
    CustomTooltips
  },
  extends: Line,
  mounted () {
    this.renderChart(
      {
        labels: ['1st Frame', '2nd Frame', '3rd Frame', '4th Frame', '5th Frame', '6th Frame', '7th Frame','8th Frame','9th Frame','10th Frame','11th Frame', '12th Frame', '13th Frame', '14th Frame', '15th Frame', '16th Frame', '17th Frame','18th Frame','19th Frame','20th Frame'],
        datasets: [
          {
            label: 'nudity',
            backgroundColor: hexToRgba('#E46651', 90),
            data: [0.06, 0.053, 0.067, 0.335, 0.049, 0.043, 0.013, 0.049, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.026, 0.013, 0.012, 0.013]
          },
          {
            label: 'weapon',
            backgroundColor: hexToRgba('#00D8FF', 90),
            data: [0.004, 0.004, 0.006, 0.002, 0.003, 0.001, 0.002, 0.002, 0.002, 0.002, 0, 0.002, 0.001, 0.001, 0.001, 0.001, 0.001, 0.11, 0.342, 0.158, 0.112]
          },
          {
            label: 'Alcohol',
            backgroundColor: hexToRgba('#00D888', 90),
            data: [0.001, 0.001, 0.001, 0.001, 0, 0, 0.001, 0.001, 0.001, 0.001, 0, 0.001, 0.877, 0.794, 0.76, 0.476, 0.362, 0.001, 0, 0.001, 0.001]
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].backgroundColor }
            }
          }
        }
      }
    )
  }
}
</script>
