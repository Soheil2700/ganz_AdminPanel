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
            console.log(value);
            form.push({
               label: value?.name,
               name: value?.id,
               type: 'select',
               options: value?.values || [],
               optionKey: 'id',
               optionLabel: 'label',
               // required: value?.required,
            });
         });
         setFormStructure(form);
      }
   }, [categoryOptions]);
   return (
      <SForm
         formStructure={formStructure}
         submitHandler={onSubmit}
         // editValues={editValues}
      />
   );
};

export default StepTwo;
