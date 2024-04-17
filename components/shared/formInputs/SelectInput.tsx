import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface Props {
   id: any;
   name?: string;
   label?: string;
   value: any;
   options?: {
      value: string;
      label: string;
      isDisabled?: boolean;
   }[];
   optionId?: string;
   optionLabel?: string;
   onChange: any;
   isMulti?: boolean;
   isDisabled?: boolean;
   isLoading?: boolean;
   touched: any;
   onBlur: any;
   required?: boolean;
   error?: any;
   col?: string;
}

const customStyles = {
   control: (base: any, state: any) => ({
      ...base,
      background: '#121e32',
      color: '#fff',
      // match with the menu
      //   borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      //   // Overwrittes the different states of border
      borderColor: state.isFocused ? '#17263c' : '#17263c',
      //   // Removes weird border around container
      //   boxShadow: state.isFocused ? null : null,
      '&:hover': {
         // Overwrittes the different states of border
         borderColor: '#17263c',
      },
   }),
   menu: (base: any) => ({
      ...base,
      background: '#121e32',
   }),
   menuList: (base: any) => ({
      ...base,
      background: '#121e32',
      // '&:hover': {
      //    background: '#000',
      // },
      // '&:active': {
      //    background: '#000',
      // },
   }),
   option: (base: any, { isFocused }: any) => ({
      ...base,
      color: '#fff',
      background: isFocused ? '#0e1726' : '#121e32',
   }),
   singleValue: (base: any) => ({
      ...base,
      color: '#888ea8',
   }),
};

const SelectInput = ({
   id,
   name = '',
   label = 'نام فیلد',
   value,
   options = [
      { value: 'orange', label: 'Orange' },
      { value: 'white', label: 'White' },
      { value: 'purple', label: 'Purple' },
   ],
   optionId = 'id',
   optionLabel = 'label',
   onChange,
   isMulti = false,
   isDisabled = false,
   isLoading = false,
   touched,
   onBlur,
   required = false,
   error,
   col,
}: Props) => {
   const [blurCheck, setBlurCheck] = useState(false);
   const [formatOptions, setFormatOptions] = useState([]);
   const [theme, setTheme] = useState('');

   useEffect(() => {
      let arr: any = [];
      options.map((item: any) => arr.push({ value: item[optionId], label: item[optionLabel] }));
      setFormatOptions(arr);
   }, [options]);

   useEffect(() => {
      setTheme(window.localStorage.getItem('theme'));
   }, []);

   return (
      <>
         <div className={`${col}`}>
            <label>
               {label}
               {required && <span className="text-sm text-red-600">*</span>}
            </label>
            <div>
               <Select
                  id={id}
                  name={name}
                  placeholder="یک مورد را انتخاب کنید"
                  styles={theme === 'dark' && customStyles}
                  options={formatOptions}
                  value={formatOptions ? formatOptions.find((option: { value: string }) => option.value === value) : ''}
                  onChange={(option: any) => {
                     if (isMulti) {
                        onChange(name, option.length ? option : '');
                     } else {
                        onChange(name, option ? option.value : '');
                     }
                  }}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={true}
                  isSearchable={true}
                  blurInputOnSelect
                  onBlur={(e) => {
                     onBlur(e);
                     setBlurCheck(true);
                  }}
                  isMulti={isMulti}
                  // required={required}
                  noOptionsMessage={() => formatOptions && 'موردی وجود ندارد'}
               />
               <p className="mt-1 text-xs text-red-500">{error && !value && (blurCheck || touched) ? error : '\xa0'}</p>
            </div>
         </div>
      </>
   );
};

export default React.memo(SelectInput);
