import React, { useMemo, useState } from 'react';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import SForm from '@/components/shared/formInputs/SForm';
import { useAttributesQuery } from '@/services/api/getAttributesQuery';
import Accordion from '@/components/shared/Accordion';
import api from '../../../services/interceptor';

const Attribute = () => {
   const { data: categories } = useCategoriesQuery();
   const { data: attributes } = useAttributesQuery();
   const fields = useMemo(
      () => [
         {
            type: 'text',
            name: 'name',
            label: 'نام ویژگی',
            required: true,
         },
         {
            type: 'multi_select',
            name: 'categories',
            label: 'دسته بندی ویژگی',
            options: categories?.categories,
            optionId: 'id',
            optionLabel: 'label',
            // required: true,
         },
         {
            name: 'label',
            label: 'ليبل',
            type: 'text',
            required: true,
         },
         {
            name: 'value',
            label: 'مقدار',
            type: 'text',
            required: true,
         },
      ],
      [categories]
   );
   const section = useMemo(() => {
      const sectionGenerator = (attributes) => {
         let result = [];
         attributes.forEach((att) => {
            let copy = { title: att.name ? att.name : att.label };
            if (att.AttributeValue && att.AttributeValue.length) {
               copy.content = (
                  <div>
                     {att.AttributeValue.map((i) => (
                        <span>{i.label}</span>
                     ))}
                  </div>
               );
            } else {
               copy.content = att.name ? att.name : att.label;
            }
            result.push(copy);
         });
         return result;
      };
      return sectionGenerator(attributes || []);
   }, [attributes]);
   const handleSubmit = (values) => {
      const categories = values.categories.map((i) => i.value);
      api.post('api/attribute', { ...values, values: [{ label: values.label, value: values.value }], categories }).catch((err) =>
         console.log(err)
      );
   };
   return (
      <div className="flex flex-col gap-6">
         <SForm formStructure={fields} submitHandler={handleSubmit} formClassName="p-4" />
         <div>
            <Accordion accordionContent={section} />
         </div>
      </div>
   );
};

export default Attribute;
