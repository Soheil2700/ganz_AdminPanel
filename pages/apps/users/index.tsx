import React from 'react';
import { useUsersQuery } from '@/services/api/getUsersQuery';
import UserCard from '@/components/shared/userCard';

const Users = () => {
   const { data, isLoading } = useUsersQuery();

   return (
      <div className="grid grid-cols-1 flex-wrap gap-1 sm:mt-32 sm:grid-cols-2 sm:gap-y-32 lg:grid-cols-3 xl:grid-cols-4">
         {!isLoading && data.map((user: {}, index) => <UserCard key={index} {...user} />)}
      </div>
   );
};

export default Users;
