import React from 'react';
import useAuthUser from '@/services/api/getAuthUserQuery.api';
import Image from 'next/image';
import ad from '@/assets/images/ad.jpg';

const PermissionChecker = ({ roles = [], children }) => {
   const { data, isLoading } = useAuthUser();
   if (isLoading) {
      return <></>;
   }
   if (!isLoading && !['OWNER', ...roles].find((role) => role === data.role)) {
      return (
         <div className="flex justify-center">
            <Image src={ad} className="object-contain" width={800} height={800} />
         </div>
      );
   }
   return <>{children}</>;
};

export default PermissionChecker;
