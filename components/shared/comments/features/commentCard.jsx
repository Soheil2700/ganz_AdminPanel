import { Fragment, memo, useState } from 'react';
import IconPlus from '@/components/Icon/IconPlus';
import IconMinus from '@/components/Icon/IconMinus';
import IconTrash from '@/components/Icon/IconTrash';
import IconChecks from '@/components/Icon/IconChecks';

function CommentCard({ id, title, approved, createdAt, description, advantages, disAdvantages, handleDelete, handleApprove, Product }) {
   const [isLoading, setIsLoading] = useState(false);

   const onDelete = () => {
      setIsLoading(true);
      handleDelete(id).finally(() => setIsLoading(false));
   };

   const onApprove = () => {
      setIsLoading(true);
      handleApprove(id).finally(() => setIsLoading(false));
   };

   return (
      <div className="relative mb-8 grid grid-cols-1 gap-4 rounded-lg border bg-primary-dark-light p-4 shadow-lg">
         <div className="relative flex gap-4">
            <img
               src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
               className="relative -top-8 -mb-4 h-20 w-20 rounded-lg border bg-primary-dark-light"
               alt=""
               loading="lazy"
            />
            <div className="flex w-full flex-col">
               <div className="flex flex-row justify-between">
                  <p className="relative overflow-hidden truncate whitespace-nowrap text-xl">{title}</p>
                  {isLoading ? (
                     <span className="w-12 animate-pulse rounded-full bg-gray-100"></span>
                  ) : approved ? (
                     <button onClick={onDelete} className="text-red-600">
                        <IconTrash />
                     </button>
                  ) : (
                     <div className="flex gap-2">
                        <button onClick={onDelete} className="text-orange-400">
                           {/* <BsExclamationDiamond /> */}
                        </button>
                        <button onClick={onApprove} className="text-green-700">
                           <IconChecks />
                        </button>
                     </div>
                  )}
               </div>
               <p className="text-sm text-gray-400">{new Date(createdAt).toLocaleString('fa-IR')}</p>
            </div>
         </div>
         <div className="flex gap-2 text-xs font-semibold">
            <span className="rounded-md bg-gray-300 px-2 py-1">{Product.title}</span>
            <span className={`${approved ? 'bg-green-300' : 'bg-red-300'} rounded-md px-2 py-1`}>
               {approved ? 'تایید شده' : 'تایید نشده'}
            </span>
         </div>
         <p className="-mt-4 text-right text-gray-500">{description}</p>
         <div dir="rtl">
            {advantages.map((item) => (
               <Fragment key={item}>
                  <div className="flex items-center gap-3">
                     <span className="text-green-600">
                        <IconPlus />
                     </span>
                     <p className="text-gray-500">{item}</p>
                  </div>
                  <br />
               </Fragment>
            ))}
            {disAdvantages.map((item) => (
               <Fragment key={item}>
                  <div className="flex items-center gap-3">
                     <span className="text-red-600">
                        <IconMinus />
                     </span>
                     <p className="text-gray-500">{item}</p>
                  </div>
                  <br />
               </Fragment>
            ))}
         </div>
      </div>
   );
}

export default memo(CommentCard);
