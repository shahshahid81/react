import { useState } from "react";

export function useInput(initialValue, validationFn) {
  const [value, setValue] = useState(initialValue);
  const [didEdit, setDidEdit] = useState(false);

  const isValidValue = validationFn(value);

  function handleChange(event) {
    setValue(event.target.value);
    setDidEdit(false);
  }

  function handleBlur() {
    setDidEdit(true);
  }

  return {
    value,
    handleBlur,
    handleChange,
    hasError: didEdit && !isValidValue
  }
}