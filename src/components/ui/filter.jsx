import { LifeBuoy } from 'lucide-react';
import { DebouncedInput } from './debounced-input';
import { RangeInput } from '@/components/input/range-input';
import { useMemo, useCallback } from 'react';

export default function Filter({ column }) {
    console.log("-- Filter Rerender");
    //See the column definitions in columns.jsx
    const { filterVariant } = column.columnDef.meta ?? {};
  
    const columnFilterVal = column.getFilterValue();
  
    const sortedUniqueValues = useMemo(() =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
      [column.getFacetedUniqueValues(), filterVariant]
    );

    const minMaxValues = useMemo(() => 
      filterVariant === 'range'
        ? column.getFacetedMinMaxValues()
        : [],
      [column, column.getFacetedMinMaxValues, column.getFacetedMinMaxValues(), filterVariant]
    );

    //IDK something is wrong with getFacetedMinMaxValues
    console.log("COLUMN");
    console.log(column);
    console.log("MIN MAX");
    console.log(minMaxValues);
    console.log("FACETED MIN MAX");
    console.log(column.getFacetedMinMaxValues());
    console.log("UNIQUE VALUES");
    console.log(column.getFacetedUniqueValues());


    const setColumnFilterDirect = useCallback(value => {
      column.setFilterValue(value);
      return;
    }, [column.setFilterValue]);

    const setColumnFilterEvent = useCallback(e => 
      setColumnFilterDirect(e.target.value),
      [setColumnFilterDirect]
    );
    
    //The range option gives 2 input fields for numbers
    return filterVariant === 'range' ? (
      <>
      <div>
        <RangeInput
            quantVar={column.id}
            curRange={columnFilterVal ?? [-99999999, 99999999]}
            minNum={minMaxValues[0]}
            maxNum={minMaxValues[1]}
            setNewFilter={setColumnFilterDirect}
        />
        {
        // <div className="tw-flex tw-space-x-2">
        //   <DebouncedInput
        //     type="number"
        //     min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        //     max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        //     value={(columnFilterVal)?.[0] ?? ''}
        //     changeAfterDelay={value =>
        //       column.setFilterValue((old) => [value, old?.[1]])
        //     }
        //     placeholder={`Min ${
        //       column.getFacetedMinMaxValues()?.[0] !== undefined
        //         ? `(${column.getFacetedMinMaxValues()?.[0]})`
        //         : ''
        //     }`}
        //     className="tw-w-24 tw-border tw-shadow tw-rounded"
        //   />
        //   <DebouncedInput
        //     type="number"
        //     min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
        //     max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
        //     value={(columnFilterVal)?.[1] ?? ''}
        //     changeAfterDelay={value =>
        //       column.setFilterValue((old) => [old?.[0], value])
        //     }
        //     placeholder={`Max ${
        //       column.getFacetedMinMaxValues()?.[1]
        //         ? `(${column.getFacetedMinMaxValues()?.[1]})`
        //         : ''
        //     }`}
        //     className="tw-w-24 tw-border tw-shadow tw-rounded"
        //   />
        // </div>
        }
        <div className="tw-h-1" />
      </div>
      {/*The select option gives 1 input field that only allows selecting
        from given options*/}
      </>
    ) : filterVariant === 'select' ? (
      <select
        onChange={setColumnFilterEvent}
        value={columnFilterVal?.toString()}
      >
        <option value="">All</option>
        {sortedUniqueValues.map(value => (
          //dynamically generated select options from faceted values feature
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    ) : (
      <>
        {//User types the filter;
         //Autocomplete suggestions from faceted values feature 
        }
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.map((value) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <DebouncedInput
          type="text"
          value={(columnFilterVal ?? '')}
          changeAfterDelay={setColumnFilterDirect}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          className="tw-w-36 tw-border tw-shadow tw-rounded"
          list={column.id + 'list'}
        />
        <div className="tw-h-1" />
     </>
    );
};
