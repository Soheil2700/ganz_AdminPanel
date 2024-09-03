import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useController } from 'react-hook-form';
import fa from 'date-fns-jalali/locale/fa-IR';
import { Calendar } from '@untitled-ui/icons-react';

interface Props {
   label: string;
   control: any;
   name: string;
   error?: any;
   required?: boolean;
   type?: 'date' | 'time' | 'date-time';
   restProps?: any;
}

const DateInput = ({ label, name, control, type = 'date', required, error, ...restProps }: Props) => {
   const Picker = type === 'date' ? DatePicker : type === 'time' ? TimePicker : DateTimePicker;
   const { field } = useController({
      name,
      control,
      rules: { required },
   });

   return (
      <>
         <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <Picker
               label={label}
               {...restProps}
               //@ts-ignore
               mask={type === 'date' ? '____/__/__' : type === 'time' ? '__:__' : '____/__/__ — __:__'}
               inputFormat={type === 'date' ? 'yyyy/MM/dd' : type === 'time' ? 'HH:mm' : 'yyyy/MM/dd — HH:mm'}
               ampm={false}
               onChange={field.onChange} // send value to hook form
               onBlur={field.onBlur} // notify when input is touched/blur
               value={field.value} // input value
               name={field.name} // send down the input name
               inputRef={field.ref}
               // onAccept={handle_change}
               OpenPickerButtonProps={{
                  size: 'small',
                  className: {
                     paddingLeft: '16px !important',
                     '& svg': {
                        fontSize: 24,
                     },
                  },
               }}
               renderInput={(params: any) => <TextField {...params} size="small" />}
               slotProps={{
                  field: { clearable: true },
                  textField: {
                     helperText: error?.type === 'required' && 'این فیلد اجباری است!',
                     size: 'small',
                     fullWidth: true,
                     error: error,
                     required: required,
                  },
               }}
               slots={{
                  openPickerIcon: Calendar,
               }}
            />
         </LocalizationProvider>
      </>
   );
};

export default DateInput;
