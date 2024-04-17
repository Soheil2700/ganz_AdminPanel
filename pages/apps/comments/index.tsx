import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PermissionChecker from '@/components/permissionChecker';
import { setPageTitle } from '@/store/themeConfigSlice';
import { useCommentsQuery } from '@/services/api/getCommentsQuery';
import api from '@/services/interceptor';
import CommentPage from '@/components/shared/comments/commentPage';

const Comments = () => {
   const [isApproved, setIsApproved] = useState('');
   const { data, mutate } = useCommentsQuery(isApproved);
   const dispatch = useDispatch();

   const handleDelete = useCallback(
      (id) =>
         new Promise((resolve) => {
            api.delete('admin/api/comment/' + id)
               .then(() => {
                  resolve();
                  mutate((prev) => {
                     const copy = [...prev];
                     const changedIndex = copy.findIndex((cm) => cm.id === id);
                     copy.splice(changedIndex, 1);
                     return copy;
                  });
               })
               .catch((err) => {
                  resolve();
                  console.log(err);
               });
         }),
      []
   );
   const handleApprove = useCallback(
      (id) =>
         new Promise((resolve) => {
            api.patch('admin/api/comment/approve/' + id)
               .then(() => {
                  resolve();
                  mutate((prev) => {
                     const copy = [...prev];
                     const changedIndex = copy.findIndex((cm) => cm.id === id);
                     copy[changedIndex].approved = true;
                     return copy;
                  });
               })
               .catch((err) => {
                  console.log(err);
                  resolve();
               });
         }),
      []
   );

   useEffect(() => {
      dispatch(setPageTitle('نظرات'));
   }, []);
   console.log(data);

   return (
      <PermissionChecker roles={['ADMIN']}>
         <CommentPage />
      </PermissionChecker>
   );
};

export default Comments;
