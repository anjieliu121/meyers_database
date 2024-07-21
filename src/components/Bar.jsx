import {
    Chart as ChartJS,  
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Colors,
    Legend,
    Tooltip,
    Title
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

import { useRef } from 'react';

import 'chartjs-adapter-date-fns';

import { getUnixTime } from 'date-fns';

ChartJS.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Colors,
    Legend,
    Tooltip,
    Title
);

/*const chartData = {
    labels: ['Now', 'Then', 'Never'],
    datasets: [
        {
            //label: "Normal",
            data: [{
                x: 'Now',
                y: 50
            }, {
                x: 'Then',
                y: 60
            }, {
                x: 'Never',
                y: 20
            }]
        },
        {
            //label: "Wugga Wugga",
            data: [{
                x: 'Now',
                y: 100
            }, {
                x: 'Then',
                y: 20
            }, {
                x: 'Never',
                y: 50
            }]
        },
    ],
};*/
const getUnixTimeInMillis = (date) => {
    return getUnixTime(date) * 1000;
}

const chartData = {
    datasets: [
        {
            label: "Normal",
            data: [{
                x: getUnixTimeInMillis('2021-11-06 23:39:30'),
                y: 50
            }, {
                x: getUnixTimeInMillis('2022-01-07 01:00:28'),
                y: 60
            }, {
                x: getUnixTimeInMillis('2022-11-07 09:00:28'),
                y: 20
            }]
        },
        {
            label: "Wugga Wugga",
            data: [{
                x: getUnixTimeInMillis('2021-11-06 23:39:30'),
                y: 100
            }, {
                x: getUnixTimeInMillis('2022-01-07 01:00:28'),
                y: 20
            }, {
                x: getUnixTimeInMillis('2022-11-07 09:00:28'),
                y: 50
            }]
        },
    ],
};

const chartOptions = {
    //parsing: false,
    normalized: true,
    animation: false,
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
            stacked: true,
        },
        y: {
            type: 'linear',
            min: 0,
            max: 120,
            stacked: true,
        }
    },
};
  
const Bar = () => {
    const chartRef = useRef(null);

    return (
        <Chart ref={chartRef} type='bar' options={chartOptions} data={chartData}/>
    );
};

export default Bar;