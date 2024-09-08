import React, { useMemo, useState } from 'react';
import SForm from '@/components/shared/formInputs/SForm';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';

interface Props {
   setActiveStep: () => {};
   col: 6;
   setCategory;
   Name: () => {};
   onSubmit: () => {};
   editPhase: boolean;
   editData: {};
}

const StepOne = ({ setCategoryName, setActiveStep, onSubmit, editPhase, editData }: Props) => {
   const [images, setImages] = useState([]);
   const { data: optionData } = useCategoriesQuery();
   const [formValues, setFormValues] = useState({});

   const allSubCategories = () => {
      let arr = [];
      optionData?.categories.forEach((item) => item.subCategories.forEach((i) => arr.push(i)));
      return arr;
   };

   const fields = useMemo(
      () => [
         {
            label: 'نام محصول (فارسی)',
            col: 6,
            name: 'title',
            type: 'text',
            required: true,
         },
         {
            label: 'اسلاگ (فارسی بدون فاصله)',
            col: 6,
            name: 'slug',
            type: 'text',
            hidden: editPhase,
            required: true,
         },
         {
            label: 'خلاصه محصول',
            col: 6,
            name: 'summary',
            type: 'text',
            required: true,
         },
         {
            label: 'دسته بندی سطح یک',
            col: 6,
            name: 'categoryName1',
            type: 'select',
            options: optionData?.categories || [],
            optionKey: 'name',
            optionLabel: 'label',
            onChange: (val) => setFormValues(val),
            hidden: editPhase,
            required: !editPhase,
         },
         {
            label: 'دسته بندی سطح دو',
            col: 6,
            name: 'categoryName',
            type: 'select',
            options: formValues.categoryName1
               ? optionData?.categories?.find((item) => item.name === formValues.categoryName1)?.subCategories
               : editPhase
               ? allSubCategories()
               : [],
            optionKey: 'name',
            optionLabel: 'label',
            hidden: editPhase,
            required: !editPhase,
         },
         {
            label: 'تعداد موجودی',
            col: 6,
            name: 'quantity',
            type: 'number',
         },
         {
            label: 'قیمت (تومان)',
            col: 6,
            name: 'price',
            type: 'number',
            required: true,
         },
         {
            label: 'تصویر اصلی محصول',
            col: 6,
            name: 'image',
            title: 'عکس محصول را بارگذاری نمایید',
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
            required: !editPhase,
         },
         {
            label: 'سایر تصویر محصول',
            col: 6,
            name: 'image2',
            title: 'عکس محصول را بارگذاری نمایید',
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
         },
         {
            label: 'سایر تصویر محصول',
            col: 6,
            name: 'image3',
            title: 'عکس محصول را بارگذاری نمایید',
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
         },

         {
            label: 'توضیحات',
            col: 6,
            name: 'description',
            type: 'textarea',
            required: true,
         },
      ],
      [formValues, editPhase, optionData]
   );

   return (
      <>
         <SForm
            formStructure={fields}
            submitHandler={(value) => {
               onSubmit({ ...value, images });
               setCategoryName(value.categoryName1);
            }}
            editValues={editData}
            submitButtonText={editPhase ? 'ویرایش محصول' : 'ایجاد محصول'}
         />
         <ul className="list-disc px-5 text-sm font-medium leading-8">
            <li>نام محصولات و اسلاگ باید یکتا و غیرتکراری باشد.</li>
            <li>دقت داشته باشید که همه‌ی قیمت ها به تومان وارد شود.</li>
            <li>
               اسلاگ در واقع همان نام محصول است که به جای فاصله در آن از _ استفاده میشود و برای نمایش در یو آر ال می باشد.(برای مثال اگر اسم
               محصول قهوه فوری است به صورت قهوه_فوری نوشته شود)
            </li>
            <li>فرمت فایل تصویر باید png یا jpg بوده و حجم آن کمتر از 500kb باشد.</li>
         </ul>
      </>
   );
};

export default StepOne;
