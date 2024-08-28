import React from "react";
import { FormControl, InputAdornment, InputLabel, Switch, TextField } from "@mui/material";
import { useController } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  error?: any;
  label?: string;
  required?: boolean;
  size?: any;
  disabled?: boolean;
  restProps?: any;
}

const SwitchBox = ({ control, name, label, required, error, size, disabled, ...restProps }: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required: required },
  });
  return (
    <FormControl fullWidth size="small" required={required} error={error} disabled={disabled}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <TextField
        // value={label}
        inputProps={{
          readOnly: true,
        }}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ marginRight: "-12px" }}>
              <Switch
                checked={field.value || false}
                onChange={field.onChange} // send value to hook form
                onBlur={field.onBlur} // notify when input is touched/blur
                name={field.name} // send down the input name
                inputRef={field.ref}
                size={size ?? "medium"}
                //   {...restProps}
              />
            </InputAdornment>
          ),
          style: { cursor: "pointer" },
        }}
        size="small"
        {...restProps}
      />
    </FormControl>
  );
};

export default SwitchBox;
