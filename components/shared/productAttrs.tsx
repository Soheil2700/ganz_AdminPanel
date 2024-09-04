import React, { useEffect, useState } from 'react';
import api from '@/services/interceptor';
import IconTrash from '@/components/Icon/IconTrash';
import { notifyError, notifySuccess } from './notify/SNotify';

interface Props {
   proId: number;
}

const ProductAttrs = ({ proId }: Props) => {
   const [allData, setAllData] = useState([]);
   useEffect(() => {
      api.get('api/product/' + proId).then((res) => {
         setAllData(res.data);
      });
   }, []);

   return allData?.attributes && Object.entries(allData?.attributes).length > 0 ? (
      <div className="flex w-full gap-1 text-sm">
         <span className="grid w-full gap-1">
            {Object.entries(allData?.attributes)?.map((att, index) => (
               <div className="grid grid-cols-3 gap-1" key={index}>
                  <span className="col-span-1 rounded-lg bg-slate-200 px-5 py-1 ">{att[0]}</span>
                  <ul className={`col-span-2 rounded-lg bg-slate-200 px-5 py-1 text-black `}>
                     {att[1].map((item) => (
                        <li className="flex items-center justify-between" key={item.id}>
                           {item.label}{' '}
                           <span
                              onClick={() => {
                                 api.delete(`api/attribute/remove-allocation`, {
                                    products: [allData?.id],
                                    attributeValues: [item?.id],
                                 })
                                    .then(() => {
                                       notifySuccess('ویژگی با موفقیت حذف شد.');
                                       api.get('api/product/' + proId).then((res) => {
                                          setAllData(res.data);
                                       });
                                    })
                                    .catch((error) => notifyError('خطا در حذف ویژگی'));
                              }}
                              className="flex cursor-pointer rounded-full p-1 text-black transition-all hover:text-primary"
                           >
                              <IconTrash className="w-4" />
                           </span>
                        </li>
                     ))}
                  </ul>
               </div>
            ))}
         </span>
      </div>
   ) : (
      <div className="rounded-lg bg-slate-200 px-5 py-1 text-center ">هیچ ویژگی ای برای این محصول تعریف نشده است.</div>
   );
};

export default ProductAttrs;
