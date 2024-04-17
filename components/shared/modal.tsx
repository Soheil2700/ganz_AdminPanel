import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/shared/Button';

interface Props {
   open: boolean;
   setOpen: any;
   title: string;
   content: any;
   size?: string;
   buttons?: {}[];
}

const Modal = ({ open = false, setOpen = () => {}, title, content, size = 'small', buttons = [] }: Props) => {
   return (
      <>
         {/* <!-- Modal --> */}
         <AnimatePresence>
            {open && (
               <div className="fixed right-0 top-0 z-50 h-screen w-screen bg-black/25" onClick={() => setOpen(false)}>
                  <motion.div
                     id="modal"
                     tabIndex={-1}
                     className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
                     initial={{
                        opacity: 0,
                        scale: 0.75,
                     }}
                     animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                           ease: 'easeOut',
                           duration: 0.1,
                        },
                     }}
                     exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: {
                           ease: 'easeIn',
                           duration: 0.1,
                        },
                     }}
                  >
                     <div
                        className={`relative w-full ${
                           size === 'medium' ? 'max-w-4xl' : size === 'large' ? 'max-w-7xl' : size === 'fit' ? 'max-w-fit' : 'max-w-lg'
                        } max-h-full`}
                        onClick={(e) => e.stopPropagation()}
                     >
                        {/* <!-- Modal content --> */}
                        {size === 'fit' ? (
                           content
                        ) : (
                           <div className="dark:bg-primaryDark relative rounded-lg bg-white shadow dark:bg-black dark:text-white">
                              {/* <!-- Modal header --> */}
                              <div className="flex flex-row items-center justify-between rounded-t p-3">
                                 <h3 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h3>
                                 <button
                                    type="button"
                                    className="inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-secondary"
                                    data-modal-hide="medium-modal"
                                    onClick={() => setOpen(false)}
                                 >
                                    <svg
                                       aria-hidden="true"
                                       className="h-5 w-5"
                                       fill="currentColor"
                                       viewBox="0 0 20 20"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                       ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                 </button>
                              </div>
                              {/* <!-- Modal body --> */}
                              <div className="space-y-6 p-6">{content}</div>
                              {/* <!-- Modal footer --> */}
                              {buttons.length ? (
                                 <div className="flex items-center justify-center space-x-2 rounded-b p-6">
                                    {buttons.map((item, index) => {
                                       return <Button key={index} id={index} {...item} />;
                                    })}
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </div>
                        )}
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </>
   );
};

export default Modal;
