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

   let arr = [];
   let accordionContent = [];
   data?.data.map((item) => {
      arr.push({ ...item, title: item.label, disabled: true });
      item.subCategories.map((sub) => arr.push({ ...sub, title: sub.label, disabled: false }));
      accordionContent.push({ title: item.label });
   });

   const section = useMemo(() => {
      const sectionGenerator = (categories) => {
         let result = [];
         categories.forEach((cat) => {
            let catCopy = { title: cat.label };
            console.log(cat.level, cat.label, cat.subCategories);

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
      return sectionGenerator(data?.data || []);
   }, [data]);

   const fields = useMemo(
      () => [
         {
            label: 'نام دسته بندی',
            name: 'name',
            type: 'text',
            required: true,
         },
         {
            label: 'لیبل دسته بندی',
            name: 'label',
            type: 'text',
            required: true,
         },
         //  {
         //     label: 'زیردسته بندی',
         //     name: 'hasParent',
         //     type: 'checkbox',
         //  },
         {
            label: 'سطح دسته بندی',
            name: 'level',
            type: 'select',
            options: [
               { id: 1, label: 'سطح یک' },
               { id: 2, label: 'سطح دو' },
               { id: 3, label: 'سطح سه' },
            ],
            optionId: 'id',
            optionLabel: 'label',
            required: true,
         },
         {
            label: 'دسته بندی سطح یک',
            name: 'ParentCategoryId1',
            type: 'select',
            options: data.data,
            optionId: 'id',
            optionLabel: 'label',
            display: formValues?.level === 2 || formValues?.level === 3,
         },
         {
            label: 'دسته بندی سطح دو',
            name: 'ParentCategoryId2',
            type: 'select',
            options: data.data?.find((i) => i.id === formValues?.ParentCategoryId1)?.subCategories,
            optionId: 'id',
            optionLabel: 'label',
            display: formValues?.level === 3,
         },
      ],
      [data, formValues]
   );
   console.log(openModal);

   const onSubmit = useCallback((values) => {
      api.post('admin/api/category', {
         ...values,
         ParentCategoryId: values.level === 2 ? +values.ParentCategoryId1 : values.level === 3 ? +values.ParentCategoryId2 : undefined,
      })
         .then((res) => {
            mutate((prvs) => {
               return { ...prvs, data: [...prvs.data, res.data.data] };
            });
            notifySuccess('ذسته بندی با موفقیت ایجاد شد');
            setOpenModal(false);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <PermissionChecker roles={['ADMIN']}>
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
      </PermissionChecker>
   );
};

export default Category;
