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
   col: string;
   touched: any;
   placeholder?: string;
}

const Textarea = ({ id, name, label, value, onChange, required, touched, onBlur, error, col, isDisabled, placeholder }: Props) => {
   return (
      <div className={`${col}`}>
         <label>
            {label}
            {required && <span className="text-sm text-red-600">*</span>}
         </label>
         <div>
            <textarea
               id={id}
               name={name}
               value={value}
               disabled={isDisabled}
               rows={3}
               className="form-textarea"
               onChange={onChange}
               onBlur={onBlur}
               placeholder={placeholder}
               //    required={required}
            />
            <p className="mt-1 text-xs text-red-500">{error && touched ? error : '\xa0'}</p>
         </div>
      </div>
   );
};

export default React.memo(Textarea);
