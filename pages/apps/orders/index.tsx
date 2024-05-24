import React, { useState, useEffect } from 'react';
import PermissionChecker from '@/components/permissionChecker';
import api from '@/services/interceptor';
import HoverTable from '@/components/shared/tables/hoverTable';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const Orders = () => {
   const [rows, setRows] = useState([]);
   const dispatch = useDispatch();
   useEffect(() => {
      api.get('/api/order/all-orders').then((res) => setRows(res.data.orders));
      dispatch(setPageTitle('سفارشات'));
   }, []);
   return (
      <PermissionChecker roles={['ADMIN', 'SELLER']}>
         <div className="lg:my-5">
            <HoverTable
               title="سفارشات"
               headers={[
                  { name: 'receiver_name', label: 'سفارش دهنده', type: 'text' },
                  { name: 'send_date', label: 'تاریخ', type: 'date' },
                  { name: 'price', label: 'مبلغ سفارش', type: 'text' },
                  { name: 'status', label: 'وضعیت', type: 'status' },
               ]}
               tableData={rows}
            />
         </div>
      </PermissionChecker>
   );
};

export default Orders;
