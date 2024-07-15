import React from "react";
import {
  Autocomplete,
  Box,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useController } from "react-hook-form";
import { XClose as ClearOutlinedIcon, ChevronDown as ArrowDropDownOutlinedIcon } from "@untitled-ui/icons-react";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectInput = ({
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
    // <Autocomplete
    //   {...restProps}
    //   id="combo-box-demo"
    //   options={options}
    //   getOptionKey={(option) => option[optionKey]}
    //   getOptionLabel={(option) => option[optionLabel]}
    //   renderInput={(params) => <TextField {...params} required={required} error={error} label={label} />}
    //   noOptionsText="موردی وجود ندارد"
    //   fullWidth
    //   size={size}
    //   onChange={(_, n) => {
    //     if (multiple) {
    //       field.onChange(n);
    //       onChange({ [name]: n.map((i) => i[optionKey]) });
    //     } else {
    //       // @ts-ignore
    //       field.onChange(n[optionKey]);
    //       // @ts-ignore
    //       onChange({ [name]: n[optionKey] });
    //     }
    //   }} // send value to hook form
    //   onBlur={field.onBlur} // notify when input is touched/blur
    //   multiple={true}
    //   disabled={disabled}
    // />
    <FormControl fullWidth required={required} error={error} size={size} {...restProps}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={(e) => {
          field.onChange(e);
          onChange({ [e.target.name]: e.target.value });
        }} // send value to hook form
        onBlur={field.onBlur} // notify when input is touched/blur
        value={field.value || []} // input value
        name={field.name} // send down the input name
        inputRef={field.ref}
        multiple={multiple}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        disabled={disabled}
        MenuProps={MenuProps}
        renderValue={
          multiple
            ? (selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value: any) => {
                    const label = options.find((i: any) => i[optionKey] === value)?.[optionLabel];
                    return <Chip key={value} label={label} className="!h-[23px]" />;
                  })}
                </Box>
              )
            : (selected) => {
                const label = options.find((i: any) => i[optionKey] === selected)?.[optionLabel];
                if (label) {
                  return <Chip key={selected} label={label} className="!h-[23px]" />;
                } else {
                  field.onChange("");
                  onChange("");
                  return;
                }
              }
        }
        IconComponent={
          field.value?.length >= 1
            ? () => (
                <IconButton
                  size="small"
                  sx={{ margin: "0px 5px 0px 0px" }}
                  onClick={(e) => {
                    field.onChange("");
                    onChange("");
                  }}
                >
                  <ClearOutlinedIcon />
                </IconButton>
              )
            : () => (
                <IconButton size="small" sx={{ margin: "0px 5px 0px 0px" }}>
                  <ArrowDropDownOutlinedIcon />
                </IconButton>
              )
        }
      >
        {options?.map((item, index) => (
          <MenuItem value={item[optionKey]} key={index}>
            {item[optionLabel]}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.type === "required" && "این فیلد اجباری است!"}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
