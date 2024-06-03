import React, { useEffect, useState } from 'react';
import SForm from '@/components/shared/formInputs/SForm';
import { useCategoriysAttributesQuery } from '@/services/api/getAttributesQuery';

interface Props {
   categoryName: string;
   onSubmit: () => {};
}

const StepTwo = ({ categoryName, onSubmit }: Props) => {
   const [formStructure, setFormStructure] = useState([]);
   const { data: categoryOptions } = useCategoriysAttributesQuery(categoryName);
   useEffect(() => {
      if (categoryOptions && !formStructure.length) {
         let form = [];
         Object.entries(categoryOptions).forEach(([key, value]) => {
            form.push({
               label: value?.name,
<<<<<<< HEAD
               name: value?.id.toString(),
               type: 'select',
               options: value?.AttributeValue || [],
               optionKey: 'id',
               optionLabel: 'label',
=======
               name: value?.id,
               type: 'select',
               options: value?.values || [],
               optionKey: 'id',
               optionLabel: 'label',
               // required: value?.required,
>>>>>>> 5a6ac8158bf5df21a1fccda7bde47e1e80aadd12
            });
         });
         setFormStructure(form);
      }
   }, [categoryOptions]);
   return (
      <SForm
         formStructure={formStructure}
         submitHandler={(value) => {
            let arr = [];
            Object.entries(value).forEach(([key, value]) => {
               arr.push(value);
            });
            onSubmit(arr);
         }}
         // editValues={editValues}
      />
   );
};

export default StepTwo;
