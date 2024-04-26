import React, { useState } from "react";
import { useController } from "react-hook-form";
import { IconButton, InputAdornment, TextField as MuiTextField } from "@mui/material";
import { Eye, EyeOff as EyeSlash } from "@untitled-ui/icons-react";

interface Props {
  control: any;
  name: string;
  rows: any;
  error: any;
  multiline: boolean;
  required: boolean;
  regex: string;
  type: string;
  startIcon: JSX.Element;
  endIcon: JSX.Element;
  customOnChange: any;
  restProps: any;
}

const PasswordInput = ({
  control,
  name,
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
  const [show, setShow] = useState(false);
  return (
    <MuiTextField
      fullWidth
      size="small"
      {...restProps}
      multiline={multiline}
      rows={rows}
      required={required}
      onChange={(e) => {
        field.onChange(e);
        customOnChange({ [e?.target?.name]: e.target.value });
      }} // send value to hook form
      onBlur={field.onBlur} // notify when input is touched/blur
      value={field.value || ""} // input value
      name={field.name} // send down the input name
      inputRef={field.ref}
      InputProps={{
        ...(startIcon && {
          startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
        }),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton className="!pl-[14px]" edge="end" onClick={() => setShow(!show)}>
              {/* @ts-ignore */}
              {!show ? <Eye size="22" variant="Outline" /> : <EyeSlash size="22" variant="Outline" />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={show ? "text" : "password"}
      error={error}
      helperText={error?.type === "required" && "این فیلد اجباری است!"}
    />
  );
};

export default PasswordInput;
