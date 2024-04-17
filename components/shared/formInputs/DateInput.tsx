import React, { useState } from 'react';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Modal from '@/components/shared/modal';

const DateInput = ({ id, label, required, isDisabled, value, onChange, col, error, touched }) => {
   const [showModal, setShowModal] = useState(false);
   const moment = require('moment-jalaali');
   return (
      <>
         <div className={`${col} h-full`} onClick={() => !isDisabled && setShowModal(true)}>
            <label>
               {label}
               {required && <span className="text-sm text-red-600">*</span>}
            </label>
            <div
               className={`${col} flex h-[38px] cursor-pointer items-center justify-between rounded-[4px] border dark:border-[#17263c] dark:bg-[#121e32]`}
            >
               <label htmlFor={id} className="m-0 cursor-pointer pr-3 text-sm font-normal text-[#757678] dark:text-[#888ea8]">
                  {value ? moment(value).format('jYYYY/jM/jD') : 'انتخاب زمان'}
               </label>
            </div>
            <p className="mt-1 text-xs text-red-500">{error && touched ? error : '\xa0'}</p>
         </div>
         <Modal
            open={showModal}
            setOpen={setShowModal}
            size="fit"
            content={
               <div className="flex justify-center">
                  <Calendar
                     calendar={persian}
                     locale={persian_fa}
                     value={value}
                     onChange={(e) => {
                        onChange(e);
                        setShowModal(false);
                     }}
                  />
               </div>
            }
         />
      </>
   );
};

export default DateInput;
