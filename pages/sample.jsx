import React, { useState } from 'react';
import SForm from '../components/shared/formInputs/SForm';
import UploadBox from '../components/shared/UploadBox';
import Stepper from '../components/shared/Stepper';
import IconUser from '../components/Icon/IconUser';
import IconHome from '../components/Icon/IconHome';
import HoverTable from '@/components/shared/tables/hoverTable';
import Tabs from '../components/shared/Tabs';
import LineChart from '@/components/shared/charts/lineChart';
import AreaChart from '@/components/shared/charts/areaChart';
import PieChart from '@/components/shared/charts/pieChart';
import DonutChart from '@/components/shared/charts/donutChart';
import Accordion from '../components/shared/Accordion';

const Sample = () => {
   const [activeStep, setActiveStep] = useState(1);
   const [active, setActive] = useState('1');
   const formStructure = [
      {
         label: 'متن عادی',
         name: 'text',
         type: 'text',
         // required: true,
      },
      {
         label: 'پسورد',
         name: 'password',
         type: 'password',
         // required: true,
      },
      {
         label: 'مولتی',
         name: 'multiSelect',
         type: 'multi_select',
         // required: true,
      },
      {
         label: 'فایل',
         name: 'file',
         type: 'file',
         required: true,
      },
      {
         label: 'دسته بندی',
         name: 'categoryName',
         type: 'select',
         options: [
            { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
            { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
            { value: 'purple', label: 'Purple', color: '#5243AA' },
            { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
            { value: 'orange', label: 'Orange', color: '#FF8B00' },
            { value: 'yellow', label: 'Yellow', color: '#FFC400' },
            { value: 'green', label: 'Green', color: '#36B37E' },
            { value: 'forest', label: 'Forest', color: '#00875A' },
            { value: 'slate', label: 'Slate', color: '#253858' },
            { value: 'silver', label: 'Silver', color: '#666666' },
         ],
         optionId: 'name',
         optionLabel: 'label',
         required: true,
      },
      {
         label: 'چک',
         name: 'checkbox',
         type: 'checkbox',
         col: 1,
         // required: true,
      },
      {
         label: 'سوییچ',
         name: 'indicator',
         type: 'indicator',
         col: 1,
         // required: true,
      },
      {
         label: 'چک',
         name: 'checkbox',
         type: 'checkbox',
         col: 1,
         // required: true,
      },
      {
         label: 'متن بزرگ',
         name: 'textarea',
         type: 'textarea',
         required: true,
      },
   ];
   const steps = [
      {
         label: 'مرحله اول',
         icon: <IconUser className="h-5 w-5" />,
         content: (
            <SForm
               formStructure={formStructure}
               submitHandler={(val) => console.log(val)}
               buttons={[
                  {
                     label: 'ثبت',
                     type: 'submit',
                     // isLoading: true,
                  },
               ]}
            />
         ),
      },
      { label: 'مرحله اول', icon: <IconUser className="h-5 w-5" />, content: <IconHome /> },
      { label: 'مرحله اول', icon: <IconUser className="h-5 w-5" />, content: <IconUser className="h-5 w-5" /> },
      { label: 'مرحله اول', icon: <IconUser className="h-5 w-5" />, content: <IconHome /> },
   ];
   return (
      <div className="flex flex-col gap-2">
         <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
         {/* <UploadBox /> */}
         <Tabs
            tabContent={[
               { title: 'تب 1', icon: <IconHome />, content: <p>به تو چه</p> },
               { title: 'تب 2', icon: <IconUser />, content: <p>اوکیه</p> },
            ]}
         />
         <Accordion
            active={active}
            setActive={setActive}
            accordionContent={[
               { title: 'اولی', icon: <IconHome />, content: <p>چرت و پرت</p> },
               { title: 'اولی', icon: <IconHome />, content: <p>چرت و پرت</p> },
            ]}
         />
         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LineChart
               title="Line Chart"
               name="Line Chart"
               data={[45, 55, 75, 25, 45, 110]}
               height={300}
               colors={['#4361EE']}
               width={2}
               xCategory={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June']}
            />

            <AreaChart
               title="AreaChart"
               name="Income"
               data={[16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000]}
               height={300}
               colors={['#805dca']}
               width={2}
               labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            />

            <PieChart
               title="PieChart"
               labels={['Team A', 'Team B', 'Team C', 'Team D', 'Team E']}
               width={200}
               height={300}
               data={[44, 55, 13, 43, 22]}
               colors={['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f']}
            />

            <DonutChart
               width={200}
               height={300}
               colors={['#4361ee', '#805dca', '#e2a03f']}
               labels={['Team A', 'Team B', 'Team C']}
               data={[44, 55, 13]}
            />
         </div>

      </div>
   );
};

export default Sample;
