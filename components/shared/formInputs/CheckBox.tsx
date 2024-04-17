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
   error?: any;
   col?: string;
   touched: any;
   placeholder?: string;
}

const CheckBox = ({ id, name, label, value, onChange, required, touched, onBlur, error, col, isDisabled }: Props) => {
   return (
      <div className={`${col} h-full`}>
         <label>{'\xa0'}</label>
         <label className="flex h-[38px] cursor-pointer items-center justify-start">
            <input
               id={id}
               type="checkbox"
               className="form-checkbox"
               name={name}
               value={value}
               checked={value}
               onChange={onChange}
               onBlur={onBlur}
               disabled={isDisabled}
               defaultChecked
            />
            <label className="m-0 text-white-dark">
               {label}
               {required && <span className="text-sm text-red-600">*</span>}
            </label>
         </label>
      </div>
   );
};

export default React.memo(CheckBox);
