import {useState, useEffect, useCallback} from 'react';
 
const placeholderFunction = () => 0;
export function DebouncedInput({
  value: initialValue,
  changeAfterDelay = placeholderFunction,
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
      console.log("I run every time columnFilterValue changes");
      const timeout = setTimeout(() => {
        console.log("Debouncing has finished & pushing input!");
        console.log(value);
        //Sets the ColumnFilterValue state
        //Triggers re-render starting in the DataTable component
        changeAfterDelay(value);
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value, debounce]);
  
    return (
      <input 
        value={value} 
        onChange={setValueToInput} 
        {...props} 
      />
    )
  }