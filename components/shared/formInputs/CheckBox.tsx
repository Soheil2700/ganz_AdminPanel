import React from "react";
import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup, CheckboxProps } from "@mui/material";
import { useController } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  label: string;
  restProps: any;
  size: "small" | "medium" | "large";
  onChange: any;
  disabled: boolean;
}

const CheckBox = ({ control, name, label, size = "small", onChange, disabled, ...restProps }: Props) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={field.value || false}
            disabled={disabled}
            onChange={(e) => {
              field.onChange({ ...e, value: e.target.checked });
              onChange({ [e.target.name]: e.target.checked });
            }} // send value to hook form
            onBlur={field.onBlur} // notify when input is touched/blur
            // value={field.value || false} // input value
            name={field.name} // send down the input name
            inputRef={field.ref}
            size={size}
            // {...restProps}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default React.memo(CheckBox);
