import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
	scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        borderWidth: 0
      }
    },
    y: {
      min: 0,
      ticks: {
        font: { family: 'Inter' },
        padding: 15,
      },
      grid: {
        display: false,
        borderWidth: 0
      }
    }
  },
  layout: {
  },
  elements: {
    bar: {
			borderRadius: 10,
      borderSkipped: 'false',
      pointStyle: 'circle'
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      padding: 10,
      displayColors: false,
      titleFont: { family: 'Inter' },
      bodyFont: { family: 'Inter' },
    }
  },
};

export default function BarChart(props) {
  const { data } = props
  return (<Bar options={options} data={data} />);
}
