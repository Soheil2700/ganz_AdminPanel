import React from 'react';

interface Props {
   id: any;
   name?: string;
   label?: string;
   value: any;
   onChange: any;
   isDisabled?: boolean;
   isLoading?: boolean;
   onBlur: any;
   required?: boolean;
   error: any;
   col: string;
   touched: any;
}

const Switch = ({
   id,
   name = '',
   label = 'نام فیلد',
   value,
   onChange,
   isDisabled = false,
   isLoading = false,
   touched,
   onBlur,
   required = false,
   error,
   col,
}: Props) => {
   return (
      <div className={`${col} h-full`}>
         <label>{'\xa0'}</label>
         <label className="flex h-[38px] cursor-pointer items-center justify-start gap-2">
            <label className="m-0 text-white-dark">
               {label}
               {required && <span className="text-sm text-red-600">*</span>}
            </label>
            <label className="relative m-0 h-6 w-12">
               <input
                  id={id}
                  name={name}
                  type="checkbox"
                  className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                  value={value}
                  checked={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  disabled={isDisabled}
               />
               <span className="outline_checkbox block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary dark:border-white-dark dark:before:bg-white-dark"></span>
            </label>
         </label>
      </div>
   );
};

export default React.memo(Switch);
