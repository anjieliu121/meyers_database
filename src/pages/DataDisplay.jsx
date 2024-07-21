import { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { columns } from "../constants/columns"
import DataTable from "../components/DataTable"
import { parse } from 'csv-parse';
import {
  Chart as ChartJS,  
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Colors,
  Legend,
  Tooltip,
  Title
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Colors,
  Legend,
  Tooltip,
  Title
);

const yearData = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];
const data = {
  labels: yearData.map(row => row.year),
  datasets: [
    {
      label: 'Acquisitions by year',
      data: yearData.map(row => row.count)
    }
  ]
};
const options = {
  animation: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    }
  }
};

const NO_DATA = {};
/**
 * A page to display data
 *
 * @component
 * @param {Object} dataBlob {name:"", content:""} Contains the string representation of CSV data
 * @param {Object} pageInfo Provides the context & link to older website for each dataset
 * @returns {JSX.Element} The rendered DataDisplay component
 *
 */
const DataDisplay = ({dataBlob, pageInfo}) => {
  const title = pageInfo.title;
  const description = pageInfo.description;
  const source = pageInfo.source;
  const streamlitLink = pageInfo.streamlitLink;

  const [jsonData, setJsonData] = useState(NO_DATA);
  const [chartData, setChartData] = useState(NO_DATA);
  const [chartOptions, setChartOptions] = useState(NO_DATA);

  const chartRef = useRef(null);
  const records = [];
  const parser = parse({delimiter: ','});
  console.log("Starting parsing process");

  useEffect(() => {
    parser.on('readable', function() {
      console.log("I'm reading after rendering");
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }    

      if(records.length === 0) {
        //console.log("Nothing has been parsed!");
        return;
      }

      const headers = records[0];
      //Change spec.hum to spec_hum
      headers[3] = "spec_hum";
      console.log(headers);
      const indices = [...Array(headers.length).keys()];
      //console.log(indices);
      const callbacks = [String, parseInt, parseFloat, parseFloat,
        parseFloat, parseFloat, parseFloat, parseFloat];
      let AKrecords = records.splice(1, 20);
      let AKdata = [];
      AKrecords.forEach(entry => {
        let temp = {};
        indices.forEach(index => temp[headers[index]] = callbacks[index](entry[index]));
        AKdata.push(temp);
      });
      console.log(AKdata);

      //const chart = chartRef.current;
      //console.log("Referenced chart: " + chart);

      const newChartOptions = {
        animation: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          },
          title: {
            display: true,
            text: "Alaska Temperature Days 1-20",
            font: {
              size: 24,
              style: 'normal',
              family: 'Times'
            },
            padding: {
              top: 20, 
              bottom: 20
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Day',
              color: '#666',
              font: {
                family: 'Times',
                size: 20,
                weight: 'normal',
                lineHeight: 1.2,
              },
              padding: {top: 20, left: 0, right: 0, bottom: 20}
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Temperature',
              color: '#666',
              font: {
                family: 'Times',
                size: 20,
                style: 'normal',
                lineHeight: 1.2
              },
              padding: {top: 30, left: 0, right: 0, bottom: 30}
            }
          }
        }
      };

      const newChartData = {
        labels: AKdata.map(row => row.day),
        datasets: [
          {
            data: AKdata.map(row => row.temp)
          }
        ]
      };
      
      setJsonData(AKdata);
      setChartData(newChartData);
      setChartOptions(newChartOptions);
      console.log(AKdata);
      console.log(newChartData);
      //No animation when updating
      //chart.update('none');
      //console.log("Updated Chart");
      //console.log(records);
    });

    parser.on('error', function(err){
      console.error(err.message);
    });

    if (dataBlob !== null) {
      console.log("Processing data blob");
      console.log(dataBlob);
      //console.log(dataBlob.content.data);
      parser.write(dataBlob.content.data);
    } else {
      setJsonData(NO_DATA);
      setChartData(NO_DATA);
      setChartOptions(NO_DATA);
    }
    parser.end();
  }, [dataBlob]); //Change in dataBlob should mean a new dataset

  console.log("End of first time");

  const temp = [{state: "AK", day: 1, temp: 3,}];
  //TODO: Figure out how to make Chart invisible at first and only appear after data is loaded
  return (
    <div className="tw-grid tw-justify-items-center">
      <div className="tw-max-w-sm tw-p-6 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow dark:tw-bg-gray-800 dark:tw-border-gray-700">
        <a href="#">
          <h5 className="tw-mb-2 tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900">
            {title}
          </h5>
        </a>
        <p className="tw-mb-3 tw-font-normal tw-text-gray-700 dark:tw-text-gray-400">
          {description}
        </p>
        <a
          href={source}
          className="tw-inline-flex tw-items-center tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-blue-700 tw-rounded-lg hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
        >
          Read more
          <svg
            className="rtl:tw-rotate-180 tw-w-3.5 tw-h-3.5 tw-ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        {streamlitLink === undefined ? "Not available in streamlit :(" : 
          <a
            href={streamlitLink}
            className="tw-inline-flex tw-items-center tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-blue-700 tw-rounded-lg hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
          >
            Streamlit Version
            <svg
              className="rtl:tw-rotate-180 tw-w-3.5 tw-h-3.5 tw-ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        }
      </div>
      
      
      {Object.keys(jsonData).length === 0 ? "Loading table ..." :
        <div className="tw-container tw-mx-auto tw-py-10">
          <DataTable columns={columns.test} data={jsonData} />
        </div>
      }
      
      {Object.keys(chartData).length === 0 ? "Loading charts ..." : 
        <Chart ref={chartRef} type='line' options={chartOptions} data={chartData}/>
      }
    </div>
  );
};

export default DataDisplay;
