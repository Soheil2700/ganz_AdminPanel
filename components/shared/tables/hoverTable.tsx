import Tippy from '@tippyjs/react';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconEdit from '@/components/Icon/IconEdit';
import 'tippy.js/dist/tippy.css';
import { Button } from '@mui/material';

interface Props {
   title?: string;
   headers?: string[];
   tableData: {
      id?: number;
      name?: string;
      email?: string;
      date?: string;
      sale?: number;
      status?: string;
      register?: string;
      progress?: string;
      position?: string;
      office?: string;
   }[];
   iconActionsTitle?: string;
   iconActions?: any;
   editIconOnClick?: any;
   deleteIconOnClick?: any;
}

const HoverTable = ({
   title = 'table example',
   iconActionsTitle = 'حذف',
   headers = [
      { label: 'name', type: 'text', name: 'name' },
      { label: 'date', type: 'date', name: 'date' },
      { label: 'sale', type: 'text', name: 'sale' },
      { label: 'status', type: 'status', name: 'status' },
   ],
   tableData = [
      {
         id: 1,
         name: 'John Doe',
         email: 'johndoe@yahoo.com',
         date: '10/08/2020',
         sale: 120,
         status: 'completed',
         register: '5 min ago',
         progress: '40%',
         position: 'Developer',
         office: 'London',
      },
      {
         id: 2,
         name: 'Shaun Park',
         email: 'shaunpark@gmail.com',
         date: '11/08/2020',
         sale: 400,
         status: 'Pending',
         register: '11 min ago',
         progress: '23%',
         position: 'Designer',
         office: 'New York',
      },
      {
         id: 3,
         name: 'Alma Clarke',
         email: 'alma@gmail.com',
         date: '12/02/2020',
         sale: 310,
         status: 'UNPAID',
         register: '1 hour ago',
         progress: '80%',
         position: 'Accountant',
         office: 'Amazon',
      },
   ],
   editIconOnClick,
   deleteIconOnClick,
   iconActions,
}: Props) => {
   const moment = require('moment-jalaali');

   return (
      <div className="panel">
         <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
         </div>
         <div className="table-responsive mb-5">
            <table className="table-hover overflow-hidden">
               <thead>
                  <tr>
                     {[{ label: 'ردیف' }, ...headers]?.map((i: any, index) => (
                        <th className={index === 0 ? 'rounded-r-md' : index === headers.length ? 'rounded-l-md' : ''}>{i.label}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {tableData?.map((data: any, index) => {
                     return (
                        <tr key={data.id} className="group relative items-center">
                           <td>
                              <div className="whitespace-nowrap">{index + 1}</div>
                           </td>
                           {headers.map((i: any) => (
                              <>
                                 <td>
                                    <div
                                       className={`whitespace-nowrap ${
                                          i.type === 'status' && data[i.name] === 'POSTED'
                                             ? 'text-success'
                                             : data[i.name] === 'AWAITING_CONFIRMATION'
                                             ? 'text-secondary'
                                             : data[i.name] === 'UNPAID'
                                             ? 'text-info'
                                             : data[i.name] === 'CANCELED'
                                             ? 'text-danger'
                                             : ''
                                       }`}
                                    >
                                       {i.type === 'date' ? moment(data[i.name]).format('jYYYY/jM/jD') : data[i.name]}
                                    </div>
                                 </td>
                              </>
                           ))}
                           <td className="absolute left-1 top-0 hidden items-center gap-2 !p-0 text-center group-hover:flex">
                              {/* <Tippy content={iconActionsTitle}> */}
                              {/* <Button variant="text" onClick={() => editIconOnClick(data)}>
                                    <IconEdit className="m-auto cursor-pointer" />
                                 </Button> */}
                              <Button variant="text" onClick={() => deleteIconOnClick(data)}>
                                 <IconTrashLines className="m-auto cursor-pointer" />
                              </Button>
                              {iconActions}
                              {/* </Tippy> */}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default HoverTable;
