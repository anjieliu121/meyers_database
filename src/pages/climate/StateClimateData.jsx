import { TimeSeriesInput } from '@/components/input/time-series-input';
import { useState, useMemo } from 'react';
import { StateClimateDataConstants as Constants } from '@/constants/StateClimateDataConstants';
import DataTable from '@/components/DataTable';
import * as json from './StateClimateData.json';

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
// const TIME_SERIES_VARIABLE_INDEX = 1;
// //Specifies information about each variable
// const columnDefs = [
//     {
//         accessorKey: "state",
//         header: "State",
//         meta: {
//             displayName: "State",
//             type: "categorical",
//             parse: String, 
//             specialNote: "Includes US (United States), DC (District of Columbia), VI (U.S. Virgin Islands), PR (Puerto Rico)"
//         }
//     },
//     {
//         accessorKey: "day",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     onClick={column.getToggleSortingHandler(column)}
//                 >
//                     Day
//                     <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
//                 </Button>
//             )
//         },
//         meta: {
//             displayName: "Day",
//             type: "quantitative",
//             min: 1,
//             max: 366,
//             parse: parseInt, 
//         }
//     },
//     {
//         accessorKey: "temp",
//         header: () => <div className="tw-text-right">Temperature</div>,
//         cell: ({ row }) => {
//             const amount = parseFloat(row.getValue("temp"))
//             const formatted = new Intl.NumberFormat("en-US", {
//                 style: "unit",
//                 unit: "celsius"
//             }).format(amount)
        
//             return <div className="tw-text-right tw-font-medium">{formatted}</div>
//         },
//         meta: {
//             displayName: "Temperature",
//             type: "quantitative",
//             parse: parseFloat,
//             filterVariant: 'range',
//         },
//     },
//     {
//         accessorKey: "spec_hum",
//         header: "Specific Humidity",
//         meta: {
//             displayName: "Specific Humidity",
//             type: "quantitative",
//             parse: parseFloat,
//             filterVariant: 'range',
//         },
//     },
//     {
//         accessorKey: "rh",
//         header: "Relative Humidity (RH)",
//         meta: {
//             displayName: "Relative Humidity (RH)",
//             type: "quantitative",
//             parse: parseFloat,
//             filterVariant: 'range',
//         },
//     },
//     {
//         accessorKey: "dew_point",
//         header: "Dew Point",
//         meta: {
//             displayName: "Dew Point",
//             type: "quantitative",
//             parse: parseFloat,
//             filterVariant: 'range',
//         },
//     },
//     {
//         accessorKey: "atmos_pres",
//         header: "Atmospheric Pressure",
//         meta: {
//             displayName: "Atmospheric Pressure",
//             type: "quantitative",
//             parse: parseFloat,
//             filterVariant: 'range',
//         },
//     },
//     {
//         accessorKey: "climate",
//         header: "Climate",
//         meta: {
//             displayName: "Climate",
//             type: "quantitative",
//             parse: parseFloat,
//             filterVariant: 'range',
//         },
//     },
// ];

// /**
//  * The visualizations for the dataset State Climate Data
//  *
//  * @component
//  * @param {Object} data From datablob.content; an array of dictionaries
//  * @returns {JSX.Element} The rendered visualizations
//  *
//  */
// const MIN_TIME = 1;
// const MAX_TIME = 366;
// const DEFAULT_STATE = 'AK';
// const DEFAULT_QUANTITATIVE_VARIABLE = 'climate';

// const DEFAULT_FILTERS = [
//     {
//         id: 'day', 
//         value: [MIN_TIME, MAX_TIME]
//     },
//     {
//         id: 'state',
//         value: DEFAULT_STATE,
//     },
// ];
// const DEFAULT_FILTERS_STATE = {
//     'day' : 0,
//     'state' : 1,
// };

const chartOptions = {
    //parsing: false,
    pointRadius: 5,
    //normalized: true,
    //spanGaps: true,
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
            text: "This is a title",
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
            type: 'linear',
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

const { 
    COL_DEFS, 
    DEFAULT_FILTERS, 
    CAT_VAR, 
    TS_VAR, 
    TS_VAR_INDEX, 
    MIN_TIME, 
    MAX_TIME, 
    DEFAULT_QUANT_VAR
} = Constants;

const getData = () => {
    //let data = json.data;
    //const newdata = [];
    //data.forEach(entry => newdata.push({"state": entry.state, "day": entry.day}));
    //return newdata;

    return json.data;
}

const getNormalizedChartData = (data, quantVar) => {
    const normalizedData = [];
    data.forEach(row => normalizedData.push({
        x: row[TS_VAR],
        y: row[quantVar],
    }));
    console.log("Normalized Data");
    console.log(quantVar);
    console.log(normalizedData);
    const returned = {
        datasets: [
            {
                data: normalizedData,
            }
        ]
    };
    console.log(returned);
    return returned;
}
const StateClimateData = () => {
    //TODO: When I enable manual filtering for the data table in the future,
    //definitely combine columnFIlters & columnFiltersState into 1 state
    //I see no reason why state shouldn't be in a format like
    //{
    //    'name': value, 
    //    'name': value, 
    //    ...
    //} 

    // const [columnFilters, setColumnFilters] = useState(DEFAULT_FILTERS);
    // const [columnFiltersState, setColumnFiltersState] = useState(DEFAULT_FILTERS_STATE);
    // const [quantitativeVariable, setQuantitativeVariable] = useState(DEFAULT_QUANTITATIVE_VARIABLE);
    // const data = json.data;
    // const categoricalValuesSet = new Set([]);
    // const categoricalVariableName = "state";
    // data.forEach(row => {
    //     categoricalValuesSet.add(row[categoricalVariableName]);
    // });
    // const categoricalValuesSorted = [...categoricalValuesSet].sort();
    // //console.log(categoricalValuesSorted);

    // const quantitativeVariables = [];
    // columnDefs.forEach((column, index) => {
    //     if (column.meta.type === "quantitative" && index !== TIME_SERIES_VARIABLE_INDEX)
    //         quantitativeVariables.push(column.meta.displayName);
    // });
    // //console.log(quantitativeVariables);

    // console.log("COLUMN FILTERS!");
    // console.log(columnFilters);
    //const [columnFilters, setColumnFilters] = useState([]);
    const [columnFilters, setColumnFilters] = useState(DEFAULT_FILTERS);
    const [quantVar, setQuantVar] = useState(DEFAULT_QUANT_VAR);
    
    //Obtains all unique values of the 'state' categorical variable
    const data = getData();
    const catValsSet = new Set([]);
    data.forEach(row => {
        catValsSet.add(row[CAT_VAR]);
    });
    const catValsSorted = [...catValsSet].sort();
    //console.log(categoricalValuesSorted);

    //Names of all non-time-series quantitative variables that
    //can be used as the dependent variable
    const allQuantVars = [];
    COL_DEFS.forEach((col, index) => {
        if (col.meta.type === "quant" && index !== TS_VAR_INDEX)
            allQuantVars.push(col.meta.displayName);
    });
    //console.log(quantitativeVariables);

    console.log("COLUMN FILTERS!");
    console.log(columnFilters);

    const filteredData = useMemo(() => {
        if (columnFilters.length === 0)
            return data;
        else if (columnFilters.length === 1) {
            const filter = columnFilters[0];
            const id = filter.id;
            const value = filter.value;
            if (id === CAT_VAR)
                return data.filter(row => row[id] === value);
            else if (id === TS_VAR)
                return data.filter(row => row[id] >= value[0] && 
                        row[id] <= value[1]);
            else {
                console.error(`Expected id to be ${CAT_VAR} or ${TS_VAR} but got '${id}' instead; no filtering performed`);
                return data;
            }
        } else if (columnFilters.length === 2) {
            const filter1 = columnFilters[0];
            const filter2 = columnFilters[1];
            let catId, catVal, quantId, quantVal;
            if (filter1.id === CAT_VAR && filter2.id === TS_VAR) {
                catId = filter1.id;
                catVal = filter1.value;
                quantId = filter2.id;
                quantVal = filter2.value;
            } else if (filter1.id === TS_VAR && filter2.id === CAT_VAR) {
                catId = filter2.id;
                catVal = filter2.value;
                quantId = filter1.id;
                quantVal = filter1.value;
            } else {
                console.error(`Expected ids to be ${CAT_VAR} and ${TS_VAR} but got '${filter1.id}' and '${filter2.id}' instead; no filtering performed`);
                return data;
            }
            return data.filter(row => row[catId] === catVal 
                    && row[quantId] >= quantVal[0] && row[quantId] <= quantVal[1]);
        } else {
            console.error(`No filtering done; expected 2 or fewer ids but got ${columnFilters.length} instead: ${columnFilters}`);
            return data;
        }
    }, [data, columnFilters]);

    console.log("Filtered Data");
    console.log(filteredData);

    const normalizedChartData = getNormalizedChartData(filteredData, quantVar);

    return (
        <div>
            {<TimeSeriesInput
                catVar={CAT_VAR}
                catVals={catValsSorted}
                allQuantVars={allQuantVars}
                quantVar={quantVar}
                setQuantVar={setQuantVar}
                tsVar={TS_VAR}
                minTime={MIN_TIME}
                maxTime={MAX_TIME}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            />}
            <DataTable 
                columns={COL_DEFS} 
                data={filteredData}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            /> 
            {
            // For statically loaded datasets, chart doesn't need a ref
            // But if dynammically fetching data, add a ref for useEffect()
            }
            <Chart type='line' options={chartOptions} data={normalizedChartData}/>   
        </div>
    )
}

export default StateClimateData;