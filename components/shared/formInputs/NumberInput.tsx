import React from 'react';

interface Props {
   id: any;
   name?: string;
   label?: string;
   type?: string;
   value: any;
   onChange: any;
   isDisabled?: boolean;
   isLoading?: boolean;
   onBlur: any;
   required?: boolean;
   error: any;
   col: string;
   touched: any;
   placeholder?: string;
}

const NumberInput = ({ id, name, label, value, onChange, required, touched, onBlur, error, col, isDisabled, placeholder }: Props) => {
   return (
      <div className={`${col}`}>
         <label>
            {label}
            {required && <span className="text-sm text-red-600">*</span>}
         </label>
         <div>
            <input
               id={id}
               name={name}
               value={value}
               disabled={isDisabled}
               type="text"
               placeholder={placeholder}
               className="form-input"
               onChange={(e) => {
                  if (e.target.value.match(/^[0-9]+(\.[0-9]+)?$/) || e.target.value === '') {
                     onChange(e);
                  }
               }}
               onBlur={onBlur}
            />
            <p className="mt-1 text-xs text-red-500">{error && touched ? error : '\xa0'}</p>
         </div>
      </div>
   );
};

export default NumberInput;
