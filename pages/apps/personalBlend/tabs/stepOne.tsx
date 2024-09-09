import React, { useMemo, useState } from 'react';
import SForm from '@/components/shared/formInputs/SForm';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';

interface Props {
   setActiveStep: () => {};
   setCategoryName: () => {};
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
   console.log(editPhase);

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
            name: 'summary',
            col: 6,
            type: 'text',
            required: true,
         },
         {
            label: 'دسته بندی سطح یک',
            name: 'categoryName1',
            col: 6,
            type: 'select',
            options: optionData?.categories || [],
            optionKey: 'name',
            optionLabel: 'label',
            onChange: (val) => setFormValues(val),
            // hidden: editPhase,
            required: !editPhase,
         },
         {
            label: 'دسته بندی سطح دو',
            name: 'categoryName',
            col: 6,
            type: 'select',
            options: formValues.categoryName1
               ? optionData?.categories?.find((item) => item.name === formValues.categoryName1)?.subCategories
               : editPhase
               ? allSubCategories()
               : [],
            optionKey: 'name',
            optionLabel: 'label',
            // hidden: editPhase,
            required: !editPhase,
         },
         {
            label: 'تعداد موجودی',
            name: 'quantity',
            col: 6,
            type: 'number',
         },
         {
            label: 'قیمت بر اساس یک کیلوگرم (تومان)',
            name: 'price',
            col: 6,
            type: 'number',
            required: true,
         },
         {
            label: 'تصویر اصلی محصول',
            name: 'image',
            title: 'عکس محصول را بارگذاری نمایید',
            col: 6,
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
            required: !editPhase,
         },
         {
            label: 'سایر تصویر محصول',
            name: 'image2',
            title: 'عکس محصول را بارگذاری نمایید',
            col: 6,
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
         },
         {
            label: 'سایر تصویر محصول',
            name: 'image3',
            title: 'عکس محصول را بارگذاری نمایید',
            col: 6,
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
         },
         {
            label: 'توضیحات',
            name: 'description',
            col: 6,
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
               onSubmit({ ...value, images, bulk_cargo: true });
               setCategoryName(value.categoryName1);
            }}
            editValues={editData}
            submitButtonText={editPhase ? 'ویرایش محصول' : 'ایجاد محصول'}
         />
         <ul className="list-disc px-5 text-sm font-medium leading-8">
            <li>نام محصولات و اسلاگ باید یکتا و غیرتکراری باشد.</li>
            <li>دقت داشته باشید که همه‌ی قیمت ها به تومان و براساس یک کیلوگرم وارد شود.</li>
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
