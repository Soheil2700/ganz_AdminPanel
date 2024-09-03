import React, { useState, useEffect } from 'react';
import PermissionChecker from '@/components/permissionChecker';
import api from '@/services/interceptor';
import HoverTable from '@/components/shared/tables/hoverTable';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import Modal from '@/components/shared/modal';
import Image from 'next/image';
import { Typography } from '@mui/material';
import SForm from '../../../components/shared/formInputs/SForm';
import { OrderStatus } from '../../../enums/status';

const Orders = () => {
   const [openModal, setOpenModal] = useState(false);
   const [orderDetailData, setOrderDetailData] = useState();
   const [rows, setRows] = useState([]);
   const dispatch = useDispatch();
   useEffect(() => {
      api.get('/api/order/all-orders').then((res) => setRows(res.data.orders.orders));
      dispatch(setPageTitle('سفارشات'));
   }, []);
   return (
      <PermissionChecker roles={['ADMIN', 'SELLER']}>
         <div className="lg:my-5">
            <HoverTable
               title="سفارشات"
               headers={[
                  { name: 'receiver_name', label: 'سفارش دهنده', type: 'text' },
                  { name: 'send_date', label: 'تاریخ', type: 'date' },
                  { name: 'price', label: 'مبلغ سفارش', type: 'text' },
                  { name: 'status', label: 'وضعیت', type: 'status' },
               ]}
               tableData={rows.map((item) => {
                  let price = 0;
                  item.OrderItem.forEach((i) => (price = price + i.unit_cost));
                  return {
                     ...item,
                     status: OrderStatus[item.status],
                     receiver_name: item?.User.first_name + ' ' + item?.User.last_name,
                     price: `${price.toLocaleString()} تومان`,
                  };
               })}
               getSearchValue={(val) => {
                  api.get('/api/order/all-orders', { params: { ...val } }).then((res) => setRows(res.data.orders.orders));
               }}
               editIconOnClick={(val) => {
                  setOpenModal(true);
                  setOrderDetailData(val);
               }}
               showFilter={true}
               showEdit={true}
            />
         </div>
         <Modal
            open={openModal}
            setOpen={setOpenModal}
            title="جزییات سفارش"
            size="medium"
            content={
               <>
                  <div className="flex flex-wrap gap-4 divide-y">
                     {orderDetailData?.OrderItem.map((item, index) => (
                        <div className="grid w-full grid-cols-12 items-center gap-2" key={index}>
                           <Image
                              className="col-span-2"
                              alt="d"
                              src={process.env.NEXT_PUBLIC_BASE_URL + item?.product?.cover}
                              width={60}
                              height={70}
                           />
                           <Typography className="col-span-7">نام محصول: {item.product.title}</Typography>
                           <Typography className="col-span-3">تعداد: {item.count}</Typography>
                        </div>
                     ))}
                  </div>
               </>
            }
         />
      </PermissionChecker>
   );
};

export default Orders;
