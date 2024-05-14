import React, { useEffect, useMemo, useState } from 'react';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import SForm from '@/components/shared/formInputs/SForm';
import api from '../../../services/interceptor';
import { Button, Card, CardContent, CardHeader } from '@mui/material';

const Attribute = () => {
   const [show, setShow] = useState(0);
   const [attributes, setAttributes] = useState([]);
   const { data: categories } = useCategoriesQuery();
   const fields = useMemo(
      () => [
         {
            type: 'text',
            name: 'name',
            label: 'نام ویژگی',
            col: 6,
            required: true,
         },
         {
            type: 'multi_select',
            name: 'categories',
            label: 'دسته بندی ویژگی',
            options: categories?.categories,
            optionKey: 'id',
            optionLabel: 'label',
            col: 6,
            required: true,
         },
      ],
      [categories]
   );
   const [attFields, setAttFields] = useState([
      {
         type: 'text',
         name: 'label1',
         label: 'لیبل',
         col: 6,
         required: true,
      },
      {
         type: 'text',
         name: 'value1',
         label: 'مقدار',
         col: 6,
         required: true,
      },
   ]);
   // const section = useMemo(() => {
   //    const sectionGenerator = (attributes) => {
   //       let result = [];
   //       attributes.forEach((att) => {
   //          let copy = { title: att.name ? att.name : att.label };
   //          if (att.AttributeValue && att.AttributeValue.length) {
   //             copy.content = (
   //                <div>
   //                   {att.AttributeValue.map((i) => (
   //                      <span>{i.label}</span>
   //                   ))}
   //                </div>
   //             );
   //          } else {
   //             copy.content = att.name ? att.name : att.label;
   //          }
   //          result.push(copy);
   //       });
   //       return result;
   //    };
   //    return sectionGenerator(attributes || []);
   // }, [attributes]);
   const handleSubmit = (values) => {
      api.post('api/attribute', values).catch((err) => console.log(err));
   };
   const handleSubmit2 = (values) => {
      let arr = [];
      Object.entries(values).forEach((item, index) => {
         if (values[`label${index + 1}`]) {
            arr.push({ label: values[`label${index + 1}`], value: values[`value${index + 1}`] });
         }
      });
      api.post('api/attribute/value', { values: arr }).catch((err) => console.log(err));
   };
   return (
      <div className="flex flex-col gap-6">
         <Card>
            <CardHeader
               title="ویژگی ها"
               action={
                  <div className="flex gap-2">
                     <Button variant="outlined" onClick={() => setShow(1)}>
                        ویژگی جدید
                     </Button>
                     <Button
                        variant="outlined"
                        onClick={() => {
                           setAttFields((prev) => [
                              ...prev,
                              {
                                 type: 'text',
                                 name: `label${prev.length / 2 + 1}`,
                                 label: 'لیبل',
                                 col: 6,
                                 required: true,
                              },
                              {
                                 type: 'text',
                                 name: `value${prev.length / 2 + 1}`,
                                 label: 'مقدار',
                                 col: 6,
                                 required: true,
                              },
                           ]);
                           setShow(2);
                        }}
                     >
                        مقدار جدید
                     </Button>
                  </div>
               }
            />
            <CardContent>
               {show === 1 && <SForm formStructure={fields} submitHandler={handleSubmit} />}
               {show === 2 && <SForm formStructure={attFields} submitHandler={handleSubmit2} />}
            </CardContent>
         </Card>
         <div>
            <SForm
               formStructure={[
                  {
                     label: 'برای مشاهده ویژگی ها، ابتدا یک دسته بندی را انتخاب کنید',
                     name: 'category_name',
                     type: 'select',
                     options: categories?.categories,
                     optionKey: 'name',
                     optionLabel: 'label',
                     required: true,
                     col: 6,
                  },
               ]}
               submitHandler={(val) => {
                  api.get('api/attribute', {
                     params: { category_name: val.category_name },
                  });
               }}
            />
         </div>
      </div>
   );
};

export default Attribute;
