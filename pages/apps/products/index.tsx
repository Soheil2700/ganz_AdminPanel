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
import moment from 'moment-jalaali';

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
   const [selectedProductCategory, setSelectedProductCategory] = useState();
   const [openPackageModal, setOpenPackageModal] = useState(false);
   const [openDiscountModal, setOpenDiscountModal] = useState(false);
   const [openAttributeModal, setOpenAttributeModal] = useState(false);
   const [packageImage, setPackageImage] = useState({});
   const [attributes, setAttributes] = useState([]);
   const dispatch = useDispatch();

   const getAtt = (category_name) => {
      api.get('api/attribute', {
         params: { category_name },
      }).then((res) => {
         let data = res.data.attributes.map((item) => {
            const label = item.AttributeValue.map((i) => i.label).join('، ');
            return { ...item, label };
         });
         setAttributes(data);
      });
   };

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
         delete values.cover;
         api.patch(`api/product/${editData.id}`, {
            ...values,
            quantity: +values.quantity,
            price: +values.price,
         }).then((res) => {
            mutate();
            setOpenModal(false);
            notifySuccess('محصول با موفقیت ویرایش شد');
            setActiveStep(1);
         });
      } else {
         api.post('api/product', {
            ...values,
            quantity: +values?.quantity,
            price: +values?.price,
            // attributes: arr.filter((item) => item.id !== 0),
            bulk_cargo: false,
            step: 1,
         }).then((res) => {
            if (values.images) {
               const formData = new FormData();
               Array.from(values.images).forEach((i) => formData.append('image', i));
               api.post(`api/product/${res.data.product.id}/image`, formData)
                  .then((response) => {
                     mutate((prvs) => {
                        const products = [...prvs.products];
                        products.push({ ...res.data, images: response.data.data });
                        return { total: prvs.total + 1, products };
                     });
                  })
                  .catch((err) => {});
            }
            setProductData(res.data.product);
            setActiveStep(2);
            notifySuccess('محصول با موفقیت ایجاد شد');
         });
      }
   };

   const onSubmit = (values) => {
      if (activeStep === 1) {
         sendData(values);
      } else {
         api.put('api/attribute/assign-to-product', {
            productId: productData.id,
            attributeValues: values,
         }).then((res) => {
            setActiveStep(1);
            setOpenModal(false);
         });
      }
   };

   const packageSubmit = (values) => {
      if (editPhase) {
         if (!values.image) {
            delete values.images;
         } else {
            const formData = new FormData();
            Array.from(packageImage).forEach((i) => formData.append('image', i));
            api.post(`api/product/${editData.id}/image`, formData)
               .then((response) => {})
               .catch((err) => {});
         }
         delete values.cover;
         api.patch(`api/product/${editData.id}`, {
            ...values,
            quantity: +values.quantity,
            price: +values.price,
         }).then((res) => {
            mutate();
            setOpenPackageModal(false);
            notifySuccess('پکیج با موفقیت ویرایش شد');
            setActiveStep(1);
         });
      } else {
         api.post('api/product', {
            ...values,
            quantity: +values?.quantity,
            price: +values?.price,
            // attributes: arr.filter((item) => item.id !== 0),
            // bulk_cargo: false,
            // step: 1,
         }).then((res) => {
            if (values.images) {
               const formData = new FormData();
               Array.from(packageImage).forEach((i) => formData.append('image', i));
               api.post(`api/product/${res.data.product.id}/image`, formData)
                  .then((response) => {
                     setOpenPackageModal(false);
                  })
                  .catch((err) => {});
            }
            setActiveStep(1);
            notifySuccess('پکیج با موفقیت ایجاد شد');
         });
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
      if (selectedProductCategory) {
         getAtt(selectedProductCategory);
      }
   }, [selectedProductCategory]);

   useEffect(() => {
      dispatch(setPageTitle('محصولات'));
      getAtt();
      // api.get('/admin/api/discount').then((res) => setDiscountCodes(res.data.discounts));
   }, []);

   return (
      <PermissionChecker roles={['ADMIN', 'SELLER']}>
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
               {selectedProducts.length === 1 ? (
                  <Button
                     label="تخصیص ویژگی"
                     icon={<IconPlus />}
                     onClick={() => {
                        setOpenAttributeModal(true);
                     }}
                  />
               ) : (
                  <></>
               )}
               {selectedProducts.length ? (
                  <>
                     <Button
                        label="ایجاد پکیج"
                        icon={<IconPlus />}
                        onClick={() => {
                           setEditData({});
                           setEditPhase(false);
                           setOpenPackageModal(true);
                        }}
                     />
                     <Button
                        label="تخصیص کد تخفیف"
                        icon={<IconPlus />}
                        onClick={() => {
                           setOpenDiscountModal(true);
                        }}
                     />
                  </>
               ) : (
                  <></>
               )}
            </div>
            <div className="grid grid-cols-4">
               {!isLoading &&
                  data?.products
                     .filter((i) => i.isActive === true)
                     .map((item, index) => (
                        <div className="mb-5 flex items-center justify-center">
                           <div
                              group-
                              key={index}
                              className="group relative w-full max-w-[19rem] rounded border border-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
                           >
                              <div className="px-6 py-7">
                                 <div className="-mx-6 -mt-7 mb-7 h-[215px] overflow-hidden rounded-tl rounded-tr">
                                    <img
                                       src={process.env.NEXT_PUBLIC_BASE_URL + item?.cover}
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
                                          setProId(item.slug);
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
                                                if (item.slug) {
                                                   api.get(`api/product/${item.slug}`).then((res) => {
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
                                                api.delete(`api/product/${item.id}`).then((res) => {
                                                   mutate();
                                                   notifySuccess('محصول با موفقیت حذف شد');
                                                });
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
                                    setSelectedProductCategory(item.categoryName);
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
            size="medium"
            content={
               <SForm
                  formStructure={[
                     {
                        label: 'نام تخفیف',
                        name: 'label',
                        type: 'text',
                        col: 4,
                        required: true,
                     },
                     {
                        label: 'درصد',
                        name: 'percent',
                        type: 'number',
                        col: 4,
                        required: true,
                     },
                     {
                        label: 'تاریخ شروع',
                        name: 'fromDate',
                        type: 'date',
                        col: 4,
                        required: true,
                     },
                     {
                        label: 'تاریخ پایان',
                        name: 'thruDate',
                        type: 'date',
                        col: 4,
                        required: true,
                     },
                  ]}
                  submitHandler={(val) => {
                     api.post('api/discount', {
                        ...val,
                        percent: +val.percent,
                        fromDate: moment(val.fromDate).format('YYYY-MM-DD'),
                        thruDate: moment(val.thruDate).format('YYYY-MM-DD'),
                        product_ids: selectedProducts,
                     }).then((res) => {
                        notifySuccess('تخفیف تخصیص داده شد');
                        setOpenDiscountModal(false);
                        setSelectedProducts([]);
                     });
                  }}
               />
            }
         />
         <Modal
            open={openPackageModal}
            setOpen={setOpenPackageModal}
            title="تعریف پکیج"
            size="large"
            content={
               <SForm
                  formStructure={[
                     {
                        label: 'نام محصول',
                        name: 'title',
                        type: 'text',
                        required: true,
                     },
                     {
                        label: 'slug',
                        name: 'slug',
                        type: 'text',
                        required: true,
                     },
                     // {
                     //    label: 'خلاصه محصول',
                     //    name: 'summary',
                     //    type: 'text',
                     //    required: true,
                     // },
                     {
                        label: 'تعداد موجودی',
                        name: 'quantity',
                        type: 'number',
                     },
                     {
                        label: 'قیمت',
                        name: 'price',
                        type: 'number',
                        required: true,
                     },
                     {
                        label: 'تصویر محصول',
                        name: 'image',
                        title: 'عکس محصول را بارگذاری نمایید',
                        type: 'file',
                        multiple: true,
                        customOnChange: (value) => {
                           setPackageImage(value);
                        },
                        disabled: editPhase,
                     },
                     {
                        label: 'توضیحات',
                        name: 'description',
                        type: 'textarea',
                        required: true,
                     },
                  ]}
                  submitHandler={packageSubmit}
               />
            }
         />
         <Modal
            open={openAttributeModal}
            setOpen={setOpenAttributeModal}
            title="تخصیص ویژگی"
            content={
               <SForm
                  formStructure={[
                     {
                        name: 'attributeId',
                        label: 'ویژگی',
                        type: 'multi_select',
                        options: attributes,
                        optionKey: 'id',
                        optionLabel: 'name',
                        required: true,
                        col: 12,
                     },
                  ]}
                  submitHandler={(values) => {
                     api.put('api/attribute/assign-to-product', {
                        productId: selectedProducts[0],
                        attributeValues: values.attributeId,
                     }).then((res) => notifySuccess('ویژگی با موفقیت تخصیص داده شد'));
                  }}
               />
            }
         />
      </PermissionChecker>
   );
};

export default Products;
