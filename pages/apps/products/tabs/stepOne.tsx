import React, { useEffect, useMemo, useState } from 'react';
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

   const fields = useMemo(
      () => [
         {
            label: 'نام محصول',
            name: 'title',
            type: 'text',
            required: true,
         },
         // {
         //    label: 'مدل',
         //    name: 'model',
         //    type: 'text',
         //    required: true,
         // },
         {
            label: 'slug',
            name: 'slug',
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
            display: !editPhase,
            required: !editPhase,
         },
         {
            label: 'دسته بندی سطح دو',
            name: 'categoryName',
            type: 'select',
            options: optionData?.categories?.find((item) => item.id === formValues.categoryName1)?.subCategories || [],
            optionId: 'id',
            optionLabel: 'label',
            display: !editPhase,
            required: !editPhase,
         },
         // {
         //    label: 'دسته بندی سطح سه',
         //    name: 'categoryName',
         //    type: 'select',
         //    options:
         //       optionData?.data
         //          ?.find((item) => item.id === formValues.categoryName1)
         //          ?.subCategories?.find((item) => item.id === formValues.categoryName2)?.subCategories || [],
         //    optionId: 'name',
         //    optionLabel: 'label',
         //    display: !editPhase,
         //    required: !editPhase,
         // },
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
            name: 'image',
            title: 'عکس محصول را بارگذاری نمایید',
            type: 'file',
            label: 'img',
            multiple: true,
            customOnChange: (name, value) => setImages(value),
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
            setCategoryName(value.categoryName);
            onSubmit({ ...value, images });
         }}
         editValues={editData}
         getValues={(val) => setFormValues(val)}
         buttons={[
            {
               label: editPhase ? 'ثبت' : 'بعدی',
               type: 'submit',
            },
         ]}
      />
   );
};

export default StepOne;
