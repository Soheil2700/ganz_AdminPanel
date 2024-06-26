import React from "react";
import { FormControl, InputAdornment, InputLabel, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { UploadCloud01 as CloudUploadOutlinedIcon, Delete, Trash01 } from "@untitled-ui/icons-react";

interface Props {
  id: string;
  label: string;
  control: any;
  name: string;
  error: any;
  required: boolean;
  customOnChange: any;
  restProps: any;
  disabled: boolean;
}

const FileInput = ({ id, label, name, control, error, required, disabled, customOnChange = () => {}, ...restProps }: Props) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });
  return (
    <>
      <FormControl fullWidth size="small" required={required} error={error} disabled={disabled}>
        <InputLabel id="demo-simple-select-label">{field.value?.split("\\").pop() || label}</InputLabel>
        <TextField
          // value={label}
          inputProps={{
            readOnly: true,
          }}
          fullWidth
          InputProps={{
            endAdornment: field.value ? (
              <InputAdornment position="end" className="cursor-pointer">
                <Trash01
                  onClick={() => {
                    customOnChange("");
                    field.onChange("");
                  }}
                />
              </InputAdornment>
            ) : (
              <label htmlFor={id}>
                <InputAdornment position="end" className="cursor-pointer">
                  <CloudUploadOutlinedIcon />
                </InputAdornment>
              </label>
            ),
          }}
          size="small"
          required={required}
          error={error}
          helperText={error?.type === "required" && "این فیلد اجباری است!"}
        />
      </FormControl>
      <input
        id={id}
        type="file"
        onChange={(e) => {
          customOnChange(e.target.files);
          field.onChange(e);
        }} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value || ""} // input value
        name={field.name} // send down the input name
        className="rtl:file-ml-5 form-input hidden p-0 file:border-0 file:bg-primary/90 file:px-4 file:py-2 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
      />
    </>
  );
};

export default FileInput;
