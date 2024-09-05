import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import Button from '@/components/shared/Button';
import IconPlus from '@/components/Icon/IconPlus';
import SForm from '@/components/shared/formInputs/SForm';
import Modal from '@/components/shared/modal';
import api from '@/services/interceptor';
import { notifyError, notifySuccess } from '@/components/shared/notify/SNotify';
import Image from 'next/image';
import IconTrash from '@/components/Icon/IconTrash';

const Banners = () => {
   const dispatch = useDispatch();
   const [openModal, setOpenModal] = useState(false);
   const submitHandler = (values) => {
      //   api.post(`api/common/upload-image?link="${formValues?.link}"`, values.image)
      //      .then(() => {
      //         notifySuccess('بنر با موفقیت اضافه شد.');
      //         setLoading(true);
      //         api.get('api/common/landing-page')
      //            .then((res) => {
      //               setAllData(res?.data);
      //            })
      //            .catch(() => notifyError('خطایی رخ داده است'))
      //            .finally(() => setLoading(false));
      //      })
      //      .catch(() => notifyError('خطا در افزودن بنر.'));
   };
   const [allData, setAllData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [image, setImage] = useState([]);
   const [formValues, setFormValues] = useState({});

   useEffect(() => {
      setLoading(true);
      api.get('api/common/landing-page')
         .then((res) => {
            setAllData(res?.data);
         })
         .catch((res) => notifyError('خطایی رخ داده است'))
         .finally(() => setLoading(false));
   }, []);

   useEffect(() => {
      dispatch(setPageTitle('مدیریت بنر ها'));
   }, []);

   return (
      <div className="flex flex-col gap-8">
         <div className="flex gap-2">
            <Button
               label="ایجاد بنر"
               icon={<IconPlus />}
               onClick={() => {
                  setOpenModal(true);
               }}
            />
         </div>
         <div className="grid grid-cols-1 justify-items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
            {loading
               ? Array.from(Array(6).keys()).map((item, i) => (
                    <div key={i} className="relative h-52 w-full animate-pulse overflow-hidden rounded-lg bg-slate-200 lg:h-64"></div>
                 ))
               : allData?.banners?.map((banner) => (
                    <div className="relative h-52 w-full overflow-hidden rounded-lg border shadow-lg lg:h-64">
                       <Image
                          alt="banner"
                          width={400}
                          height={350}
                          className="h-full w-full"
                          src={process.env.NEXT_PUBLIC_BASE_URL + banner?.image}
                       />
                       <span
                          className="absolute right-2 top-2 flex cursor-pointer rounded-full bg-primary p-1 transition-all"
                          onClick={() => {
                             api.delete(`api/common/remove-file/${banner?.id}`)
                                .then(() => {
                                   notifySuccess('بنر با موفقیت حذف شد.');
                                   setLoading(true);
                                   api.get('api/common/landing-page')
                                      .then((res) => {
                                         setAllData(res?.data);
                                      })
                                      .catch(() => notifyError('خطایی رخ داده است'))
                                      .finally(() => setLoading(false));
                                })
                                .catch(() => notifyError('خطا در حذف بنر.'));
                          }}
                       >
                          <IconTrash className="text-white-light" />
                       </span>
                    </div>
                 ))}
         </div>
         <Modal
            open={openModal}
            setOpen={setOpenModal}
            title="تعریف پکیج"
            size="medium"
            content={
               <SForm
                  formStructure={[
                     {
                        label: 'لینک بنر',
                        name: 'link',
                        type: 'text',
                        required: true,
                        onChange: (val) => setFormValues(val),
                        col: 6,
                     },

                     {
                        label: 'تصویر بنر',
                        name: 'image',
                        title: 'عکس بنر را بارگذاری نمایید',
                        type: 'file',
                        multiple: false,
                        required: true,
                        col: 6,
                        customOnChange: (value) => {
                           setImage(value[0]);
                        },
                     },
                  ]}
                  submitHandler={() => {
                     const formData = new FormData();
                     formData.append('image', image);
                     console.log({ ...formValues, image: formData });
                     submitHandler({ ...formValues, image: formData });

                     //  if (image) {
                     //     const formData = new FormData();
                     //     console.log(formData);
                     //     submitHandler({ ...formValues, image: formData.append('image', image) });
                     //  }
                  }}
               />
            }
         />
      </div>
   );
};

export default Banners;
