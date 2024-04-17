import PermissionChecker from '@/components/permissionChecker';
import Button from '@/components/shared/Button';
import SForm from '@/components/shared/formInputs/SForm';
import api from '@/services/interceptor';
import React, { useEffect, useState } from 'react';
import Modal from '@/components/shared/modal';
import IconTrash from '@/components/Icon/IconTrash';
import IconTag from '@/components/Icon/IconTag';
import IconPlus from '@/components/Icon/IconPlus';
import { notifySuccess } from '@/components/shared/notify/SNotify';

const Tags = () => {
   const [tags, setTags] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const [editValues, setEditValues] = useState({});
   const onSubmit = (value) => {
      api.post('/admin/api/product/tag', { ...value, products: [] }).then((res) => {
         getTags();
         notifySuccess('تگ با موفیقت ایجاد شد');
         setOpenModal(false);
      });
   };
   const getTags = () => {
      api.get('/admin/api/product/tag').then((res) => setTags(res.data.tags));
   };
   useEffect(() => {
      getTags();
   }, []);
   return (
      <PermissionChecker roles={['ADMIN']}>
         <div className="flex flex-col gap-6">
            <div>
               <Button label="ایجاد تگ" icon={<IconPlus />} onClick={() => setOpenModal(true)} />
            </div>
            <div className="grid gap-2 text-white xl:grid-cols-6">
               {tags.map((item) => (
                  <div key={item.id} className="flex items-center justify-center gap-6 rounded-lg border border-gray-200 p-4">
                     <IconTag size="25" color="#fff" />
                     <div className="flex w-full items-center justify-between">
                        <span className="flex items-center justify-center">{item.title}</span>
                        <span
                           className="cursor-pointer"
                           onClick={() => {
                              api.delete(`/admin/api/product/tag/${item.title}`)
                                 .then((res) => {
                                    setTags(tags.filter((tg) => tg.id !== item.id));
                                 })
                                 .catch((err) => {});
                           }}
                        >
                           <IconTrash color="#fff" />
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <Modal
            open={openModal}
            setOpen={setOpenModal}
            content={
               <>
                  <SForm
                     formStructure={[
                        {
                           label: 'نام تگ',
                           name: 'title',
                           type: 'text',
                           col: 12,
                           required: true,
                        },
                     ]}
                     submitHandler={(value) => onSubmit(value)}
                     editValues={editValues}
                     buttons={[
                        {
                           label: 'ثبت',
                           type: 'submit',
                        },
                     ]}
                  />
               </>
            }
         />
      </PermissionChecker>
   );
};

export default Tags;
