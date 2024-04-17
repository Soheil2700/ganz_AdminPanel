import React, { useEffect, useState } from 'react';
import PermissionChecker from '../../../components/permissionChecker.js';
import api from '../../../services/interceptor.js';
import Button from '@/components/shared/Button';
import SForm from '@/components/shared/formInputs/SForm';
import Modal from '@/components/shared/modal';
import IconPlus from '@/components/Icon/IconPlus';
import IconTrash from '@/components/Icon/IconTrash';

const Discount = () => {
   const [data, setData] = useState([]);
   const [openModal, setOpenModal] = useState(false);
   const moment = require('moment-jalaali');
   const getData = () => {
      api.get('admin/api/discount').then((res) => {
         setData(res.data.discounts);
      });
   };
   const onSubmit = (value) => {
      api.post('admin/api/discount/define', {
         ...value,
         percent: +value.percent,
         fromDate: new Date(value.fromDate),
         thruDate: new Date(value.thruDate),
      }).then((res) => {
         getData();
         setOpenModal(false);
      });
   };
   useEffect(() => {
      getData();
   }, []);
   return (
      <PermissionChecker roles={['admin']}>
         <div className="flex flex-col gap-8">
            <Button label="ایجاد تخفیف" icon={<IconPlus />} onClick={() => setOpenModal(true)} />
            <div className="grid grid-cols-4 gap-4">
               {data.map((item, index) => (
                  <div key={index} className="flex items-center justify-center gap-6 rounded-lg border border-gray-200 p-4">
                     {/* <IconTag size="25" color="#fff" /> */}
                     <div className="flex w-full items-center justify-between gap-4 dark:text-white">
                        <div className="grid grid-cols-2 justify-items-start gap-4">
                           <span className="flex items-center justify-center">نام تخفیف: {item.label}</span>
                           <span className="flex items-center justify-center">به مقدار %{item.percent}</span>
                           <span className="flex items-center justify-center">معتبر تا {moment(item.thruDate).format('jYYYY/jM/jD')}</span>
                           <span className="flex items-center justify-center">
                              تخفیف از نوع {item.discountType === 'USER' ? 'کاربر' : 'محصول'} میباشد
                           </span>
                        </div>
                        <span
                           className="cursor-pointer"
                           onClick={() => {
                              // api.delete(`/admin/api/product/tag/${item.title}`)
                              //    .then((res) => {
                              //    })
                              //    .catch((err) => {});
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
            title="تعریف محصول"
            size="medium"
            content={
               <>
                  <SForm
                     formStructure={[
                        {
                           label: 'نام تخفیف',
                           name: 'label',
                           type: 'text',
                           col: 4,
                           required: true,
                        },
                        {
                           label: 'درصد',
                           name: 'percent',
                           type: 'number',
                           col: 4,
                           required: true,
                        },
                        {
                           label: 'نوع تخفیف',
                           name: 'discountType',
                           type: 'select',
                           options: [
                              { key: 'USER', value: 'کاربر' },
                              { key: 'PRODUCT', value: 'محصول' },
                           ],
                           optionId: 'key',
                           optionLabel: 'value',
                           col: 4,
                           required: true,
                        },
                        {
                           label: 'تاریخ شروع',
                           name: 'fromDate',
                           type: 'date',
                           col: 4,
                           required: true,
                        },
                        {
                           label: 'تاریخ پایان',
                           name: 'thruDate',
                           type: 'date',
                           col: 4,
                           required: true,
                        },
                     ]}
                     submitHandler={(value) => onSubmit(value)}
                     //  editValues={editValues}
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

export default Discount;
