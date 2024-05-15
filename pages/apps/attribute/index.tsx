import React, { useEffect, useMemo, useState } from 'react';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import SForm from '@/components/shared/formInputs/SForm';
import api from '../../../services/interceptor';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import HoverTable from '../../../components/shared/tables/hoverTable';
import { notifySuccess } from '../../../components/shared/notify/SNotify';
import { useCategoriysAttributesQuery } from '../../../services/api/getAttributesQuery';

const Attribute = () => {
   const [category, setCategory] = useState('');
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
   const [attFields, setAttFields] = useState([]);
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
   const getAtt = (category_name) => {
      api.get('api/attribute', {
         params: { category_name },
      }).then((res) => {
         let data = res.data.attributes.map((item) => {
            const label = item.AttributeValue.map((i) => i.label).join('، ');
            return { ...item, label };
         });
         setAttributes(data);
      });
   };
   const handleSubmit = (values) => {
      api.post('api/attribute', { ...values, values: [] }).catch((err) => console.log(err));
   };
   const handleSubmit2 = (values) => {
      let attributeId = values.attributeId;
      delete values.attributeId;
      let arr = [];
      Object.entries(values).forEach((item, index) => {
         if (values[`label${index + 1}`]) {
            arr.push({ label: values[`label${index + 1}`], value: values[`value${index + 1}`] });
         }
      });
      api.post('api/attribute/value', { attributeId, values: arr }).catch((err) => console.log(err));
   };
   useEffect(() => {
      setAttFields([
         {
            name: 'attributeId',
            label: 'ویژگی',
            type: 'select',
            options: attributes,
            optionKey: 'id',
            optionLabel: 'name',
            required: true,
            col: 12,
         },
         {
            type: 'text',
            name: `label1`,
            label: 'لیبل',
            col: 6,
            required: true,
         },
         {
            type: 'text',
            name: `value1`,
            label: 'مقدار',
            col: 6,
            required: true,
         },
      ]);
   }, [attributes]);
   return (
      <div className="flex flex-col gap-6">
         <Card>
            <CardHeader
               title="ویژگی ها"
               action={
                  <div className="flex gap-2">
                     {category && (
                        <>
                           <Button variant="outlined" onClick={() => setShow(1)}>
                              ویژگی جدید
                           </Button>
                           <Button
                              variant="outlined"
                              onClick={() => {
                                 // setAttFields((prev) => [
                                 //    ...prev,
                                 //    {
                                 //       type: 'text',
                                 //       name: `label${(prev.length - 1) / 2 + 1}`,
                                 //       label: 'لیبل',
                                 //       col: 6,
                                 //       required: true,
                                 //    },
                                 //    {
                                 //       type: 'text',
                                 //       name: `value${(prev.length - 1) / 2 + 1}`,
                                 //       label: 'مقدار',
                                 //       col: 6,
                                 //       required: true,
                                 //    },
                                 // ]);
                                 setShow(2);
                              }}
                           >
                              مقدار جدید
                           </Button>
                        </>
                     )}
                  </div>
               }
            />
            <CardContent>
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
                  resetOnSubmit={false}
                  submitHandler={(val) => {
                     setCategory(val.category_name);
                     getAtt(val.category_name);
                  }}
                  resetHandler={() => setCategory('')}
               />
               {show === 1 && category && <SForm formStructure={fields} submitHandler={handleSubmit} />}
               {show === 2 && category && <SForm formStructure={attFields} submitHandler={handleSubmit2} resetOnSubmit={false} />}
               <HoverTable
                  title="لیست ویژگی ها"
                  headers={[
                     { label: 'نام', type: 'text', name: 'name' },
                     { label: 'مقادیر', type: 'text', name: 'label' },
                  ]}
                  tableData={attributes}
                  deleteIconOnClick={(val) => {
                     api.delete(`api/attribute/${val.id}`)
                        .then((res) => {
                           notifySuccess('ویژگی با موفقیت حذف شد');
                        })
                        .then((res) => getAtt(category));
                  }}
               />
            </CardContent>
         </Card>
      </div>
   );
};

export default Attribute;
