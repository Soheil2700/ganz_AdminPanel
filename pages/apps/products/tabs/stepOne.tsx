import React, { useEffect, useState } from 'react';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import { useProductsQuery } from '@/services/api/getProductsQuery';
import InputsGrid from '../../../../components/shared/formInputs/InputsGrid';
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import FileInput from '../../../../components/shared/formInputs/FileInput';
import { notifyError, notifySuccess } from '@/components/shared/notify/SNotify';
import api from '@/services/interceptor';

interface Props {
   editPhase: boolean;
   setOpenModal: any;
   editData: {};
   setPage: any;
}

const StepOne = ({ setOpenModal, editPhase, editData, setPage }: Props) => {
   const [images, setImages] = useState([]);
   const { data: optionData } = useCategoriesQuery();
   const { mutate } = useProductsQuery(1);

   const {
      control,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors },
   } = useForm();

   const sendData = (values: any) => {
      let arr = [];
      arr = Object.entries(values).map(([key, val]) => ({ id: +val }));
      if (editPhase) {
         if (!values.image) {
            delete values.images;
         } else {
            const formData = new FormData();
            Array.from(values.images).forEach((i) => formData.append('image', i));
            api.post(`api/product/${editData.id}/image`, formData)
               .then((response) => {
                  mutate((prvs) => {
                     const products = [...prvs.products];
                     products.push({ ...editData, images: response.data.data });
                     return { total: prvs.total + 1, products };
                  });
               })
               .catch((err) => {});
         }
         delete values.cover;
         delete values.grind_types;
         api.patch(`api/product/${editData.id}`, {
            ...values,
            quantity: +values.quantity,
            price: +values.price,
         })
            .then((res) => {
               mutate();
               setOpenModal(false);
               notifySuccess('محصول با موفقیت ویرایش شد');
               setPage(1);
            })
            .catch((res) => notifyError('خطایی رخ داده است'));
      } else {
         api.post('api/product', {
            ...values,
            quantity: +values?.quantity,
            price: +values?.price,
            bulk_cargo: false,
            step: 1,
         })
            .then((res) => {
               if (values.images) {
                  const formData = new FormData();
                  Array.from(values.images).forEach((i) => formData.append('image', i));
                  api.post(`api/product/${res.data.product.id}/image`, formData)
                     .then((response) => {
                        mutate((prvs) => {
                           const products = [...prvs.products];
                           products.push({ ...res.data, images: response.data.data });
                           return { total: prvs.total + 1, products };
                        });
                     })
                     .catch((err) => {
                        notifyError('خطایی در ارسال تصاویر رخ داده است');
                     });
               }
               notifySuccess('محصول با موفقیت ایجاد شد');
               reset();
               setPage(1);
            })
            .catch((res) => notifyError('خطایی رخ داده است'));
      }
   };

   const inputs = [
      {
         label: 'نام محصول (فارسی)',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'title',
         type: 'text',
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9 ]{4,}$/,
               message: 'حداقل چهار کاراکتر و فقط اعداد و حروف فارسی و فاصله مجاز است.',
            },
         },
      },
      {
         label: 'اسلاگ (فارسی بدون فاصله)',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'slug',
         type: 'text',
         hide: editPhase,
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9_]{4,}$/,
               message: "حداقل چهار کاراکتر و فقط اعداد و حروف فارسی و '_' مجاز است.",
            },
         },
      },
      {
         label: 'خلاصه محصول',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'summary',
         type: 'text',
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^.{5,70}$/,
               message: 'حداقل 5 کاراکتر و حداکثر 70 کاراکتر.',
            },
         },
      },
      {
         label: 'دسته بندی سطح یک',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'categoryName1',
         type: 'select',
         required: true,
         rules: { required: 'پر کردن این فیلد الزامی میباشد.' },
         options: optionData?.categories?.map((item) => ({ ...item, id: item.name })) || [],
      },
      {
         label: 'دسته بندی سطح دو',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'categoryName',
         type: 'select',
         required: true,
         rules: { required: 'پر کردن این فیلد الزامی میباشد.' },
         disabled: !watch('categoryName1'),
         options: watch('categoryName1')
            ? optionData?.categories
                 ?.find((item) => item.name === watch('categoryName1'))
                 ?.subCategories?.map((item) => ({ ...item, id: item.name }))
            : [],
      },
      {
         label: 'تعداد موجودی',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'quantity',
         type: 'number',
      },
      {
         label: 'قیمت (تومان)',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'price',
         type: 'number',
         required: true,
         rules: { required: 'پر کردن این فیلد الزامی میباشد.' },
      },
      {
         label: 'تصویر اصلی محصول',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'image',
         type: 'component',
         component: (
            <Grid item xl={4} lg={6} md={12} sm={12}>
               {' '}
               <FileInput
                  customOnChange={(value) => {
                     setImages((prev) => [...prev, value[0]]);
                  }}
                  control={control}
                  error={errors['image']}
                  id="image"
                  name="image"
                  label="تصویر اصلی محصول"
                  required={!editPhase}
               />
            </Grid>
         ),
      },
      {
         label: 'سایر تصویر محصول',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'image2',
         type: 'component',
         component: (
            <Grid item xl={4} lg={6} md={12} sm={12}>
               {' '}
               <FileInput
                  customOnChange={(value) => {
                     setImages((prev) => [...prev, value[0]]);
                  }}
                  control={control}
                  error={errors['image2']}
                  id="image2"
                  name="image2"
                  label="سایر تصویر محصول"
               />
            </Grid>
         ),
      },
      {
         label: 'سایر تصویر محصول',
         col: { xl: 4, lg: 6, md: 12 },
         name: 'image3',
         type: 'component',
         component: (
            <Grid item xl={4} lg={6} md={12} sm={12}>
               <FileInput
                  customOnChange={(value) => {
                     setImages((prev) => [...prev, value[0]]);
                  }}
                  control={control}
                  error={errors['image3']}
                  id="image3"
                  name="image3"
                  label="سایر تصویر محصول"
               />
            </Grid>
         ),
      },

      {
         label: 'توضیحات',
         col: { xl: 12, lg: 12, md: 12 },
         name: 'description',
         type: 'textarea',
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^.{5,500}$/,
               message: 'حداقل 5 کاراکتر و حداکثر 500 کاراکتر.',
            },
         },
      },
   ];

   useEffect(() => {
      if (editData && editPhase) {
         console.log(editData);
         setValue('title', editData.title);
         setValue('summary', editData.summary);
         setValue('categoryName', editData.categoryName);
         setValue('quantity', editData.quantity);
         setValue('price', editData.price);
         setValue('description', editData.description);
      }
   }, [editPhase, editData]);

   return (
      <>
         <form onSubmit={handleSubmit((values) => sendData({ ...values, images }))} noValidate>
            <InputsGrid control={control} inputs={inputs} />
            <div className="flex items-center justify-end gap-1 px-1 py-2">
               <Button type="submit">{editPhase ? 'ویرایش محصول' : 'ایجاد محصول'} </Button>{' '}
               <Button variant="outlined" onClick={reset}>
                  لغو
               </Button>
            </div>
            <ul className="list-disc px-5 text-sm font-medium leading-8">
               <li>نام محصولات و اسلاگ باید یکتا و غیرتکراری باشد.</li>
               <li>دقت داشته باشید که همه‌ی قیمت ها به تومان وارد شود.</li>
               <li>
                  اسلاگ در واقع همان نام محصول است که به جای فاصله در آن از _ استفاده میشود و برای نمایش در یو آر ال می باشد.(برای مثال اگر
                  اسم محصول قهوه فوری است به صورت قهوه_فوری نوشته شود)
               </li>
               <li>فرمت فایل تصویر باید png یا jpg بوده و حجم آن کمتر از 500kb باشد.</li>
            </ul>
         </form>
      </>
   );
};

export default StepOne;
