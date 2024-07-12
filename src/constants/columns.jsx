import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

let sortStuff = (column) => {
  //console.log("Am I even here");
  //console.log(column.getToggleSortingHandler());
  //console.log("What a cruel world");
  return column.getToggleSortingHandler();
}

/*Each dictionary is the definition for 1 column;
the header is what's actually displayed, while accessorKey generally acts like
an id.

Note that you don't have to specify all the HTML properties of the header 
here, but I did it because it does make the code more modular*/
export const columns = {
    "test": [
        {
            accessorKey: "state",
            header: "State",
        },
        {
            accessorKey: "day",
            header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={sortStuff(column)}
                >
                Day
                <ArrowUpDown className="tw-ml-2 tw-h-4 tw-w-4" />
                </Button>
            )
            },
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
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "atmos_pres",
            header: "Atmospheric Pressure",
            meta: {
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "climate",
            header: "Climate",
            meta: {
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "dew_point",
            header: "Dew Point",
            meta: {
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "rh",
            header: "Relative Humidity (RH)",
            meta: {
                filterVariant: 'range',
            },
        },
        {
            accessorKey: "spec_hum",
            header: "Specific Humidity",
            meta: {
                filterVariant: 'range',
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const payment = row;
            
                return (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="tw-h-8 tw-w-8 tw-p-0">
                        <span className="tw-no-sr-only">Open menu</span>
                        <MoreHorizontal className="tw-h-4 tw-w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        onClick={() => {
                                navigator.clipboard.writeText(payment.original.HiddenID)
                            }
                        }
                        >
                        Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
}