import React from "react";
import { useController } from "react-hook-form";
import { InputAdornment, TextField as MuiTextField } from "@mui/material";

interface Props {
  control?: any;
  name?: string;
  label?: string;
  rows?: any;
  error?: any;
  multiline?: boolean;
  required?: boolean;
  regex?: string;
  type?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  customOnChange?: any;
  restProps?: any;
}

const TextField = ({
  control,
  name = "",
  rows,
  error,
  multiline = false,
  required = false,
  regex = "",
  type,
  startIcon,
  endIcon,
  customOnChange = () => {},
  ...restProps
}: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });
  return (
    <MuiTextField
      fullWidth
      size="small"
      {...restProps}
      multiline={multiline}
      rows={rows}
      required={required}
      onChange={(e) => {
        if (e.target.value && type === "number" && !regex) {
          const reg = new RegExp(/^\d+$/);
          if (reg.test(e.target.value)) {
            field.onChange(e);
            customOnChange({ [e?.target?.name]: e.target.value });
          }
        } else {
          field.onChange(e);
          customOnChange({ [e?.target?.name]: e.target.value });
        }
      }} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value || ""} // input value
      name={field.name} // send down the input name
      inputRef={field.ref}
      InputProps={{
        ...(startIcon && {
          startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
        }),
        ...(endIcon && {
          endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment>,
        }),
      }}
      error={error}
      helperText={error?.type === "required" && "این فیلد اجباری است!"}
    />
  );
};

export default TextField;
