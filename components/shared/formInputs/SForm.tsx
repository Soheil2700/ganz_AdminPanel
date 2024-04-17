import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Textarea from './Textarea';
import TextField from './TextField';
import FileInput from './FileInput';
import CheckBox from './CheckBox';
import SelectInput from './SelectInput';
import Switch from './Switch';
import Button from '../Button';
import NumberInput from './NumberInput';
import DateInput from './DateInput';

interface Props {
   formStructure: {}[];
   editValues?: '';
   submitHandler: any;
   buttons?: [];
   showButtons?: boolean;
   formClassName?: string;
   getValues?: any;
   validations?: {};
}

const SForm = ({
   formStructure = [],
   editValues = '',
   submitHandler = () => {},
   buttons = [],
   showButtons = true,
   formClassName = '',
   getValues = () => {},
   validations = {},
}: Props) => {
   let colObj: any = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      6: 'col-span-6',
      12: 'col-span-12',
   };
   let initialValues: any = {};
   const ref: any = useRef();
   const requiredField = formStructure
      .filter((item: any) => item.required)
      .reduce(
         (o, key: any) => ({
            ...o,
            [key.name]: Yup.string().required('این فیلد اجباری است!'),
         }),
         {}
      );
   Object.entries(formStructure).forEach(
      ([key, value]: any) => (initialValues[value.name] = value.type === ('checkbox' || 'indicator') ? false : '')
   );
   const formik = useFormik({
      initialValues,
      onSubmit: (values) => {
         submitHandler(values);
      },
      validationSchema: Yup.object({ ...requiredField, ...validations }),
      enableReinitialize: true,
      innerRef: ref,
   });
   useEffect(() => {
      getValues(formik.values);
   }, [formik.values]);
   useEffect(() => {
      if (editValues) {
         formik.setValues(editValues);
      }
   }, [editValues]);
   return (
      <form className="my-4 dark:bg-black" onSubmit={formik.handleSubmit}>
         <div className={`${formClassName} mt-5 grid grid-flow-row items-center justify-between gap-4 sm:grid-cols-2 lg:grid-cols-12`}>
            {formStructure
               .filter((i: any) => i.display !== false)
               .map((item: { [key: string]: any }, index) => {
                  switch (item.type) {
                     case 'text':
                        return (
                           <TextField
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                           />
                        );
                     case 'password':
                        return (
                           <TextField
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                           />
                        );
                     case 'textarea':
                        return (
                           <Textarea
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-12'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                           />
                        );
                     case 'file':
                        return (
                           <FileInput
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              // formik={formik}
                              clear={formik.setFieldValue}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              // customOnChange={formik.setFieldValue}
                           />
                        );
                     case 'checkbox':
                        return (
                           <CheckBox
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                           />
                        );
                     case 'select':
                        return (
                           <SelectInput
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.setFieldValue}
                           />
                        );
                     case 'multi_select':
                        return (
                           <SelectInput
                              key={index}
                              id={index}
                              {...item}
                              isMulti={true}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.setFieldValue}
                           />
                        );
                     case 'indicator':
                        return (
                           <Switch
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                           />
                        );
                     case 'number':
                        return (
                           <NumberInput
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                           />
                        );
                     case 'date':
                        return (
                           <DateInput
                              key={index}
                              id={index}
                              {...item}
                              col={item.col ? colObj[item.col] : 'col-span-3'}
                              value={formik.values[item.name]}
                              error={formik.errors[item.name]}
                              touched={formik.touched[item.name]}
                              onBlur={formik.handleBlur}
                              onChange={(date) => formik.setFieldValue(item.name, date.toDate().getTime())}
                           />
                        );
                     case 'component':
                        return <div className="flex flex-col justify-center">{item.component}</div>;
                     default:
                        return <TextField id={index} key={index} />;
                  }
               })}
         </div>
         <div className={`mt-2 flex ${!showButtons && 'hidden'} gap-3 rtl:flex-row-reverse`}>
            {buttons.map((item: {}, index) => {
               return <Button id={index} {...item} handleReset={formik.handleReset} />;
            })}
         </div>
      </form>
   );
};

export default React.memo(SForm);
