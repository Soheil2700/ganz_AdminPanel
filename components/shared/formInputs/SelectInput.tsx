import React from 'react';
import { Box, Chip, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useController } from 'react-hook-form';
import { XClose as ClearOutlinedIcon, ChevronDown as ArrowDropDownOutlinedIcon } from '@untitled-ui/icons-react';

interface Props {
   control: any;
   name: string;
   error: any;
   required: boolean;
   label: string;
   options: any[];
   optionId: string;
   optionLabel: string;
   onChange: any;
   multiple: boolean;
   restProps: any;
}

const SelectInput = ({
   name,
   label,
   options = [],
   optionId,
   optionLabel,
   onChange = () => {},
   multiple,
   control,
   required = false,
   error,
   ...restProps
}: Props) => {
   const { field } = useController({
      name,
      control,
      rules: { required },
   });
   return (
      <FormControl fullWidth size="small" required={required} error={error}>
         <InputLabel id="demo-simple-select-label">{label}</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => {
               field.onChange(e);
               onChange(e.target);
            }} // send value to hook form
            onBlur={field.onBlur} // notify when input is touched/blur
            value={field.value || []} // input value
            name={field.name} // send down the input name
            inputRef={field.ref}
            multiple={multiple}
            input={<OutlinedInput id="select-multiple-chip" label={label} />}
            renderValue={
               multiple
                  ? (selected) => (
                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value: any) => {
                             const label = options.find((i: any) => i[optionId] === value)[optionLabel];
                             return <Chip key={value} label={label} className="!h-[23px]" />;
                          })}
                       </Box>
                    )
                  : (selected) => {
                       const label = options.find((i: any) => i[optionId] === selected)[optionLabel];
                       return <Chip key={selected} label={label} className="!h-[23px]" />;
                    }
            }
            IconComponent={
               field.value?.length >= 1
                  ? () => (
                       <IconButton
                          size="small"
                          sx={{ margin: '0px 5px 0px 0px' }}
                          onClick={(e) => {
                             field.onChange('');
                          }}
                       >
                          <ClearOutlinedIcon />
                       </IconButton>
                    )
                  : () => (
                       <IconButton size="small" sx={{ margin: '0px 5px 0px 0px' }}>
                          <ArrowDropDownOutlinedIcon />
                       </IconButton>
                    )
            }
         >
            {options.map((item) => (
               <MenuItem value={item[optionId]}>{item[optionLabel]}</MenuItem>
            ))}
         </Select>
         <FormHelperText>{error?.type === 'required' && 'این فیلد اجباری است!'}</FormHelperText>
      </FormControl>
   );
};

export default SelectInput;
