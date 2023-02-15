import { useState } from "react";

export function useFormInput() {
  const [value, setValue] = useState("");

  function handleChange(e: any) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  };

  return inputProps;
}
