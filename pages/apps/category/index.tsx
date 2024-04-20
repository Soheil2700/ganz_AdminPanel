import React, { useCallback, useMemo, useState } from 'react';
import PermissionChecker from '@/components/permissionChecker';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import api from '@/services/interceptor';
import Modal from '@/components/shared/modal';
import Accordion from '@/components/shared/Accordion';
import Button from '@/components/shared/Button';
import SForm from '@/components/shared/formInputs/SForm';
import IconPlus from '@/components/Icon/IconPlus';
import { notifySuccess } from '@/components/shared/notify/SNotify';

const Category = () => {
   const { data = { data: [] }, mutate } = useCategoriesQuery();
   const [openModal, setOpenModal] = useState(false);
   const [active, setActive] = useState(1);
   const [formValues, setFormValues] = useState({});

   // let arr = [];
   // let accordionContent = [];

   // data?.categories?.map((item) => {
   //    arr.push({ ...item, title: item.label, disabled: true });
   //    item.subCategories.map((sub) => arr.push({ ...sub, title: sub.label, disabled: false }));
   //    accordionContent.push({ title: item.label });
   // });

   const section = useMemo(() => {
      const sectionGenerator = (categories) => {
         let result = [];
         categories.forEach((cat) => {
            let catCopy = { title: cat.label };
            if (cat.subCategories && cat.subCategories.length) {
               //    console.log('if');
               catCopy.content = <Accordion accordionContent={sectionGenerator(cat.subCategories)} />;
            } else {
               //    console.log('else');
               catCopy.content = cat.label;
               //    catCopy.content = <div>{cat.label}</div>;
            }
            // console.log(catCopy.content);
            result.push(catCopy);
         });
         return result;
      };
      return sectionGenerator(data?.categories || []);
   }, [data]);

   const fields = useMemo(
      () => [
         {
            label: 'نام دسته بندی',
            name: 'name',
            type: 'text',
            required: true,
            col: 4,
         },
         {
            label: 'لیبل دسته بندی',
            name: 'label',
            type: 'text',
            required: true,
            col: 4,
         },
         {
            label: 'دسته بندی بالاتر',
            name: 'ParentCategoryId',
            type: 'select',
            options: data?.categories || [],
            optionId: 'id',
            optionLabel: 'label',
            required: true,
            col: 4,
         },
      ],
      [data, formValues]
   );

   const onSubmit = useCallback((values) => {
      api.post('api/category', values)
         .then((res) => {
            mutate((prvs) => {
               return { ...prvs, data: [...prvs.data, res.data.data] };
            });
            notifySuccess('دسته بندی با موفقیت ایجاد شد');
            setOpenModal(false);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      // <PermissionChecker roles={['ADMIN']}>
      <>
         <div className="flex flex-col gap-7">
            <Button label="تعریف دسته بندی جدید" icon={<IconPlus />} onClick={() => setOpenModal(true)} />
            <Accordion accordionContent={section} active={active} setActive={setActive} />
         </div>
         <Modal
            open={openModal}
            setOpen={setOpenModal}
            title="تعریف دسته بندی"
            size="large"
            content={
               <SForm
                  //   formClassName="!grid-cols-1"
                  formStructure={fields}
                  submitHandler={onSubmit}
                  getValues={(val) => setFormValues(val)}
                  buttons={[
                     {
                        label: 'ایجاد',
                        type: 'submit',
                     },
                  ]}
               />
            }
         />
      </>
      // </PermissionChecker>
   );
};

export default Category;
