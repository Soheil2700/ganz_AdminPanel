import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import IconCaretDown from '../Icon/IconCaretDown';
import IconTrash from '@/components/Icon/IconTrash';

interface Props {
   accordionContent: [];
}

const Accordion = ({ accordionContent = [] }: Props) => {
   const [active, setActive] = useState(0);
   const togglePara = (value: number) => {
      setActive((oldValue: number) => {
         return oldValue === value ? '' : value;
      });
   };
   return (
      <div className="panel">
         <div className="mb-5">
            <div className="space-y-2 font-semibold">
               {accordionContent.map((item: any, index) => (
                  <div className="rounded border border-[#d3d3d3] dark:border-[#1b2e4b]">
                     <button
                        type="button"
                        className={`flex w-full items-center gap-2 p-4 text-white-dark dark:bg-[#1b2e4b] ${
                           active === index + 1 ? '!text-primary' : ''
                        }`}
                        onClick={() => togglePara(index + 1)}
                     >
                        {/* <IconTrash /> */}
                        {item.icon && item.icon}
                        <span>{item.title}</span>
                        <div className={`ltr:ml-auto rtl:mr-auto ${active === index + 1 ? 'rotate-180' : ''}`}>
                           <IconCaretDown />
                        </div>
                     </button>
                     <div>
                        <AnimateHeight duration={300} height={active === index + 1 ? 'auto' : 0}>
                           <div className="space-y-2 border-t border-[#d3d3d3] p-4 text-[13px] text-white-dark dark:border-[#1b2e4b]">
                              {item.content}
                           </div>
                        </AnimateHeight>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Accordion;
