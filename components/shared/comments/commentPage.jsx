import { useCommentsQuery } from '@/services/api/getCommentsQuery';
import api from '@/services/interceptor';
import { useCallback, useState } from 'react';
import CommentCard from './features/commentCard';

function CommentPage() {
   const [isApproved, setIsApproved] = useState('');
   const { data, mutate } = useCommentsQuery(isApproved);

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

   return (
      <main>
         {/* <div className="flex justify-center mb-6">
        <CheckBox
          values={[
            { label: "همه", value: "" },
            { label: "تایید نشده", value: "false" },
            { label: "تایید شده", value: "true" },
          ]}
          defaultValue={""}
          onChange={({ value }) => setIsApproved(value)}
        />
      </div> */}
         <div className="grid gap-3 md:grid-cols-2">
            {data && data?.map((com) => <CommentCard key={com.id} {...com} handleApprove={handleApprove} handleDelete={handleDelete} />)}
         </div>
      </main>
   );
}

export default CommentPage;
