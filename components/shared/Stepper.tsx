import React from 'react';

interface Porps {
   steps: any[];
   activeStep: number;
   setActiveStep: any;
   hideButtons: boolean;
   clickable?: boolean;
}

const Stepper = ({ steps = [], activeStep = 1, setActiveStep = () => {}, clickable = false, hideButtons = false }: Porps) => {
   let col = 'grid-cols-' + steps.length;
   let calc = activeStep === steps.length ? '100%' : (100 / (2 * steps.length)) * (2 * activeStep - 1) + '%';
   return (
      <div className="dark:bg-black">
         <div className="mb-5 flex flex-col ">
            <div className="mt-4 inline-block w-full">
               <div className="relative z-[1]">
                  <div
                     className={`rtl:right-45 absolute top-[30px] -z-[1] m-auto h-1 bg-primary transition-[width] ltr:left-0`}
                     style={{ width: calc }}
                  ></div>
                  <ul className={`mb-5 grid ${col}`}>
                     {steps.map((item: any, index) => (
                        <li className="mx-auto flex flex-col items-center">
                           <button
                              type="button"
                              className={`${activeStep === index + 1 ? '!border-primary !bg-primary text-white' : ''}
                                                flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#f3f2ee] bg-white dark:border-[#1b2e4b] dark:bg-[#253b5c]`}
                              onClick={() => clickable && setActiveStep(index + 1)}
                           >
                              {item.icon}
                           </button>
                           <span className={`${activeStep === 1 ? 'text-primary ' : ''}text-center mt-2 block`}>{item.label}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               {steps[activeStep - 1].content}
            </div>
            {!hideButtons && (
               <div className="flex justify-between">
                  <button
                     type="button"
                     className={`btn btn-primary ${activeStep === 1 ? 'hidden' : ''}`}
                     onClick={() => (activeStep !== 1 ? setActiveStep(activeStep - 1) : {})}
                  >
                     مرحله قبل
                  </button>
                  <button
                     type="button"
                     className="btn btn-primary ltr:ml-auto rtl:mr-auto"
                     onClick={() => (activeStep !== steps.length ? setActiveStep(activeStep + 1) : {})}
                  >
                     {activeStep === steps.length ? 'ثبت' : 'مرحله بعد'}
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default Stepper;
