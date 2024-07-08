import { useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
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

const DataDisplay = ({dataBlob, pageInfo}) => {
  const title = pageInfo.title;
  const description = pageInfo.description;
  const source = pageInfo.source;
  const streamlitLink = pageInfo.streamlitLink;

  const chartRef = useRef(null);
  const records = [];
  const parser = parse({delimiter: ','});
  console.log("Starting parsing process");

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
      //console.log(headers);
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

      const chart = chartRef.current;
      console.log("Referenced chart: " + chart);

      chart.options = {
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

      chart.data = {
        labels: AKdata.map(row => row.day),
        datasets: [
          {
            data: AKdata.map(row => row.temp)
          }
        ]
      };
      
      //No animation when updating
      chart.update('none');
      console.log("Updated Chart");
      //console.log(records);
    });

    parser.on('error', function(err){
      console.error(err.message);
    });
    if (dataBlob !== null) {
      console.log("Processing data blob");
      //console.log(dataBlob.content.data);
      parser.write(dataBlob.content.data);
    }
    parser.end();
  }, [dataBlob]);

  console.log("End of first time");
  //TODO: Figure out how to make Chart invisible at first and only appear after data is loaded
  return (
    <div className="grid justify-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <a
          href={source}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Streamlit Version
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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

      {(dataBlob === null) ? "Loading data..." : <Chart ref={chartRef} type='line' options={options} data={data} />}
    </div>
  );
};

export default DataDisplay;
