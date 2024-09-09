import React, { useState, useEffect } from 'react';
import PermissionChecker from '@/components/permissionChecker';
import api from '@/services/interceptor';
import HoverTable from '@/components/shared/tables/hoverTable';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import Modal from '@/components/shared/modal';
import Image from 'next/image';
import { Link } from '@mui/material';
import SForm from '../../../components/shared/formInputs/SForm';
import { OrderStatus } from '../../../enums/status';
import Button from '@/components/shared/Button';

export const grindTypes = [
   {
      id: 'COFFEE_BEAN',
      title: 'دانه قهوه',
   },
   {
      id: 'AEROPRESS',
      title: 'ایروپرس',
   },
   {
      id: 'CHEMEX',
      title: 'کمکس',
   },
   {
      id: 'COLD_BREW',
      title: 'کلد برو',
   },
   {
      id: 'FRANCE',
      title: 'فرانسه ساز',
   },
   {
      id: 'FRENCH_PRESS',
      title: 'فرنچ پرس',
   },
   {
      id: 'ESPRESSO',
      title: 'اسپرسوساز خانگی',
   },
   {
      id: 'MINIPRESSO',
      title: 'مینی پرسو',
   },
   {
      id: 'MOKA_POT',
      title: 'موکاپات',
   },
   {
      id: 'SEMI_ESPRESSO',
      title: 'اسپرسوساز صنعتی',
   },
   {
      id: 'SIPHONE',
      title: 'سایفون',
   },
   {
      id: 'V60',
      title: 'V60',
   },
   {
      id: 'TURKISH',
      title: 'جذوه',
   },
];
const Orders = () => {
   const [openModal, setOpenModal] = useState(false);
   const [openActionModal, setOpenActionModal] = useState(false);
   const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState(1);
   const [orderDetailData, setOrderDetailData] = useState();
   const [rows, setRows] = useState([]);
   const dispatch = useDispatch();
   useEffect(() => {
      api.get('/api/order/all-orders?size=10&page=' + page).then((res) => {
         setRows(res.data.orders.orders);
         setTotalPage(res.data.orders.total);
      });
      dispatch(setPageTitle('سفارشات'));
   }, [page]);
   return (
      <PermissionChecker roles={['ADMIN', 'SELLER']}>
         <div className="lg:my-5">
            <HoverTable
               title="سفارشات"
               headers={[
                  { name: 'trackingCode', label: 'کد رهگیری', type: 'text' },
                  { name: 'receiver_name', label: 'سفارش دهنده', type: 'text' },
                  { name: 'send_date', label: 'تاریخ', type: 'date' },
                  { name: 'price', label: 'مبلغ سفارش', type: 'text' },
                  { name: 'status', label: 'وضعیت', type: 'status' },
               ]}
               showAction
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
                  api.get('/api/order/all-orders?size=10&page=1', { params: { ...val } }).then((res) => setRows(res.data.orders.orders));
               }}
               editIconOnClick={(val) => {
                  setOpenModal(true);
                  setOrderDetailData(val);
               }}
               actionOnClick={(val) => {
                  setOpenActionModal(true);
                  setOrderDetailData(val);
               }}
               showFilter={true}
               showEdit={true}
               setPage={setPage}
               page={page}
               totalPages={Math.ceil(totalPage / 10)}
               pagination
            />
         </div>
         <Modal
            open={openActionModal}
            setOpen={setOpenActionModal}
            title="وضعیت سفارش"
            content={
               <div>
                  <p>تغییر وضعیت سفارش؟</p>
                  <div className="flex items-center justify-center gap-2">
                     {' '}
                     <Button
                        label="لغو سفارش"
                        onClick={() =>
                           api
                              .put('/api/order/' + orderDetailData.id, {
                                 status: 'CANCELED',
                              })
                              .then(() => {
                                 setOpenActionModal(false);
                                 if (page === 1) {
                                    api.get('/api/order/all-orders?size=10&page=1').then((res) => {
                                       setPage(1);
                                       setRows(res.data.orders.orders);
                                    });
                                 } else {
                                    setPage(1);
                                 }
                              })
                        }
                     />
                     <Button
                        label="ارسال سفارش"
                        onClick={() =>
                           api
                              .put('/api/order/' + orderDetailData.id, {
                                 status: 'POSTED',
                              })
                              .then(() => {
                                 setOpenActionModal(false);
                                 if (page === 1) {
                                    api.get('/api/order/all-orders?size=10&page=1').then((res) => {
                                       setPage(1);
                                       setRows(res.data.orders.orders);
                                    });
                                 } else {
                                    setPage(1);
                                 }
                              })
                        }
                     />
                  </div>
               </div>
            }
         />
         <Modal
            open={openModal}
            setOpen={setOpenModal}
            title="جزییات سفارش"
            size="medium"
            content={
               <>
                  <div className="flex flex-wrap gap-4 divide-y text-sm">
                     <div className="w-full">
                        <div className="w-max rounded-lg bg-primary p-1 px-2 text-white">کد رهگیری: {orderDetailData?.trackingCode}</div>
                     </div>
                     <div className="flex w-full flex-col gap-2 pt-2">
                        <h2 className="py-2 pb-4 font-medium">اطلاعات تماس:</h2>
                        <div>
                           نام و نام خانوادگی سفارش دهنده: {orderDetailData?.User?.first_name + ' ' + orderDetailData?.User?.last_name}
                        </div>
                        <div>شماره موبایل: {orderDetailData?.User?.mobile?.replace('+98', '0')}</div>
                        <div>
                           آدرس:
                           {orderDetailData?.address?.province_slug +
                              '، ' +
                              orderDetailData?.address?.city_slug +
                              '، ' +
                              orderDetailData?.address?.description}
                        </div>
                     </div>{' '}
                     <div className="flex w-full flex-col gap-1">
                        <h2 className="py-2 pb-4 font-medium">اقلام سفارش:</h2>
                        {orderDetailData?.OrderItem.map((item, index) => {
                           return !item?.custom_composition ? (
                              <div
                                 className="grid w-full grid-cols-12 items-center gap-2 rounded-lg border bg-white p-2 shadow-lg"
                                 key={index}
                              >
                                 <Link
                                    className="col-span-12 md:col-span-3"
                                    href={`https://ganzcoffee.com/product/${item.product.slug}`}
                                    target="_blank"
                                 >
                                    <Image
                                       alt="d"
                                       src={process.env.NEXT_PUBLIC_BASE_URL + item?.product?.cover}
                                       className="h-16 w-16"
                                       width={60}
                                       height={70}
                                    />
                                 </Link>
                                 <p className="col-span-12 md:col-span-4">نام محصول: {item.product.title}</p>
                                 <p className="col-span-12 md:col-span-3">
                                    نوع آسیاب: {grindTypes.find((grindType) => grindType.id === item.grind_type)?.title}
                                 </p>
                                 <p className="col-span-12 md:col-span-1">تعداد: {item.count}</p>
                              </div>
                           ) : (
                              <div className="grid w-full grid-cols-12 items-center gap-2 rounded-lg border bg-white p-2 shadow-lg">
                                 <p className="col-span-12 w-max rounded-lg bg-primary p-1 px-2 text-white md:col-span-3">ترکیب سفارشی</p>
                                 <p className="col-span-12 md:col-span-3">
                                    نوع آسیاب : {grindTypes.find((grindType) => grindType.id === item?.grind_type)?.title}
                                 </p>
                                 <p className="col-span-12 md:col-span-3">وزن : {item?.custom_composition?.weight + ' کیلوگرم'}</p>{' '}
                                 <p className="col-span-12 md:col-span-3">تعداد: {item.count}</p>
                                 <div className="col-span-12">
                                    {' '}
                                    ترکیبات :
                                    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3">
                                       {item?.custom_composition?.Custom_Composition_Item?.map((product) => (
                                          <div
                                             className="flex w-full items-center justify-center gap-1 p-1.5 text-xs"
                                             key={product?.product?.id}
                                          >
                                             <Image
                                                alt={product?.product?.title}
                                                src={process.env.NEXT_PUBLIC_BASE_URL + product?.product?.cover}
                                                className="h-16 w-16"
                                                width={100}
                                                height={100}
                                             />
                                             <p>
                                                {product?.product?.title} ({product?.percent} درصد)
                                             </p>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </>
            }
         />
      </PermissionChecker>
   );
};

export default Orders;
