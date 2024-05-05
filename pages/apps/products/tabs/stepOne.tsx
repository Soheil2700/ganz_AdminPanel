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
            optionId: 'id',
            optionLabel: 'label',
            onChange: (val) => setFormValues(val),
            display: !editPhase,
            required: !editPhase,
         },
         {
            label: 'دسته بندی سطح دو',
            name: 'categoryName',
            type: 'select',
            options: formValues.value
               ? optionData?.categories?.find((item) => item.id === formValues.value)?.subCategories
               : editPhase
               ? allSubCategories()
               : [],
            optionId: 'name',
            optionLabel: 'label',
            display: !editPhase,
            required: !editPhase,
         },
         {
            label: 'تعداد موجودی',
            name: 'quantity',
            type: 'number',
         },
         {
            label: 'قیمت',
            name: 'price',
            type: 'number',
            required: true,
         },
         {
            label: 'تصویر محصول',
            name: 'image',
            title: 'عکس محصول را بارگذاری نمایید',
            type: 'file',
            multiple: true,
            customOnChange: (value) => {
               setImages(value);
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

   return <SForm formStructure={fields} submitHandler={(value) => onSubmit({ ...value, images })} editValues={editData} />;
};

export default StepOne;
