import { Button } from '@/components/ui/button';
import { RangeInput } from '@/components/input/range-input';
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMemo, useCallback, useRef } from 'react';
import { testIsPositiveInteger, areEqual } from '@/lib/utils';

//Variables = list of variable names
//Variable name = name of a single variable
//Values = values of a single variable
export function TimeSeriesInput({
    catVar, 
    catVals, 
    allQuantVars, 
    quantVar,
    setQuantVar, 
    tsVar,
    minTime, 
    maxTime, 
    columnFilters,
    setColumnFilters,
})  {
    console.log("COL FILTERS");
    console.log(columnFilters);
    const rangeInputRef = useRef(null);

    //TODO: Allows users to not have filters for time series
    //TODO 2: Implement filter deletion if input is empty for cat vals
    //Okay maybe think a bit more about TODO 2 since there might
    //be a lot of cat vals
    const setNewFilter = useCallback((newFilter) => {
        console.log("Old filters");
        console.log(columnFilters);
        const old_i = columnFilters.findIndex(filter => {
            return newFilter.id === filter.id;
        });

        if(old_i === -1) {
            console.log("Brand new filter");
            setColumnFilters([...columnFilters, newFilter]);
        } else if(!areEqual(newFilter.value, columnFilters[old_i].value)) {
            console.log("Different filter value");
            console.log(newFilter.value);
            console.log(columnFilters[old_i].value);
            const newColumnFilters = structuredClone(columnFilters);
            newColumnFilters.splice(old_i, 1, newFilter);
            //console.log(newColumnFilters);
            setColumnFilters(newColumnFilters);
        } else {
            console.log("Same filter value; no change");
        }
        // let hasFilter = false;
        // console.log("NEW FILTER");
        // console.log(newFilter);
        // console.log(columnFilters);
        // for (let i = 0; i < columnFilters.length; i++)
        //     if (newFilter.id === columnFilters[i].id) {
        //         if (!areEqual(newFilter.value, columnFilters[i].value)) {
        //             //Deep copy
        //             console.log("DIFFERENT");
        //             const newColumnFilters = structuredClone(columnFilters);
        //             newColumnFilters.splice(i, 1, newFilter);
        //             console.log(newColumnFilters);
        //             setColumnFilters(newColumnFilters);
        //         }
        //         console.log("HASSS FILTER");
        //         hasFilter = true;
        //         break;
        //     }

        // if (!hasFilter)
        // {
        //     console.log("Brand new filter");
        //     setColumnFilters([...columnFilters, newFilter]);
        // }
    }, [catVar, columnFilters, setColumnFilters]);

    //Does not call setNewFilter() unless input is valid
    const processRangeInput = useCallback(() => {
        const lower = rangeInputRef.current.children[0].value;
        const upper = rangeInputRef.current.children[1].value;
        if (lower === "" || upper === "")
            return;
        const valid = testIsPositiveInteger(lower) && testIsPositiveInteger(upper);
        //console.log(valid ? "VALID INPUT" : "eh");
        if(valid) {
            const lowerNum = parseInt(lower);
            const upperNum = parseInt(upper);
            if(lowerNum <= upperNum && lowerNum >= minTime && upperNum <= maxTime) {
                const newFilter = {
                    id: tsVar,
                    value: [lowerNum, upperNum],
                };

                setNewFilter(newFilter);
            } else {
                alert(`Days should be positive integers in range ${minTime} to ${maxTime}`);
            }
        } else {
            alert(`Days should be positive integers in range ${minTime} to ${maxTime}`);
        }
    }, [rangeInputRef, setNewFilter]);
            
    const curCatVal = useMemo(() => {
        const filter = columnFilters.find(filter => filter.id === catVar);
        return (filter === undefined)
            ? 'No filters on categorical values'
            : filter.value;
    }, [columnFilters]);

    const curTsVals = useMemo(() => {
        const filter = columnFilters.find(filter => filter.id === tsVar);
        return (filter === undefined)
            ? 'No filters on time-series input'
            : filter.value;
    }, [columnFilters]);

    //console.log("Column filters before rendering");
    //console.log(columnFilters);

    return (
    <div className="tw-container tw-border-black tw-mx-auto tw-py-10">
        <div className="tw-flex tw-space-x-32">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="tw-h-8 tw-w-8 tw-p-0">
                    <span className="tw-no-sr-only">{curCatVal}</span>
                    <MoreHorizontal className="tw-h-4 tw-w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Select a state
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {catVals.map(value => 
                        <DropdownMenuItem key={value}
                            onClick={() => {
                                    console.log(value);
                                    
                                    const newFilter = {
                                        id: catVar,
                                        value: value,
                                    };
                                    
                                    setNewFilter(newFilter);
                                }
                            }
                        >
                            {value}
                        </DropdownMenuItem>)}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="tw-h-8 tw-w-8 tw-p-0">
                    <span className="tw-no-sr-only">{quantVar}</span>
                    <MoreHorizontal className="tw-h-4 tw-w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Select a quantitative variable
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {allQuantVars.map(name => 
                        <DropdownMenuItem key={name}
                            onClick={() => {
                                    console.log(name);
                                    setQuantVar(name);
                                }
                            }
                        >
                            {name}
                        </DropdownMenuItem>)}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <RangeInput
            quantVar={tsVar}
            curRange={curTsVals}
            minNum={minTime}
            maxNum={maxTime}
            setNewFilter={setNewFilter}
        />
    </div>
    );
}