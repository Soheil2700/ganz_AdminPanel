import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  error?: any;
  required?: boolean;
  label: string;
  options: any[];
  optionKey: string;
  optionLabel: string;
  onChange?: any;
  size?: any;
  multiple?: boolean;
  disabled?: boolean;
}

const RadioButton = ({
  name,
  label,
  options,
  optionKey,
  optionLabel,
  onChange = () => {},
  multiple,
  control,
  required = false,
  size = "small",
  error,
  disabled,
  ...restProps
}: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        {...restProps}
        name={field.name} // send down the input name
        value={field.value || ""} // input value
        onChange={(e) => {
          field.onChange(e);
          onChange(e.target.value);
        }} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
      >
        {options?.map((item, index) => (
          <FormControlLabel key={index} control={<Radio />} label={item[optionLabel]} value={item[optionKey]} />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.type === "required" && "این فیلد اجباری است!"}</FormHelperText>
    </FormControl>
  );
};

export default RadioButton;
