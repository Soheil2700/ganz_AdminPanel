import React from 'react';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
   tabContent: {
      title: string;
      icon?: any;
      content: any;
   }[];
}

const Tabs = ({ tabContent = [] }: Props) => {
   return (
      <div className="panel" id="line">
         <div className="mb-5">
            <Tab.Group>
               <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                  {tabContent.map((item) => (
                     <Tab as={Fragment}>
                        {({ selected }) => (
                           <button
                              className={`${selected ? 'text-secondary !outline-none before:!w-full' : ''}
                                                    relative -mb-[1px] flex items-center gap-2 p-5 py-3 before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:inline-block before:h-[1px] before:w-0 before:bg-secondary before:transition-all before:duration-700 hover:text-secondary hover:before:w-full`}
                           >
                              {item.icon && item.icon}
                              <span className="flex items-center">{item.title}</span>
                           </button>
                        )}
                     </Tab>
                  ))}
               </Tab.List>
               <Tab.Panels>
                  {tabContent.map((item) => (
                     <Tab.Panel>
                        <div className="active pt-5">{item.content}</div>
                     </Tab.Panel>
                  ))}
               </Tab.Panels>
            </Tab.Group>
         </div>
      </div>
   );
};

export default Tabs;
