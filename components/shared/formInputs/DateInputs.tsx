import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
// import moment from 'moment-jalaali';
import { useState } from 'react';
// import persian from 'react-date-object/calendars/persian';
// import persian_fa from 'react-date-object/locales/persian_fa';
// @ts-ignore
// import transition from 'react-element-popper/animations/transition';
import { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form-mui';
// import DatePicker from 'react-multi-date-picker';

interface props {
   name: string;
   label?: string;
   control: Control;
   required?: boolean;
   disabled?: boolean;
   minDate: string;
   maxDate: string;
   range?: boolean;
   portal?: boolean;
}
const ReactHookFormDatePicker = ({
   name,
   label,
   control,
   required = false,
   disabled = false,
   minDate,
   maxDate,
   range,
   portal = true,
}: props) => {
   const [values, setValues] = useState([]);
   return (
      <></>
      // <Controller
      //    control={control}
      //    name={name}
      //    rules={required ? { required: 'پر کردن این فیلد الزامی است' } : { required: false }}
      //    render={({ field: { onChange, value = '' }, formState: { errors } }) => {
      //       return (
      //          <DatePicker
      //             containerStyle={{
      //                width: '100%',
      //                cursor: 'pointer',
      //             }}
      //             style={{
      //                position: 'relative',
      //                cursor: 'pointer',
      //                zIndex: 1000,
      //             }}
      //             readOnly={disabled}
      //             animations={[transition()]}
      //             portal={portal}
      //             value={range ? values : value}
      //             dateSeparator=" تا "
      //             disabled={disabled}
      //             minDate={minDate}
      //             maxDate={maxDate}
      //             required={required}
      //             range={range}
      //             format={'YYYY/MM/DD'}
      //             calendar={persian}
      //             locale={persian_fa}
      //             calendarPosition="bottom-right"
      //             mapDays={({ date }) => {
      //                let props = { className: '' };
      //                let isWeekend = date.weekDay.index === 6;
      //                if (isWeekend) props.className = 'highlight highlight-red';
      //                return props;
      //             }}
      //             onChange={(date: any) => {
      //                if (range) {
      //                   setValues(() => date);
      //                   setTimeout(
      //                      () =>
      //                         onChange([
      //                            date[0] && moment(new Date(date[0]))?.format('jYYYY/jMM/jDD'),
      //                            date[1] && moment(new Date(date[1]))?.format('jYYYY/jMM/jDD'),
      //                         ]),
      //                      100
      //                   );
      //                } else {
      //                   onChange(date?.isValid ? moment(new Date(date)).format('jYYYY/jMM/jDD') : null);
      //                }
      //             }}
      //             render={(value, openCalendar) => {
      //                return (
      //                   <>
      //                      <TextField
      //                         size="small"
      //                         margin="dense"
      //                         fullWidth
      //                         autoComplete="off"
      //                         value={value}
      //                         disabled={disabled}
      //                         onClick={openCalendar}
      //                         style={{ margin: 0 }}
      //                         InputProps={{
      //                            endAdornment: (
      //                               <InputAdornment position="end">
      //                                  {values.length > 0 || value ? (
      //                                     <IconButton
      //                                        size="small"
      //                                        sx={{
      //                                           color: (theme) => theme.palette.text.primary + '9',
      //                                        }}
      //                                        onClick={() => {
      //                                           setValues([]);
      //                                           onChange('');
      //                                        }}
      //                                     >
      //                                        <CloseOutlinedIcon sx={{ fontSize: '1.3rem !important' }} />
      //                                     </IconButton>
      //                                  ) : (
      //                                     <IconButton
      //                                        sx={{
      //                                           color: (theme) => (disabled ? theme.palette.text.disabled : theme.palette.text.secondary),
      //                                        }}
      //                                     >
      //                                        <CalendarMonthIcon />
      //                                     </IconButton>
      //                                  )}
      //                               </InputAdornment>
      //                            ),
      //                         }}
      //                         // @ts-ignore
      //                         error={errors[name]}
      //                         sx={{ width: '100%' }}
      //                         label={label}
      //                         name="contractStartDate"
      //                         required={required}
      //                      />
      //                      {errors[name] && (
      //                         <Typography
      //                            sx={{
      //                               color: '#d32f2f',
      //                               fontSize: '0.75rem',
      //                               fontWeight: 400,
      //                            }}
      //                         >
      //                            {errors[name] && 'پر کردن این فیلد الزامی است.'}
      //                         </Typography>
      //                      )}
      //                   </>
      //                );
      //             }}
      //          />
      //       );
      //    }}
      // />
   );
};

export default ReactHookFormDatePicker;
