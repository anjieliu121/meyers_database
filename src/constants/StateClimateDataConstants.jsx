import { ArrowUpDown } from "lucide-react";
 
import { Button } from "@/components/ui/button";

//Specifies information about each variable
export const StateClimateDataConstants = {
    COL_DEFS: [
        {
            accessorKey: "state",
            header: "State",
            meta: {
                displayName: "State",
                type: "cat",
                parse: String, 
                filterVariant: 'select',
                specialNote: "Includes US (United States), DC (District of Columbia), VI (U.S. Virgin Islands), PR (Puerto Rico)"
            }
        },
        {
            accessorKey: "day",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={column.getToggleSortingHandler(column)}
                    >
                        Day
                        <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
                    </Button>
                )
            },
            meta: {
                displayName: "Day",
                type: "quant",
                min: 1,
                max: 366,
                parse: parseInt, 
                filterVariant: 'range',
            }
        },
        {
            accessorKey: "temp",
            header: () => <div className="tw-text-right">Temperature</div>,
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("temp"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "unit",
                    unit: "celsius"
                }).format(amount)
            
                return <div className="tw-text-right tw-font-medium">{formatted}</div>
            },
            meta: {
                displayName: "Temperature",
                type: "quant",
                parse: parseFloat,
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "spec_hum",
            header: "Specific Humidity",
            meta: {
                displayName: "Specific Humidity",
                type: "quant",
                parse: parseFloat,
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "rh",
            header: "Relative Humidity (RH)",
            meta: {
                displayName: "Relative Humidity (RH)",
                type: "quant",
                parse: parseFloat,
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "dew_point",
            header: "Dew Point",
            meta: {
                displayName: "Dew Point",
                type: "quant",
                parse: parseFloat,
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "atmos_pres",
            header: "Atmospheric Pressure",
            meta: {
                displayName: "Atmospheric Pressure",
                type: "quant",
                parse: parseFloat,
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "climate",
            header: "Climate",
            meta: {
                displayName: "Climate",
                type: "quant",
                parse: parseFloat,
                filterVariant: 'range',
            },
        },
    ],
    DEFAULT_FILTERS: [
        {
            id: 'day', 
            value: [1, 50],
        },
        {
            id: 'state',
            value: 'AK',
        },
    ],
    CAT_VAR: 'state',
    TS_VAR: 'day',
    TS_VAR_INDEX: 1,
    MIN_TIME: 1,
    MAX_TIME: 366,
    DEFAULT_QUANT_VAR: 'climate',
};
