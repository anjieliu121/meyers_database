import { LifeBuoy } from 'lucide-react';
import { DebouncedInput } from './debounced-input';
import { RangeInput } from '@/components/input/range-input';
import { useMemo, useCallback } from 'react';

//table is only for debugging
export default function Filter({ column, table }) {
    console.log("-- Filter Rerender");
    //See the column definitions in columns.jsx
    const { filterVariant } = column.columnDef.meta ?? {};
  
    const columnFilterVal = column.getFilterValue();
    console.log("Column Filter Value");
    console.log(columnFilterVal);
    const sortedUniqueValues = useMemo(() =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
      [column.getFacetedUniqueValues(), filterVariant]
    );

    // Bug with getFacetedMinMaxValues(): see documentation

    // const minMaxValues = useMemo(() => {
    //   console.log(table.getRowModel());
    //   return filterVariant === 'range'
    //     ? column.getFacetedMinMaxValues()
    //     : []
    // }, [column.getFacetedMinMaxValues(), filterVariant]);

    const minMaxValues = useMemo(() => {
      if (filterVariant === 'range') {
        const uniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort((a, b) => a - b);
        return [Math.min(...uniqueValues), Math.max(...uniqueValues)];
      }
      return [];
    }, [column.getFacetedMinMaxValues(), filterVariant]);

    //IDK something is wrong with getFacetedMinMaxValues
    console.log("COLUMN");
    console.log(column);
    console.log("Column Filters State");
    console.log(JSON.parse(JSON.stringify(table.getState().columnFilters)));
    // console.log("MIN MAX");
    // console.log(minMaxValues);
    // console.log("FACETED MIN MAX");
    // console.log(column.getFacetedMinMaxValues());
    // console.log("UNIQUE VALUES");
    const unique = Array.from(column.getFacetedUniqueValues().keys()).sort((a, b) => a - b);
    //This works, so what's happening with getFacetedMinMaxValues() ???
    console.log(unique);
    console.log([Math.min(...unique), Math.max(...unique)]);
    //console.log(Array.from(column.getFacetedUniqueValues().keys()).sort((a, b) => a - b));
    //console.log(["HI", 3]);

    const setColumnFilterDirect = useCallback(value => {
      console.log("Directly setting filters");
      column.setFilterValue(value);
      console.log(table.getState().columnFilters);
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
            curRange={columnFilterVal ?? minMaxValues}
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
