import React from 'react';

interface Props {
   id: any;
   name?: string;
   label?: string;
   type?: string;
   value: string;
   onChange: any;
   clear?: any;
   required?: boolean;
   touched: any;
   onBlur: any;
   error?: any;
   col?: number;
   isDisabled?: boolean;
   multiple?: boolean;
   customOnChange?: any;
}

const FileInput = ({
   id,
   name,
   label = 'فایل خود را بارگذاری کنید',
   type = 'file',
   value,
   onChange,
   clear,
   required = false,
   touched,
   onBlur,
   error,
   col,
   isDisabled = false,
   multiple = false,
   customOnChange = () => {},
}: Props) => {
   let fileName = value ? value?.split('\\').pop() : false;
   return (
      <div className={`${col} h-full`}>
         <label>
            {label}
            {required && <span className="text-sm text-red-600">*</span>}
         </label>
         <div
            className={`${col} flex h-[38px] cursor-pointer items-center justify-between rounded-[4px] border dark:border-[#17263c] dark:bg-[#121e32]`}
         >
            <label htmlFor={id} className="m-0 cursor-pointer pr-3 text-sm font-normal text-[#757678]">
               محتوای خود را بارگذاری کنید {fileName && `(${fileName})`}
            </label>
            {value && (
               <button
                  type="button"
                  className="mx-2 my-2 inline-flex items-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-600"
                  data-modal-hide="medium-modal"
                  onClick={() => clear(name, '')}
               >
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                     ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
               </button>
            )}
         </div>
         <p className="mt-1 text-xs text-red-500">{error && touched ? error : '\xa0'}</p>
         <input
            id={id}
            name={name}
            type={type}
            value={value}
            disabled={isDisabled}
            multiple={multiple}
            onChange={(e) => {
               onChange(e);
               customOnChange('content', e.target.files);
            }}
            onBlur={onBlur}
            className="rtl:file-ml-5 form-input hidden p-0 file:border-0 file:bg-primary/90 file:px-4 file:py-2 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
         />
      </div>
   );
};

export default React.memo(FileInput);
