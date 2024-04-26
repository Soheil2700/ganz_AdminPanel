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
               label: value.attribute?.name,
               name: value.attribute?.id,
               type: value.attribute?.attributeType?.toLowerCase(),
               options: value.attribute?.AttributeValue || [],
               optionId: 'id',
               optionLabel: 'label',
               required: value.attribute?.required,
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
