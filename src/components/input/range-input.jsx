import { useRef, useCallback } from 'react';
import { DebouncedInput } from '@/components/ui/debounced-input';
import { testIsPositiveInteger } from '@/lib/utils';

export function RangeInput({quantVar, curRange, minNum, maxNum, setNewFilter}) {
    const rangeInputRef = useRef(null);
    console.log("Range info");
    console.log(quantVar);
    console.log(curRange);
    console.log(minNum);
    console.log(maxNum);
    //Does not call setNewFilter() unless input is valid
    //Will also ignore the value passed as an argument by debounced input
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
            if(lowerNum <= upperNum && lowerNum >= minNum && upperNum <= maxNum) {
                const newFilter = {
                    id: quantVar,
                    value: [lowerNum, upperNum],
                };

                setNewFilter(newFilter);
            } else {
                //alert(`Days should be positive integers in range ${minNum} to ${maxNum}`);
            }
        } else {
            //alert(`Days should be positive integers in range ${minNum} to ${maxNum}`);
        }
    }, [rangeInputRef, setNewFilter]);

    return (
        <div 
            className="tw-flex tw-space-x-2"
            ref={rangeInputRef}
        >
            {/*Note that type="number" still means value is a string*/}
            <DebouncedInput
                type="number"
                value={curRange[0]}
                //It's a good practice to pass a function
                //wrapped in useCallback() so that there won't
                //be a new function created inline every render
                changeAfterDelay={processRangeInput}
                placeholder={`Min (${minNum})`}
                className="tw-w-36 tw-border tw-shadow tw-rounded"
            />
            <DebouncedInput
                type="number"
                value={curRange[1]}
                changeAfterDelay={processRangeInput}
                placeholder={`Max (${maxNum})`}
                className="tw-w-36 tw-border tw-shadow tw-rounded"
            />
        </div>
    );
}