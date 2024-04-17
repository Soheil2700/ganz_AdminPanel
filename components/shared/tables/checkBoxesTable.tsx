import { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconPencil from '@/components/Icon/IconPencil';
import IconSettings from '@/components/Icon/IconSettings';

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
}

const CheckBoxesTable = ({
   title = 'table example',
   iconActionsTitle = 'Delete',
   headers = [
      { label: 'name', type: 'text', name: 'name' },
      { label: 'sale', type: 'text', name: 'sale' },
      { label: 'status', type: 'status', name: 'status' },
      { label: 'Date', type: 'date', name: 'date' },
   ],
   tableData = [
      {
         id: 1,
         name: 'John Doe',
         email: 'johndoe@yahoo.com',
         date: '10/08/2020',
         sale: 120,
         status: 'Completed',
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
   iconActions = <IconTrashLines className="m-auto" />,
}: Props) => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setPageTitle('Tables'));
   });
   const moment = require('moment-jalaali');

   return (
      <div className="panel">
         <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
         </div>
         <div className="table-responsive mb-5">
            <table>
               <thead>
                  <tr>
                     {[{ label: '#' }, { label: 'ردیف' }, ...headers]?.map((i, index) => (
                        <th className={index === 0 ? 'rounded-r-md' : index === headers.length ? 'rounded-l-md' : ''}>{i.label}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {tableData.map((data, index) => {
                     return (
                        <tr key={data.id} className="relative">
                           <td>
                              <input type="checkbox" className="form-checkbox" />
                           </td>
                           <td>
                              <div className="whitespace-nowrap">{index + 1}</div>
                           </td>
                           {headers?.map((i) => (
                              <td>
                                 <div
                                    className={`whitespace-nowrap ${
                                       i.type === 'status' && data[i.name] === 'completed'
                                          ? 'text-success'
                                          : data[i.name] === 'Pending'
                                          ? 'text-secondary'
                                          : data[i.name] === 'UNPAID'
                                          ? 'text-info'
                                          : data[i.name] === 'Canceled'
                                          ? 'text-danger'
                                          : ''
                                    }`}
                                 >
                                    {i.type === 'date' ? moment(data[i.name]).format('jYYYY/jM/jD') : data[i.name]}
                                 </div>
                              </td>
                           ))}
                           <td className="absolute left-1 top-0 text-center">
                              <ul className="flex items-center justify-center gap-2">
                                 <li>
                                    <Tippy content="Settings">
                                       <button type="button">
                                          <IconSettings className="h-5 w-5 text-primary" />
                                       </button>
                                    </Tippy>
                                 </li>
                              </ul>
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

export default CheckBoxesTable;
