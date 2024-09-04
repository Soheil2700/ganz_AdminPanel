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
            label: 'نام محصول',
            name: 'title',
            type: 'text',
            required: true,
         },
         {
            label: 'slug',
            name: 'slug',
            type: 'text',
            required: true,
         },
         {
            label: 'خلاصه محصول',
            name: 'summary',
            type: 'text',
            required: true,
         },
         {
            label: 'دسته بندی سطح یک',
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
            name: 'quantity',
            type: 'number',
         },
         {
            label: 'قیمت بر اساس یک کیلوگرم',
            name: 'price',
            type: 'number',
            required: true,
         },
         {
            label: 'تصویر اصلی محصول',
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
            name: 'image3',
            title: 'عکس محصول را بارگذاری نمایید',
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
         },
         {
            label: 'سایر تصویر محصول',
            name: 'image4',
            title: 'عکس محصول را بارگذاری نمایید',
            type: 'file',
            customOnChange: (value) => {
               setImages((prev) => [...prev, value[0]]);
            },
            disabled: editPhase,
         },

         {
            label: 'توضیحات',
            name: 'description',
            type: 'textarea',
            required: true,
         },
      ],
      [formValues, editPhase, optionData]
   );

   return (
      <SForm
         formStructure={fields}
         submitHandler={(value) => {
            onSubmit({ ...value, images, bulk_cargo: true });
            setCategoryName(value.categoryName1);
         }}
         editValues={editData}
      />
   );
};

export default StepOne;
