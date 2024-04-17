import { useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import IconTrashLines from '@/components/Icon/IconTrashLines';

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

const ProgressTable = ({
   title = 'table example',
   iconActionsTitle = 'Delete',

   headers = [
      { label: 'name', type: 'text', name: 'name' },
      { label: 'sale', type: 'text', name: 'sale' },
      { label: 'status', type: 'status', name: 'status' },
      { label: 'progress', type: 'progress', name: 'progress' },
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
                     {[{ label: 'ردیف' }, ...headers]?.map((i, index) => (
                        <th className={index === 0 ? 'rounded-r-md' : index === headers.length ? 'rounded-l-md' : ''}>{i.label}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {tableData?.map((data, index) => {
                     return (
                        <tr key={data.id} className="relative">
                           <td>
                              <div className="whitespace-nowrap">{index + 1}</div>
                           </td>
                           {headers?.map((i) => (
                              <td>
                                 <div
                                    className={`whitespace-nowrap${
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
                                    {i.type === 'date' ? (
                                       moment(data[i.name]).format('jYYYY/jM/jD')
                                    ) : i.type === 'progress' ? (
                                       <div className="flex items-center gap-2">
                                          {data[i.name]}
                                          <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                             <div
                                                className={`h-1.5 rounded-full rounded-bl-full text-center text-xs text-white ${
                                                   data.status === 'completed'
                                                      ? 'bg-success'
                                                      : data.status === 'Pending'
                                                      ? 'bg-secondary'
                                                      : data.status === 'In Progress'
                                                      ? 'bg-info'
                                                      : data.status === 'Canceled'
                                                      ? 'bg-danger'
                                                      : 'bg-success'
                                                }`}
                                                style={{ width: `${data.progress}` }}
                                             ></div>
                                          </div>
                                       </div>
                                    ) : (
                                       data[i.name]
                                    )}
                                 </div>
                              </td>
                           ))}
                           {/* <td className="absolute left-1 top-0 border-b border-[#ebedf2] p-3 text-center dark:border-[#191e3a] ">
                              <Tippy content={iconActionsTitle}>
                                 <button type="button">{iconActions}</button>
                              </Tippy>
                              <Tippy content={iconActionsTitle}>
                                 <button type="button">{iconActions}</button>
                              </Tippy>
                           </td> */}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default ProgressTable;
