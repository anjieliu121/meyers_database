import {
    Chart as ChartJS,  
    LinearScale,
    CategoryScale,
    TimeScale,
    TimeSeriesScale,
    PointElement,
    LineElement,
    Colors,
    Legend,
    Tooltip,
    Title
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

import { useRef } from 'react';

import 'chartjs-adapter-date-fns';

ChartJS.register(
    LinearScale,
    CategoryScale,
    TimeScale,
    TimeSeriesScale,
    PointElement,
    LineElement,
    Colors,
    Legend,
    Tooltip,
    Title
);

const chartData = {
    datasets: [
        {
            label: "Normal",
            data: [{
                x: '2021-11-06 23:39:30',
                y: 50
            }, {
                x: '2022-01-07 01:00:28',
                y: 60
            }, {
                x: '2022-11-07 09:00:28',
                y: 20
            }]
        },
        {
            label: "Wugga Wugga",
            data: [{
                x: '2021-11-06 23:39:30',
                y: 100
            }, {
                x: '2022-01-07 01:00:28',
                y: 20
            }, {
                x: '2022-11-07 09:00:28',
                y: 50
            }]
        },
    ],
};

const chartOptions = {
    addInfoPromptnimation: false,
    plugins: {
        legend: {
        display: false
        },
        tooltip: {
        enabled: false
        }
    },
    scales: {
        x: {
            type: 'time',
              min: '2021-11-07 00:00:00',
            time: {
                unit: 'month',
                displayFormats: {
                    month: 'MMM yyyy'
                }
            }
        },
        y: {
            max: 120,
        }
    },
};
  
const TimeSeries = () => {
    const chartRef = useRef(null);

    return (
        <Chart ref={chartRef} type='line' options={chartOptions} data={chartData}/>
    );
};

export default TimeSeries;