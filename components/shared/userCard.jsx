import Image from 'next/image';
import IconUser from '@/components/Icon/IconUser';
import Key from '@/components/Icon/IconLock';
import User from '@/components/Icon/IconUser';
import DocumentText from '@/components/Icon/IconBookmark';
import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '@/components/shared/modal';
import SForm from '@/components/shared/formInputs/SForm';
import api from '@/services/interceptor';

function UserCard({ id, first_name, last_name, role, mobile, image }) {
   const router = useRouter();
   const navigate = () => router.push('/app/users/' + id);
   const [open1, setOpen1] = useState(false);

   return (
      <>
         <div onClick={navigate} className="ml-24 flex h-48 cursor-pointer items-center transition-all hover:scale-[1.01] sm:ml-0">
            <div className="flex w-full max-w-xs items-center justify-around rounded-3xl bg-white p-4 sm:flex-col dark:bg-primary-dark-light">
               <div className="-my-16 -ml-32 sm:my-0 sm:-mt-28 sm:ml-0" style={{ clipPath: 'url(#roundedPolygon)' }}>
                  {/* {image ? (
            <Image
              width={100}
              height={100}
              className="w-auto h-48"
              src={image}
            />
          ) : ( */}
                  <div className="grid h-48 w-48 place-content-center bg-gray-200 text-8xl text-gray-400 dark:bg-black">
                     <IconUser />
                  </div>
                  {/* )} */}
               </div>
               <div className="flex w-full flex-col space-y-4">
                  <div className="flex flex-col items-end sm:items-center">
                     <h2 className="text-xl font-medium">
                        {first_name} {last_name}
                     </h2>
                     <p dir="ltr" className="text-base font-medium text-gray-400">
                        {mobile}
                     </p>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                     <Key
                        size="18"
                        color="#000"
                        variant="Outline"
                        onClick={(e) => {
                           e.stopPropagation();
                           setOpen1(true);
                        }}
                     />
                     <div className="m-0 flex gap-1">
                        <User size="18" color="#000" />
                        <span className="flex items-center">{role}</span>
                     </div>
                     <DocumentText size="18" color="#000" variant="Outline" />
                  </div>
               </div>
            </div>

            <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
               <defs>
                  {/* <!-- rounded polygon generator => https://weareoutman.github.io/rounded-polygon/ --> */}
                  <clipPath id="roundedPolygon">
                     <path d="M79 6.237604307034a32 32 0 0 1 32 0l52.870489570875 30.524791385932a32 32 0 0 1 16 27.712812921102l0 61.049582771864a32 32 0 0 1 -16 27.712812921102l-52.870489570875 30.524791385932a32 32 0 0 1 -32 0l-52.870489570875 -30.524791385932a32 32 0 0 1 -16 -27.712812921102l0 -61.049582771864a32 32 0 0 1 16 -27.712812921102" />
                  </clipPath>
               </defs>
            </svg>
         </div>
         <Modal
            open={open1}
            setOpen={setOpen1}
            title="نقش"
            content={
               <SForm
                  formStructure={[
                     {
                        label: 'تغییر نقش',
                        name: 'role',
                        type: 'select',
                        options: [
                           // { id: "OWNER", description: "مالک" },
                           { id: 'ADMIN', description: 'ادمین' },
                           { id: 'SELLER', description: 'فروشنده' },
                           { id: 'USER', description: 'کاربر' },
                        ],
                        optionId: 'id',
                        optionLabel: 'description',
                        col: 12,
                     },
                  ]}
                  submitHandler={(val) => {
                     api.put('/admin/api/user/change-role', {
                        ...val,
                        userId: id,
                     });
                  }}
                  buttons={[
                     {
                        label: 'ایجاد',
                        type: 'submit',
                     },
                  ]}
               />
            }
         />
      </>
   );
}

export default memo(UserCard);
