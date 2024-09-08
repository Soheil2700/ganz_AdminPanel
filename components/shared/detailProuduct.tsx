import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import api from '@/services/interceptor';
import { Pagination, Autoplay } from 'swiper';
import IconHorizontalDots from '../Icon/IconHorizontalDots';
import Button from '@/components/shared/Button';
import IconShoppingBag from '../Icon/IconShoppingBag';
import { notifyError } from './notify/SNotify';

interface Props {
   proId: number;
}

const DetailProuduct = ({ proId }: Props) => {
   const [open, setOpen] = useState(false);
   const [activeSlide, setActiveSlide] = useState(0);
   const [allData, setAllData] = useState([]);
   const moment = require('moment-jalaali');

   useEffect(() => {
      api.get('api/product/' + proId)
         .then((res) => {
            setAllData(res.data);
         })
         .catch((res) => notifyError('خطایی رخ داده است'));
   }, []);

   const images = allData.images?.length > 4 ? allData.images?.slice(0, 4) : allData.images;
   return (
      <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
         <div className="flex w-full lg:w-1/2 xl:w-1/3">
            <div className="flex h-[250px] w-full flex-col-reverse gap-2 sm:flex-row md:h-[600px]">
               <div className="flex h-[250px] w-full flex-col-reverse gap-2 sm:flex-row md:h-[600px]">
                  <div className="hidden min-w-[100px] flex-row items-start justify-start gap-3 sm:flex sm:w-1/6 sm:flex-col ">
                     {images?.map((item, i) => (
                        <Image
                           key={i}
                           onClick={() => {
                              setActiveSlide(i);
                              setOpen(true);
                           }}
                           className="h-[110px] w-full cursor-pointer rounded-[15px] border bg-white object-contain hover:border-secondary/60 dark:border-white/20 dark:border-t-white/20 dark:hover:border-white/60"
                           loading="lazy"
                           src={process.env.NEXT_PUBLIC_BASE_URL + item}
                           width={250}
                           height={300}
                           alt="product"
                        />
                     ))}
                     {allData.images?.length > 4 && (
                        <div
                           onClick={() => {
                              setOpen(true);
                           }}
                           className="flex h-[110px] w-full cursor-pointer items-center justify-center rounded-[15px] border bg-white text-secondary hover:border-secondary/60 dark:border-white/20 dark:border-t-white/20 dark:hover:border-white/60"
                        >
                           <IconHorizontalDots className="h-6 w-6" />
                        </div>
                     )}
                  </div>
                  <Swiper
                     spaceBetween={30}
                     centeredSlides
                     pagination={{
                        clickable: true,
                        bulletActiveClass: 'swiper-pagination-bullet-active-indexpage-slider',
                        horizontalClass: `swiper-pagination-indexpage-slider`,
                     }}
                     modules={[Autoplay, Pagination]}
                     className={`h-[480px] w-full items-center justify-center overflow-hidden rounded-[15px] border bg-white text-center text-[20px] dark:border-t-white/20 `}
                     style={{
                        '--swiper-pagination-color': '#FFFFFF',
                        '--swiper-pagination-bullet-size': '8px',
                     }}
                  >
                     {images?.map((item, i) => (
                        <SwiperSlide key={i} className={`!grid h-full cursor-pointer place-content-center rounded-[15px]`}>
                           <Image
                              loading="lazy"
                              className="w-full cursor-pointer rounded-[15px] object-contain"
                              src={process.env.NEXT_PUBLIC_BASE_URL + item}
                              width={500}
                              height={514}
                              alt="banner"
                           />
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </div>
         </div>
         <div className="flex w-full flex-col gap-10 xl:flex-row">
            <div className="flex w-full flex-auto flex-col items-start gap-2">
               <h2 className="mb-10 flex w-full items-end justify-between border-b pb-3 text-xl font-semibold dark:text-white">
                  <span>{allData.title}</span>
                  {!allData?.bulk_cargo && (
                     <a href={`https://ganzcoffee.com/product/${proId}`} target="_blank">
                        <Button label="مشاهده در فروشگاه" icon={<IconShoppingBag />} />
                     </a>
                  )}
               </h2>
               {/* <p className="text-[18px]">{allData.description}</p>
               <p className="text-[18px]">{allData.description}</p> */}
               <ul className={`m-0 h-auto list-inside list-disc overflow-hidden p-0 transition-all duration-300`}>
                  <li className="mb-1 text-sm">
                     <span>دسته بندی: {allData?.Category?.label}</span>
                  </li>
                  <li className="mb-1 text-sm">
                     <span>تعداد : </span>
                     <span>{allData.quantity}</span>
                  </li>
                  <li className="mb-1 text-sm">
                     <span>قیمت: {allData?.price?.toLocaleString()} تومان</span>
                  </li>
                  <li className="mb-1 text-sm">
                     <span>قیمت با تخفیف: {allData?.discounted_price?.toLocaleString()} تومان</span>
                  </li>
                  <li className="mb-1 text-sm">
                     <span>تاریخ ایجاد محصول: {moment(allData?.createdAt).format('jYYYY/jM/jD')}</span>
                  </li>
                  <li className="mb-3 text-sm">
                     <span>توضیح کوتاه: {allData?.summary}</span>
                  </li>
                  <li className="mb-3 text-sm">
                     <span>توضیحات: {allData?.description}</span>
                  </li>{' '}
                  {allData?.attributes && Object.entries(allData?.attributes).length > 0 && (
                     <li className="flex gap-1 text-sm ">
                        <span>ویژگی ها: </span>
                        <span className="grid gap-1">
                           {Object.entries(allData?.attributes)?.map((att, index) => (
                              <div className="grid grid-cols-3 gap-1" key={index}>
                                 <span className="col-span-1 rounded-lg bg-slate-200 px-5 py-1 ">{att[0]}</span>
                                 <ul className={`col-span-2 rounded-lg bg-slate-200 px-5 py-1 text-black `}>
                                    {att[1].map((item) => (
                                       <li key={item.id}>{item.label}</li>
                                    ))}
                                 </ul>
                              </div>
                           ))}
                        </span>
                     </li>
                  )}
               </ul>{' '}
            </div>
         </div>
      </div>
   );
};

export default DetailProuduct;
