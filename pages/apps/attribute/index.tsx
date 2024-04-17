import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import { useRouter } from 'next/router';
import api from '@/services/interceptor';
import IconEdit from '@/components/Icon/IconEdit';
import IconLayout from '@/components/Icon/IconLayout';
import DefineOptions from './tabs/DefineOptions';
import { AttributeCategories, AttributeDataType, AttributeTypes } from '@/assets/static/enums';
import Stepper from '@/components/shared/Stepper';
import SForm from '@/components/shared/formInputs/SForm';
import { useAttributesQuery } from '@/services/api/getAttributesQuery';
import Accordion from '@/components/shared/Accordion';

const Attribute = () => {
   const { data: categories = { data: [] } } = useCategoriesQuery();
   const { data: attributes } = useAttributesQuery();
   const [values, setValues] = useState({});
   const fields = useMemo(
      () => [
         {
            type: 'text',
            name: 'name',
            label: 'نام ویژگی',
            required: true,
         },
         {
            type: 'select',
            name: 'attributeType',
            options: AttributeTypes,
            optionId: 'key',
            optionLabel: 'value',
            label: 'نوع ویژگی',
         },
         {
            type: 'select',
            name: 'attributeCategory',
            label: 'دسته بندی ویژگی',
            options: AttributeCategories,
            optionId: 'key',
            optionLabel: 'value',
         },
         {
            type: 'select',
            name: 'attributeDataType',
            label: 'نوع داده ویژگی',
            options: values.attributeType === 'CHECK' ? AttributeDataType.filter((i) => i.key === 'BOOLEAN') : AttributeDataType,
            optionId: 'key',
            optionLabel: 'value',
         },
         {
            type: 'checkbox',
            name: 'required',
            label: 'اجباري',
         },
         //   {
         //     // type: "multi-select",
         //     type: "select",
         //     name: "categoryNames",
         //     label: "تخصیص به دسته بندی",
         //     options: categories?.data || [],
         //     optionId: "name",
         //     optionLabel: "label",
         //   },
         {
            type: 'checkbox',
            name: 'use_in_filter',
            label: 'استفاده در فیلتر',
         },
         {
            type: 'checkbox',
            name: 'stock_dependent',
            label: 'وابستگی موجودی به ویژگی',
            disabled: values.attributeType === 'MULTI_SELECT',
         },
      ],
      [values]
   );
   const [data, setData] = useState({ values: [], categoryNames: [] });
   const [step, setStep] = useState(1);

   const onSubmit = useCallback((values) => {
      setStep(2);
      setData((prev) => ({ ...prev, ...values }));
   }, []);

   const router = useRouter();

   const handleSubmit = (val) => {
      api.post('admin/api/attribute', { ...data, ...val, categoryNames: val.categoryNames.map((i) => i.value) })
         .then((res) => {
            // router.push('/app/attribute');
         })
         .catch((err) => console.log(err));
   };

   console.log(categories);

   return (
      <div className="flex flex-col gap-6">
         <Stepper
            activeStep={step}
            setActiveStep={setStep}
            hideButtons={true}
            steps={[
               {
                  label: 'تعریف ویژگی',
                  icon: <IconEdit />,
                  content: (
                     <div className="mx-4 mt-20">
                        <SForm
                           formStructure={fields}
                           submitHandler={onSubmit}
                           buttons={[{ label: 'مرحله ي بعد', type: 'submit' }]}
                           getValues={(val) => {
                              setValues(val);
                           }}
                        />
                     </div>
                  ),
               },
               {
                  label: 'تعريف مقادير',
                  icon: <IconLayout />,
                  content: (
                     <DefineOptions
                        options={data.values || []}
                        setoptions={setData}
                        setStep={setStep}
                        categories={categories.data}
                        handleSubmit={handleSubmit}
                     />
                  ),
               },
            ]}
         />
         <div>
            {attributes?.map((item) => (
               <Accordion
                  accordionContent={[
                     {
                        title: item.name,
                        content: (
                           <div className="flex justify-around">
                              <p>دسته بندی ویژگی: {AttributeCategories.find((i) => i.key === item.attributeCategory)?.value}</p>
                              <p>نوع داده ویژگی: {AttributeDataType.find((i) => i.key === item.attributeDataType)?.value}</p>
                              <p>نوع ویژگی: {AttributeTypes.find((i) => i.key === item.attributeType)?.value}</p>
                           </div>
                        ),
                     },
                  ]}
               />
            ))}
         </div>
      </div>
   );
};

export default Attribute;
