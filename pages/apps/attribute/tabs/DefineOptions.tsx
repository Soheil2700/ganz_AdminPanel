import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SForm from '@/components/shared/formInputs/SForm';

interface Props {
   onDefineOptions: () => {};
   options: [];
   setoptions: () => {};
   setStep: () => {};
   categories: [];
   handleSubmit: () => {};
}

const DefineOptions = ({ onDefineOptions = () => {}, options = [], setoptions = () => {}, setStep, categories, handleSubmit }: Props) => {
   const [catFields, setCatFields] = useState({ level1: [], level2: [], level3: [] });
   const [formValues, setFormValues] = useState({});
   const fields = useMemo(
      () => [
         {
            name: 'label',
            label: 'ليبل',
            type: 'text',
            col: 4,
         },
         {
            name: 'value',
            label: 'مقدار',
            type: 'text',
            col: 4,
         },
         {
            name: 'categoryName1',
            label: 'دسته بندی های سطح اول',
            type: 'select',
            options: catFields.level1,
            optionId: 'id',
            optionLabel: 'label',
            required: true,
            col: 4,
         },
         {
            name: 'categoryName2',
            label: 'دسته بندی های سطح دوم',
            type: 'select',
            options: catFields?.level1?.find((item) => item.id === formValues?.categoryName1)?.subCategories || [],
            optionId: 'id',
            optionLabel: 'label',
            required: true,
            isDisabled: !formValues?.categoryName1,
            col: 4,
         },
         {
            name: 'categoryNames',
            label: 'دسته بندی های سطح سوم',
            type: 'multi_select',
            options: catFields.level2?.find((item) => item.id === formValues?.categoryName2)?.subCategories || [],
            optionId: 'name',
            optionLabel: 'label',
            // required: true,
            isDisabled: !formValues?.categoryName2,
            col: 4,
         },
      ],
      [catFields, formValues]
   );
   const handleOpts = (values) => {
      setoptions((prev) => ({ ...prev, values: [...prev.values, values] }));
      handleSubmit(values);
   };

   const createOptions = async () => {
      let level1 = [];
      let level2 = [];
      let level3 = [];
      await categories.map((item) => {
         level1.push(item);
         if (item.subCategories) {
            item.subCategories.map((sub) => {
               level2.push(sub);
               if (sub.subCategories) {
                  sub.subCategories.map((i) => level3.push(i));
               }
            });
         }
      });
      setCatFields({ level1, level2, level3 });
   };

   console.log(formValues, catFields?.level2);

   useEffect(() => {
      if (categories.length) {
         createOptions();
      }
   }, [categories]);

   return (
      <div className="mx-4 mt-20">
         <SForm
            formStructure={fields}
            submitHandler={handleOpts}
            getValues={(val) => setFormValues(val)}
            buttons={[
               {
                  label: 'اضافه كردن',
                  type: 'submit',
               },
            ]}
         />
      </div>
   );
};

export default DefineOptions;
