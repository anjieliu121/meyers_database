import DebouncedInput from './debounced-input.jsx';
import {useMemo} from 'react';

export default function Filter({ column }) {
    console.log("-- Filter Rerender");
    //See the column definitions in columns.jsx
    const { filterVariant } = column.columnDef.meta ?? {}
  
    const columnFilterValue = column.getFilterValue()
  
    const sortedUniqueValues = useMemo(
      () =>
        filterVariant === 'range'
          ? []
          : Array.from(column.getFacetedUniqueValues().keys())
              .sort()
              .slice(0, 5000),
      [column.getFacetedUniqueValues(), filterVariant]
    )
    
    //The range option gives 2 input fields for numbers
    return filterVariant === 'range' ? (
      <>
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue)?.[0] ?? ''}
            onChange={value =>
              column.setFilterValue((old) => [value, old?.[1]])
            }
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0] !== undefined
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue)?.[1] ?? ''}
            onChange={value =>
              column.setFilterValue((old) => [old?.[0], value])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
      {/*The select option gives 1 input field that only allows selecting
        from given options*/}
      </>
    ) : filterVariant === 'select' ? (
      <select
        onChange={e => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
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
        {/*User types the filer;
         Autocomplete suggestions from faceted values feature */}
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.map((value) => (
            <option value={value} key={value} />
          ))}
        </datalist>
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? '')}
          onChange={value => column.setFilterValue(value)}
          placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          className="w-36 border shadow rounded"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    )
  }