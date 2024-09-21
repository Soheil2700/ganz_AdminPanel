// import ReactHookFormDatePicker from './DateInputs';
// import { NumericFormatCustom } from "@/components/NumericFormatCustom";
import { Grid, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Control, useForm } from 'react-hook-form';
import {
   AutocompleteElement,
   CheckboxButtonGroup,
   CheckboxElement,
   MultiSelectElement,
   PasswordElement,
   PasswordRepeatElement,
   RadioButtonGroup,
   SelectElement,
   TextFieldElement,
   TextareaAutosizeElement,
} from 'react-hook-form-mui';
import FileInput from './FileInput';

interface input {
   name: string;
   label?: string;
   options?: Array<{ id: string; label: any } | string>;
   disabled?: boolean;
   hide?: boolean;
   type: string;
   // | "email"
   // | "text"
   // | "number"
   // | "currency"
   // | "password"
   // | "passwordRepeat"
   // | "date"
   // | "check"
   // | "radio"
   // | "select"
   // | "multiselect"
   // | "autoComplete"
   // | "component";
   rules?: any;
   required?: boolean;
   InputAdornment?: any;
   passwordName?: string;
   withCheck?: boolean;
   withChip?: boolean;
   component?: any;
   minDate?: any;
   maxDate?: any;
   range?: boolean;
   checked?: boolean;
   loading?: boolean;
   portal?: boolean;
   col?: { xl?: number; lg?: number; md?: number; sm?: number };
}

const InputsGrid = ({
   inputs,
   control,
   spacing = 2,
   columnGap = 0,
   rowGap = 0,
}: {
   inputs: Array<input>;
   control: Control<any>;
   spacing?: number;
   columnGap?: number;
   rowGap?: number;
}) => {
   const {
      formState: { errors },
   } = useForm();
   return (
      <Grid container spacing={spacing} columnSpacing={columnGap} rowSpacing={rowGap} alignItems={'start'}>
         {inputs.map((item: input) => {
            switch (item.type) {
               case 'email':
               case 'text':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                           // sx={{ height: "80px" }}
                        >
                           <TextFieldElement
                              size="small"
                              fullWidth
                              autoComplete="off"
                              style={{ width: '100%' }}
                              name={item.name}
                              label={item.label}
                              type={item.type}
                              rules={item.rules}
                              control={control}
                              disabled={item.disabled}
                              required={item.required}
                              InputProps={{
                                 endAdornment: item.InputAdornment && <InputAdornment position="end">{item.InputAdornment}</InputAdornment>,
                              }}
                           />
                        </Grid>
                     )
                  );
               case 'number':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <TextFieldElement
                              size="small"
                              fullWidth
                              autoComplete="off"
                              name={item.name}
                              label={item.label}
                              type={item.type}
                              rules={item.rules}
                              control={control}
                              disabled={item.disabled}
                              required={item.required}
                              InputProps={{
                                 endAdornment: item.InputAdornment && <InputAdornment position="end">{item.InputAdornment}</InputAdornment>,
                              }}
                           />
                        </Grid>
                     )
                  );
                  // case "currency":
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <TextFieldElement
                              size="small"
                              autoComplete="off"
                              fullWidth
                              name={item.name}
                              label={item.label}
                              type={item.type}
                              rules={item.rules}
                              control={control}
                              disabled={item.disabled}
                              required={item.required}
                              InputProps={{
                                 inputComponent: NumericFormatCustom,
                                 endAdornment: <InputAdornment position="end">{item.InputAdornment || 'ريال'}</InputAdornment>,
                              }}
                           />
                        </Grid>
                     )
                  );
               case 'password':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <PasswordElement
                              size="small"
                              control={control}
                              fullWidth
                              name={item.name}
                              label={item.label}
                              rules={{ required: 'پر کردن این فیلد الزامی می باشد' }}
                           />
                        </Grid>
                     )
                  );
               case 'file':
                  return (
                     <Grid
                        item
                        key={item.name}
                        xl={item?.col?.xl || 2}
                        lg={item?.col?.lg || 3}
                        md={item?.col?.md || 4}
                        sm={item?.col?.sm || 12}
                     >
                        {' '}
                        <FileInput {...item} control={control} error={errors[item.name]} />
                     </Grid>
                  );
               case 'passwordRepeat':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <PasswordRepeatElement
                              size="small"
                              autoComplete="off"
                              control={control}
                              fullWidth
                              passwordFieldName={item.passwordName || ''}
                              name={item.name}
                              label={item.label}
                              rules={{ required: 'پر کردن این فیلد الزامی می باشد' }}
                           />
                        </Grid>
                     )
                  );
                  // case 'date':
                  //if range is true result will be an array [startDate,endDate]
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <ReactHookFormDatePicker
                              portal={item.portal}
                              name={item.name}
                              label={item.label}
                              control={control}
                              required={item.required}
                              minDate={item.minDate}
                              maxDate={item.maxDate}
                              disabled={item.disabled}
                              range={item.range}
                           />
                        </Grid>
                     )
                  );
               case 'check':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <CheckboxElement
                              size="small"
                              name={item.name}
                              label={item.label}
                              rules={item.rules}
                              control={control}
                              disabled={item.disabled}
                              defaultChecked={item.checked}
                           />
                        </Grid>
                     )
                  );
               case 'multiCheck':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <CheckboxButtonGroup
                              row
                              name={item.name}
                              label={item.label}
                              rules={item.rules}
                              control={control}
                              disabled={item.disabled}
                              options={item.options || []}
                           />
                        </Grid>
                     )
                  );
               case 'radio':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                              <Typography>{item.label}</Typography>
                              <RadioButtonGroup
                                 name={item.name}
                                 options={item.options || []}
                                 control={control}
                                 rules={item.rules}
                                 required={item.required}
                                 row
                                 disabled={item.disabled}
                              />
                           </Box>
                        </Grid>
                     )
                  );
               case 'select':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <SelectElement
                              size="small"
                              autoComplete="off"
                              name={item.name}
                              label={item.label}
                              options={item.options || []}
                              control={control}
                              fullWidth
                              rules={item.rules}
                              required={item.required}
                              disabled={item.disabled}
                           />
                        </Grid>
                     )
                  );
               case 'multiselect':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <MultiSelectElement
                              size="small"
                              autoComplete="off"
                              sx={{ width: '100% !important' }}
                              minWidth={200}
                              name={item.name}
                              label={item.label}
                              options={item.options || []}
                              control={control}
                              fullWidth
                              required={item.required}
                              rules={item.rules}
                              showCheckbox={item.withCheck || true}
                              showChips={item.withChip}
                              disabled={item.disabled}
                           />
                        </Grid>
                     )
                  );
               case 'autoComplete':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <Box
                              sx={{
                                 display: 'flex',
                                 justifyItems: 'center',
                              }}
                           >
                              <AutocompleteElement
                                 loading={item.loading}
                                 autocompleteProps={{
                                    fullWidth: true,
                                    size: 'small',
                                    noOptionsText: 'گزینه ای وجود ندارد',
                                    ChipProps: { sx: { background: 'wheat' } },
                                    loadingText: 'درحال جستجو...',
                                    disabled: item.disabled,
                                 }}
                                 textFieldProps={{
                                    inputProps: {
                                       endAdornment: <InputAdornment position="end">{item.InputAdornment}</InputAdornment>,
                                    },
                                 }}
                                 name={item.name}
                                 label={item.label}
                                 options={item.options || []}
                                 control={control}
                                 rules={item.rules}
                                 showCheckbox={item.withCheck}
                                 required={item.required}
                              />
                              {item.InputAdornment && item.InputAdornment}
                           </Box>
                        </Grid>
                     )
                  );
               case 'textarea':
                  return (
                     !item.hide && (
                        <Grid
                           item
                           key={item.name}
                           xl={item?.col?.xl || 2}
                           lg={item?.col?.lg || 3}
                           md={item?.col?.md || 4}
                           sm={item?.col?.sm || 12}
                        >
                           <TextareaAutosizeElement
                              fullWidth
                              label={item.label}
                              name={item.name}
                              control={control}
                              required={item.required}
                              rules={item.rules}
                              rows={4}
                           />
                        </Grid>
                     )
                  );
               case 'component':
                  return !item.hide && item.component;
            }
         })}
      </Grid>
   );
};

export default InputsGrid;
