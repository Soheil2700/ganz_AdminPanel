import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import PermissionChecker from '@/components/permissionChecker';
import { useProductsQuery } from '@/services/api/getProductsQuery';
import Button from '@/components/shared/Button';
import IconPlus from '@/components/Icon/IconPlus';
import Modal from '@/components/shared/modal';
import Stepper from '@/components/shared/Stepper';
import IconUser from '@/components/Icon/IconUser';
import StepOne from './tabs/stepOne';
import StepTwo from './tabs/stepTwo';
import api from '@/services/interceptor';
import IconTrash from '@/components/Icon/IconTrash';
import IconEdit from '@/components/Icon/IconEdit';
import { notifySuccess } from '@/components/shared/notify/SNotify';
import DetailProuduct from '@/components/shared/detailProuduct';
import DropDownMenu from '../../../components/shared/dropDownMenu/DropDownMenu';
import IconSquareCheck from '@/components/Icon/IconSquareCheck';
import SForm from '@/components/shared/formInputs/SForm';

const Products = () => {
   const [openModal, setOpenModal] = useState(false);
   const [openDetailModal, setOpenDetailModal] = useState(false);
   const [activeStep, setActiveStep] = useState(1);
   const [categoryName, setCategoryName] = useState('');
   const { data, isLoading, mutate } = useProductsQuery();
   const [productData, setProductData] = useState({});
   const [editData, setEditData] = useState({});
   const [editPhase, setEditPhase] = useState(false);
   const [proId, setProId] = useState(null);
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [discountCodes, setDiscountCodes] = useState([]);
   const [openDiscountModal, setOpenDiscountModal] = useState(false);
   const dispatch = useDispatch();

   const sendData = (values: any) => {
      let arr = [];
      arr = Object.entries(values).map(([key, val]) => ({ id: +val }));
      if (editPhase) {
         if (!values.image) {
            delete values.images;
         } else {
            const formData = new FormData();
            Array.from(values.images).forEach((i) => formData.append('image', i));
            api.post(`api/product/${editData.id}/image`, formData)
               .then((response) => {
                  mutate((prvs) => {
                     const products = [...prvs.products];
                     products.push({ ...editData, images: response.data.data });
                     return { total: prvs.total + 1, products };
                  });
               })
               .catch((err) => {});
         }
         api.put(`admin/api/product/${editData.id}`, {
            model: values.model,
            slug: values.slug,
            quantity: +values.quantity,
            price: +values.price,
            description: values.description,
         }).then((res) => {
            mutate();
            setOpenModal(false);
            notifySuccess('محصول با موفقیت ویرایش شد');
            setActiveStep(1);
         });
      } else {
         api.post('api/product', {
            ...productData,
            quantity: +productData?.quantity,
            price: +productData?.price,
            attributes: arr.filter((item) => item.id !== 0),
         }).then((res) => {
            if (productData.images) {
               const formData = new FormData();
               Array.from(productData.images).forEach((i) => formData.append('image', i));
               api.post(`api/product/${res.data.data.id}/image`, formData)
                  .then((response) => {
                     mutate((prvs) => {
                        const products = [...prvs.products];
                        products.push({ ...res.data, images: response.data.data });
                        return { total: prvs.total + 1, products };
                     });
                     setOpenModal(false);
                  })
                  .catch((err) => {});
            }
            setActiveStep(1);
            notifySuccess('محصول با موفقیت ایجاد شد');
         });
      }
   };

   const onSubmit = (values: {}) => {
      if (activeStep === 2 || editPhase) {
         sendData(values);
      } else if (activeStep === 1) {
         setProductData((prev) => ({ ...prev, ...values }));
         setActiveStep(2);
      }
   };

   const steps = editPhase
      ? [
           {
              label: 'جزئیات',
              icon: <IconUser className="h-5 w-5" />,
              content: (
                 <StepOne
                    setCategoryName={setCategoryName}
                    setActiveStep={setActiveStep}
                    onSubmit={onSubmit}
                    editPhase={editPhase}
                    editData={editPhase ? editData : {}}
                 />
              ),
           },
        ]
      : [
           {
              label: 'جزئیات',
              icon: <IconUser className="h-5 w-5" />,
              content: (
                 <StepOne
                    setCategoryName={setCategoryName}
                    setActiveStep={setActiveStep}
                    onSubmit={onSubmit}
                    editPhase={editPhase}
                    editData={editData}
                 />
              ),
           },
           {
              label: 'ویژگی ها',
              icon: <IconUser className="h-5 w-5" />,
              content: (
                 <StepTwo
                    categoryName={categoryName}
                    setOpenModal={setOpenModal}
                    onSubmit={onSubmit}
                    editPhase={editPhase}
                    editData={editData}
                 />
              ),
           },
        ];

   useEffect(() => {
      dispatch(setPageTitle('محصولات'));
      // api.get('/admin/api/discount').then((res) => setDiscountCodes(res.data.discounts));
   }, []);

   return (
      // <PermissionChecker roles={['ADMIN', 'SELLER']}>
      <>
         <div className="flex flex-col gap-8">
            <div className="flex gap-2">
               <Button
                  label="ایجاد محصول"
                  icon={<IconPlus />}
                  onClick={() => {
                     setEditData({});
                     setEditPhase(false);
                     setOpenModal(true);
                  }}
               />
               {selectedProducts.length ? (
                  <Button
                     label="تخصیص کد تخفیف"
                     icon={<IconPlus />}
                     onClick={() => {
                        setOpenDiscountModal(true);
                     }}
                  />
               ) : (
                  <></>
               )}
            </div>
            <div className="grid grid-cols-4">
               {!isLoading &&
                  data?.products.map((item, index) => (
                     <div className="mb-5 flex items-center justify-center">
                        <div
                           group-
                           key={index}
                           className="group relative w-full max-w-[19rem] rounded border border-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
                        >
                           <div className="px-6 py-7">
                              <div className="-mx-6 -mt-7 mb-7 h-[215px] overflow-hidden rounded-tl rounded-tr">
                                 <img
                                    src={process.env.NEXT_PUBLIC_BASE_URL + item?.images[item?.images?.length - 1]}
                                    alt="cover"
                                    className="h-full w-full object-cover p-2"
                                 />
                              </div>
                              <h5 className="mb-4 text-xl font-semibold text-[#3b3f5c] dark:text-white-light">{item.title}</h5>
                              <div className="flex items-baseline justify-between">
                                 <p className="text-white-dark">
                                    <span>موجودی : {item.quantity} عدد</span>
                                 </p>
                                 <button
                                    type="button"
                                    className="btn btn-primary mt-6"
                                    onClick={() => {
                                       setOpenDetailModal(true);
                                       setProId(item.id);
                                    }}
                                 >
                                    جزییات
                                 </button>
                              </div>
                           </div>
                           <div className="absolute right-1 top-1 hidden cursor-pointer rounded-full p-1 transition-all group-hover:flex">
                              <DropDownMenu
                                 content={
                                    <>
                                       <span
                                          className="hidden cursor-pointer rounded-full bg-primary p-1 transition-all group-hover:flex"
                                          onClick={() => {
                                             if (item.id) {
                                                api.get('admin/api/product/detail/' + item.id).then((res) => {
                                                   setEditData(res.data);
                                                });
                                             }
                                             setEditPhase(true);
                                             setOpenModal(true);
                                          }}
                                       >
                                          <IconEdit className="text-white-light" />
                                       </span>
                                       <span
                                          className="hidden cursor-pointer rounded-full bg-primary p-1 transition-all group-hover:flex"
                                          onClick={() => {
                                             api.delete(`api/product/${item.id}`).then((res) => notifySuccess('محصول با موفقیت حذف شد'));
                                          }}
                                       >
                                          <IconTrash className="text-white-light" />
                                       </span>
                                    </>
                                 }
                              />
                           </div>
                           {/* <span
                              className="absolute right-1 top-1 hidden cursor-pointer rounded-full bg-primary p-1 transition-all group-hover:flex"
                              onClick={() => {
                                 if (item.id) {
                                    api.get('admin/api/product/detail/' + item.id).then((res) => {
                                       setEditData(res.data);
                                    });
                                 }
                                 setEditPhase(true);
                                 setOpenModal(true);
                              }}
                           >
                              <IconEdit className="text-white-light" />
                           </span>*/}
                           <span
                              className={`absolute left-1 top-1  cursor-pointer rounded-full bg-primary p-1 transition-all group-hover:flex ${
                                 selectedProducts.find((i) => i === item.id) ? 'flex' : 'hidden'
                              }`}
                              onClick={() => {
                                 if (selectedProducts.find((i) => i === item.id)) {
                                    setSelectedProducts((prev) => prev.filter((x) => x !== item.id));
                                 } else {
                                    setSelectedProducts((prev) => [item.id, ...prev]);
                                 }
                              }}
                           >
                              <IconSquareCheck
                                 className={`${selectedProducts.find((i) => i === item.id) ? 'text-green-600' : 'text-white-light'}`}
                              />
                           </span>
                        </div>
                     </div>
                  ))}
            </div>
         </div>
         <Modal
            open={openModal}
            setOpen={setOpenModal}
            title="تعریف محصول"
            size="large"
            content={<Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} hideButtons={true} />}
         />
         <Modal
            open={openDetailModal}
            setOpen={setOpenDetailModal}
            title="جزئیات محصول"
            size="large"
            content={<DetailProuduct proId={proId} />}
         />
         <Modal
            open={openDiscountModal}
            setOpen={setOpenDiscountModal}
            title="تخصیص کد تخفیف"
            size="small"
            content={
               <SForm
                  formStructure={[
                     {
                        label: 'کد تخفیف خود را انتخاب کنید',
                        name: 'discountId',
                        type: 'select',
                        options: discountCodes.filter((item) => item.discountType === 'PRODUCT'),
                        optionId: 'id',
                        optionLabel: 'label',
                        col: 12,
                        required: true,
                     },
                  ]}
                  submitHandler={(val) => {
                     api.put('/admin/api/discount/assign', { discountType: 'PRODUCT', ...val, assignList: selectedProducts }).then(
                        (res) => {
                           notifySuccess('تخفیف تخصیص داده شد');
                           setOpenDiscountModal(false);
                           setSelectedProducts([]);
                        }
                     );
                  }}
                  buttons={[
                     {
                        label: 'ثبت',
                        type: 'submit',
                     },
                  ]}
               />
            }
         />
         {/* </PermissionChecker> */}
      </>
   );
};

export default Products;
