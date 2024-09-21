import React, { useEffect, useMemo, useState } from 'react';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import SForm from '@/components/shared/formInputs/SForm';
import api from '../../../services/interceptor';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import HoverTable from '../../../components/shared/tables/hoverTable';
import { notifyError, notifySuccess } from '../../../components/shared/notify/SNotify';
import InputsGrid from '../../../components/shared/formInputs/InputsGrid';
import { useForm } from 'react-hook-form';

const Attribute = () => {
   const [category, setCategory] = useState('');
   const [show, setShow] = useState(0);
   const [attributes, setAttributes] = useState([]);
   const { data: categories } = useCategoriesQuery();
   const { control, handleSubmit, reset } = useForm();

   const inputs1 = [
      {
         type: 'select',
         name: 'categories',
         label: 'دسته بندی ویژگی',
         options: categories?.categories,
         col: { xl: 4, lg: 6, md: 12 },
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
         },
      },
      {
         type: 'text',
         name: 'name',
         label: 'نام ویژگی (فارسی)',
         col: { xl: 4, lg: 6, md: 12 },
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9 ]{3,}$/,
               message: 'حداقل سه کاراکتر و فقط اعداد و حروف فارسی و فاصله مجاز است.',
            },
         },
      },
   ];

   const inputs2 = [
      {
         name: 'attributeId',
         label: 'ویژگی',
         type: 'select',
         options: attributes?.map((item) => ({ ...item, label: item.name })),
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
         },
         col: { xl: 4, lg: 6, md: 12 },
      },
      {
         type: 'text',
         name: `label1`,
         label: 'لیبل (فارسی)',
         col: { xl: 4, lg: 6, md: 12 },
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9 ]{3,}$/,
               message: 'حداقل سه کاراکتر و فقط اعداد و حروف فارسی و فاصله مجاز است.',
            },
         },
      },
      {
         type: 'text',
         name: `value1`,
         label: 'مقدار (انگلیسی بدون فاصله)',
         col: { xl: 4, lg: 6, md: 12 },
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^[a-zA-Z0-9]{4,}$/,
               message: 'حداقل چهار کاراکتر و فقط کاراکتر انگلیسی و عدد مجاز است.',
            },
         },
      },
   ];
   const getAtt = (category_name) => {
      api.get('api/attribute', {
         params: { category_name },
      }).then((res) => {
         let data = res.data.attributes.map((item) => {
            const label = item.AttributeValue.map((i) => i.label).join('، ');
            return { ...item, label };
         });
         setAttributes(data);
      });
   };
   const handleSubmit1 = (values) => {
      api.post('api/attribute', { ...values, categories: [values.categories], values: [] })
         .then((res) => {
            getAtt(category);
            notifySuccess('ویژگی با موفقیت ایجاد شد');
            reset({ name: '', categories: '' });
         })
         .catch((err) => notifyError('خطا در ایجاد ویژگی'));
   };
   const handleSubmit2 = (values) => {
      let attributeId = values.attributeId;
      delete values.attributeId;
      let arr = [];
      Object.entries(values).forEach((item, index) => {
         if (values[`label${index + 1}`]) {
            arr.push({ label: values[`label${index + 1}`], value: values[`value${index + 1}`] });
         }
      });
      api.post('api/attribute/value', { attributeId, values: arr })
         .then((res) => {
            reset({ attributeId: '', label: '', value1: '' });
            getAtt(category);
            notifySuccess('مقادیر با موفقیت ایجاد شدند');
         })
         .catch((err) => notifyError('خطا در ایجاد مقدار برای ویژگی'));
   };

   return (
      <div className="flex flex-col gap-6">
         <SForm
            formStructure={[
               {
                  label: 'برای مشاهده ویژگی ها، ابتدا یک دسته بندی را انتخاب کنید',
                  name: 'category_name',
                  type: 'select',
                  options: categories?.categories,
                  optionKey: 'name',
                  optionLabel: 'label',
                  onChange: (val) => {
                     setCategory(val.category_name);
                     if (val) {
                        getAtt(val.category_name);
                     }
                  },
                  required: true,
                  col: 6,
               },
            ]}
            disablePadding={true}
            showSubmitButton={false}
            showResetButton={false}
         />
         <Card>
            <CardHeader
               title="ویژگی ها"
               action={
                  <div className="flex gap-2">
                     {category && (
                        <>
                           <Button variant="outlined" onClick={() => setShow(1)}>
                              ویژگی جدید
                           </Button>
                           <Button
                              variant="outlined"
                              onClick={() => {
                                 // setAttFields((prev) => [
                                 //    ...prev,
                                 //    {
                                 //       type: 'text',
                                 //       name: `label${(prev.length - 1) / 2 + 1}`,
                                 //       label: 'لیبل',
                                 //       col: 6,
                                 //       required: true,
                                 //    },
                                 //    {
                                 //       type: 'text',
                                 //       name: `value${(prev.length - 1) / 2 + 1}`,
                                 //       label: 'مقدار',
                                 //       col: 6,
                                 //       required: true,
                                 //    },
                                 // ]);
                                 setShow(2);
                              }}
                           >
                              مقدار جدید
                           </Button>
                        </>
                     )}
                  </div>
               }
            />
            <CardContent>
               {
                  show === 1 && category && (
                     <form onSubmit={handleSubmit(handleSubmit1)} noValidate>
                        <InputsGrid control={control} inputs={inputs1} />
                        <div className="flex items-center justify-end gap-1 px-1 py-2">
                           <Button type="submit">ثبت </Button>
                           <Button variant="outlined" onClick={reset}>
                              لغو
                           </Button>
                        </div>
                     </form>
                  )
                  // <SForm formStructure={fields} submitHandler={handleSubmit} disablePadding={true} />
               }
               {show === 2 && category && (
                  <form onSubmit={handleSubmit(handleSubmit2)} noValidate>
                     <InputsGrid control={control} inputs={inputs2} />
                     <div className="flex items-center justify-end gap-1 px-1 py-2">
                        <Button type="submit">ثبت </Button>
                        <Button variant="outlined" onClick={reset}>
                           لغو
                        </Button>
                     </div>
                  </form>
                  // <SForm formStructure={attFields} submitHandler={handleSubmit2} resetOnSubmit={false} disablePadding={true} />
               )}
               <HoverTable
                  title="لیست ویژگی ها"
                  headers={[
                     { label: 'نام', type: 'text', name: 'name' },
                     { label: 'مقادیر', type: 'text', name: 'label' },
                  ]}
                  tableData={attributes}
                  deleteIconOnClick={(val) => {
                     api.delete(`api/attribute/${val.id}`)
                        .then((res) => {
                           notifySuccess('ویژگی با موفقیت حذف شد');
                        })
                        .then((res) => getAtt(category));
                  }}
               />
            </CardContent>
         </Card>
      </div>
   );
};

export default Attribute;
