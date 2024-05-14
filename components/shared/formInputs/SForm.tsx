'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import SelectInput from './SelectInput';
import TextField from './TextField';
import CheckBox from './CheckBox';
import SwitchBox from './SwitchBox';
import FileInput from './FileInput';
import DateInput from './DateInput';
import PasswordInput from './PasswordInput';
import SliderInput from './SliderInput';
import UploadButton from './UploadButton';

interface Props {
   formStructure: {}[];
   editValues?: string | {};
   submitHandler: any;
   resetHandler?: any;
   buttons?: {}[];
   showSubmitButton?: boolean;
   showResetButton?: boolean;
   formClassName?: string;
   getValues?: any;
   validations?: {};
   submitButtonText?: string;
   resetButtonText?: string;
   disablePadding?: boolean;
   buttonFullWidth?: boolean;
   submitClassName?: string;
   resetClassName?: string;
   endIcon?: JSX.Element;
}

const SForm = ({
   formStructure = [],
   editValues = '',
   submitHandler = () => {},
   resetHandler = () => {},
   buttons = [],
   showSubmitButton = true,
   showResetButton = true,
   formClassName = '',
   getValues = () => {},
   validations = {},
   submitButtonText,
   resetButtonText,
   disablePadding = false,
   buttonFullWidth = false,
   resetClassName = '',
   submitClassName = '',
   endIcon,
}: Props) => {
   const {
      control,
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm();
   let colObj: any = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      6: 'col-span-6',
      12: 'col-span-12',
   };
   useEffect(() => {
      if (editValues) {
         Object.entries(editValues).forEach(([key, value]) => setValue(key, value));
      }
   }, [editValues]);
   return (
      <form
         className={!disablePadding ? 'p-4' : ''}
         onSubmit={handleSubmit((value) => {
            for (const propety in value) {
               if (!value[propety]) {
                  delete value[propety];
               }
            }
            submitHandler(value);
         })}
         /* @ts-ignore */
         noValidate="noValidate"
      >
         <div className={`${formClassName} mt-5 grid grid-flow-row items-start justify-between gap-4 sm:grid-cols-2 lg:grid-cols-12`}>
            {formStructure.map((item: any, index) => {
               switch (item.type) {
                  case 'text':
                  case 'number':
                     return (
                        <div key={index} className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <TextField
                              id={index}
                              {...item}
                              {...register(item.name)}
                              customOnChange={item.onChange}
                              control={control}
                              error={errors[item.name]}
                           />
                        </div>
                     );
                  case 'password':
                     return (
                        <div key={index} className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <PasswordInput
                              id={index}
                              {...item}
                              {...register(item.name)}
                              customOnChange={item.onChange}
                              control={control}
                              error={errors[item.name]}
                           />
                        </div>
                     );
                  case 'textarea':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-12'}>
                           <TextField
                              key={index}
                              id={index}
                              {...item}
                              multiline={true}
                              rows={3}
                              control={control}
                              error={errors[item.name]}
                           />
                        </div>
                     );
                  case 'file':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <FileInput key={index} id={index} {...item} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'checkbox':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <CheckBox key={index} id={index} {...item} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'select':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <SelectInput key={index} id={index} {...item} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'multi_select':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <SelectInput key={index} id={index} {...item} multiple={true} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'switch':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <SwitchBox key={index} id={index} {...item} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'date':
                  case 'dateTime':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <DateInput key={index} id={index} {...item} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'slider':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <SliderInput key={index} id={index} {...item} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'uploadButton':
                     return (
                        <div className={item.col ? colObj[item.col] : 'col-span-3'}>
                           <UploadButton key={index} id={index} {...item} control={control} error={errors[item.name]} />
                        </div>
                     );
                  case 'component':
                     return <div className="flex flex-col justify-center">{item.component}</div>;
                  default:
                     return <TextField key={index} />;
               }
            })}
         </div>
         <div className={`flex ${buttonFullWidth ? 'flex-col' : 'rtl:flex-row-reverse'} mt-12 gap-3`}>
            {showSubmitButton && (
               <Button variant="contained" type="submit" className={`!px-8 ${submitClassName}`} color="primary" endIcon={endIcon}>
                  {submitButtonText || 'تایید'}
               </Button>
            )}
            {showResetButton && (
               <Button
                  variant="outlined"
                  type="reset"
                  className={resetClassName}
                  onClick={() => {
                     reset();
                     resetHandler();
                  }}
                  color="neutral"
                  endIcon={endIcon}
               >
                  {resetButtonText || 'لغو'}
               </Button>
            )}
            {buttons.map((item: any, index) => {
               return (
                  <Button
                     key={index}
                     {...item}
                     // ref={ref}
                     type={item.type || 'button'}
                     //   onClick={
                     //     // item.type === "submit"
                     //     //   ? formik.handleSubmit
                     //     //   :
                     //     item.type === "reset" ? formik.handleReset : item.onClick
                     //   }
                  >
                     {item.label}
                  </Button>
               );
            })}
         </div>
      </form>
   );
};

export default React.memo(SForm);
