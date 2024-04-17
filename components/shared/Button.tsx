import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import IconLoader from '../Icon/IconLoader';

interface Props {
   id?: any;
   label?: string;
   type?: any;
   onClick?: any;
   isDisabled?: boolean;
   isLoading?: boolean;
   col?: string;
   ref?: any;
   handleReset?: any;
   icon?: any;
}

const Button = ({ id, label, type = 'submit', onClick, icon, col, isDisabled, isLoading, handleReset, ref }: Props) => {
   return (
      <div>
         <button
            id={id}
            ref={ref}
            type={type}
            className="btn btn-primary mt-6 min-w-[80px]"
            onClick={type === 'reset' ? handleReset : onClick}
         >
            {isLoading ? (
               <IconLoader className="animate-spin text-white" />
            ) : (
               <p className="flex gap-2">
                  {icon} {label}
               </p>
            )}
         </button>
      </div>
   );
};

export default Button;
