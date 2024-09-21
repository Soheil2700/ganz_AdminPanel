import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PermissionChecker from '@/components/permissionChecker';
import { useCategoriesQuery } from '@/services/api/getCategoriesQuery.api';
import api from '@/services/interceptor';
import Modal from '@/components/shared/modal';
import Accordion from '@/components/shared/Accordion';
import Button from '@/components/shared/Button';
import IconPlus from '@/components/Icon/IconPlus';
import { notifySuccess } from '@/components/shared/notify/SNotify';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { notifyError } from '../../../components/shared/notify/SNotify';
import IconTrash from '@/components/Icon/IconTrash';
import { useForm } from 'react-hook-form';
import InputsGrid from '../../../components/shared/formInputs/InputsGrid';
import { Button as ButtonCus } from '@mui/material';

const Category = () => {
   const { data = { data: [] }, mutate } = useCategoriesQuery();
   const { control, handleSubmit, reset } = useForm();
   const [openModal, setOpenModal] = useState(false);
   const [active, setActive] = useState(1);
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
               catCopy.content = cat.subCategories.map(
                  (item) =>
                     !item.name.includes('other_') && (
                        <div className="mb-1 flex w-full items-center justify-between rounded-md border p-2 shadow-md" key={item.id}>
                           {item.label}
                           <span
                              onClick={() => {
                                 api.delete('/api/category/' + item.id)
                                    .then(() => {
                                       notifySuccess('دسته بندی با موفقیت حذف شد.');
                                       mutate();
                                    })
                                    .catch((error) => notifyError('خطا در حذف دسته بندی'));
                              }}
                              className="flex cursor-pointer rounded-full p-1 text-black transition-all hover:text-primary"
                           >
                              <IconTrash className="w-4" />
                           </span>
                        </div>
                     )
               );
            } else {
               catCopy.content = cat.label;
            }
            result.push(catCopy);
         });
         return result;
      };
      return sectionGenerator(data?.categories || []);
   }, [data]);

   const inputs = [
      {
         label: 'نام دسته بندی (انگلیسی)',
         name: 'name',
         type: 'text',
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^[a-zA-Z0-9_]{4,}$/,
               message: "حداقل چهار کاراکتر و فقط کاراکتر انگلیسی ، عدد و '_' مجاز است.",
            },
         },
         col: { xl: 4, lg: 4, md: 12 },
      },
      {
         label: 'لیبل دسته بندی(فارسی)',
         name: 'label',
         type: 'text',
         required: true,
         rules: {
            required: 'پر کردن این فیلد الزامی میباشد.',
            pattern: {
               value: /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9 ]{4,}$/,
               message: 'حداقل چهار کاراکتر و فقط اعداد و حروف فارسی و فاصله مجاز است.',
            },
         },
         col: { xl: 4, lg: 4, md: 12 },
      },
      {
         label: 'دسته بندی بالاتر',
         name: 'ParentCategoryId',
         type: 'select',
         options: data?.categories || [],
         required: true,
         rules: { required: 'پر کردن این فیلد الزامی میباشد.' },
         col: { xl: 4, lg: 4, md: 12 },
      },
   ];

   const onSubmit = (values) => {
      api.post('api/category', values)
         .then((res) => {
            mutate((prvs) => {
               return { ...prvs, data: [...prvs.categories, res.data.categories] };
            });
            notifySuccess('دسته بندی با موفقیت ایجاد شد.');
            reset({ name: '', label: '', ParentCategoryId: '' });
            setOpenModal(false);
         })
         .catch((err) => {
            notifyError('خطا در ایجاد دسته بندی');
         });
   };

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
               <>
                  {/* <SForm
                     //   formClassName="!grid-cols-1"
                     formStructure={fields}
                     submitHandler={onSubmit}
                     getValues={(val) => setFormValues(val)}
                  /> */}
                  <form noValidate onSubmit={handleSubmit(onSubmit)}>
                     <InputsGrid control={control} inputs={inputs} />{' '}
                     <div className="flex items-center justify-end gap-1 px-1 py-2">
                        <ButtonCus type="submit" label={'ثبت'}>
                           ایجاد دسته‌بندی{' '}
                        </ButtonCus>{' '}
                        <ButtonCus variant="outlined" onClick={() => reset({ name: '', label: '', ParentCategoryId: '' })}>
                           لغو
                        </ButtonCus>
                     </div>
                     <ul className="list-disc px-5 text-sm font-medium leading-8">
                        <li>نام و لیبل دسته بندی باید یکتا و غیرتکراری باشد.</li>
                        <li>نام دسته بندی باید به صورت انگلیسی باشد و به جای فاصله در آن از _ استفاده شود .(برای مثال coffee_espresso)</li>
                     </ul>
                  </form>
               </>
            }
         />
      </PermissionChecker>
   );
};

export default Category;
