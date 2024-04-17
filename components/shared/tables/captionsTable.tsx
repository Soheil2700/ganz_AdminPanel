import { useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

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

const CaptionsTable = ({
   title = 'table example',
   headers = [
      { label: 'name', type: 'text', name: 'name' },
      { label: 'Email', type: 'text', name: 'email' },
      { label: 'Status', type: 'status', name: 'status' },
      { label: 'Register', type: 'text', name: 'register' },
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
                        <tr key={data.id} className="group relative">
                           <td>
                              <div className="whitespace-nowrap">{index + 1}</div>
                           </td>
                           {headers.map((i) => (
                              <>
                                 <td>
                                    <div
                                       className={`whitespace-nowrap ${
                                          i.type === 'status' && data[i.name] === 'Completed'
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
                              </>
                           ))}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default CaptionsTable;
