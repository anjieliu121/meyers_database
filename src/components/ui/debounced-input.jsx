import {useState, useEffect, useCallback} from 'react';
 
export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
    console.log("--- DebouncedInput Rerender");
    //initialValue is the ColumnFilterValue state passed as a prop
    //value is the state associated with the current user input
    //Every time value changes, only this particular DebouncedInput
    //component is re-rendered
    const [value, setValue] = useState(initialValue);
    const setValueToInput = useCallback(e => setValue(e.target.value));
    /*useEffect(() => {
      console.log("I run every time the initial value changes");
      setValue(initialValue);
    }, [initialValue]);*/
  
    useEffect(() => {
      console.log("I run every time columnFilterValue changes")
      const timeout = setTimeout(() => {
        console.log("Changing column state!");
        //Sets the ColumnFilterValue state
        //Triggers re-render starting in the DataTable component
        onChange(value);
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value]);
  
    return (
      <input 
        value={value} 
        onChange={setValueToInput} 
        {...props} 
      />
    )
  }