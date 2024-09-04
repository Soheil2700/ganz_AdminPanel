import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PermissionChecker from '@/components/permissionChecker';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import api from '@/services/interceptor';
import Modal from '@/components/shared/modal';
import Accordion from '@/components/shared/Accordion';
import Button from '@/components/shared/Button';
import SForm from '@/components/shared/formInputs/SForm';
import IconPlus from '@/components/Icon/IconPlus';
import { notifySuccess } from '@/components/shared/notify/SNotify';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';

const Category = () => {
   const { data = { data: [] }, mutate } = useCategoriesQuery();
   const [openModal, setOpenModal] = useState(false);
   const [active, setActive] = useState(1);
   const [formValues, setFormValues] = useState({});
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setPageTitle('دسته بندی ها'));
   }, []);
   const section = useMemo(() => {
      const sectionGenerator = (categories) => {
         let result = [];
         categories.forEach((cat) => {
            let catCopy = { title: cat.label };
            if (cat.subCategories && cat.subCategories.length) {
               catCopy.content = <Accordion accordionContent={sectionGenerator(cat.subCategories)} />;
            } else {
               catCopy.content = cat.label;
            }
            result.push(catCopy);
         });
         return result;
      };
      return sectionGenerator(data?.categories || []);
   }, [data]);

   const fields = useMemo(
      () => [
         {
            label: 'نام دسته بندی (انگلیسی)',
            name: 'name',
            type: 'text',
            required: true,
            col: 4,
         },
         {
            label: 'لیبل دسته بندی(فارسی)',
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
            optionKey: 'id',
            optionLabel: 'label',
            // required: true,
            col: 4,
         },
      ],
      [data, formValues]
   );

   const onSubmit = useCallback((values) => {
      api.post('api/category', values)
         .then((res) => {
            mutate((prvs) => {
               return { ...prvs, data: [...prvs.categories, res.data.categories] };
            });
            notifySuccess('دسته بندی با موفقیت ایجاد شد');
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
               />
            }
         />
      </PermissionChecker>
   );
};

export default Category;
