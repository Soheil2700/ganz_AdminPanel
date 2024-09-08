import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import PermissionChecker from '@/components/permissionChecker';
import Button from '@/components/shared/Button';
import IconPlus from '@/components/Icon/IconPlus';
import Modal from '@/components/shared/modal';
import Stepper from '@/components/shared/Stepper';
import StepOne from './tabs/stepOne';
import api from '@/services/interceptor';
import IconTrash from '@/components/Icon/IconTrash';
import IconEdit from '@/components/Icon/IconEdit';
import { notifySuccess } from '@/components/shared/notify/SNotify';
import DetailProuduct from '@/components/shared/detailProuduct';
import DropDownMenu from '../../../components/shared/dropDownMenu/DropDownMenu';
import IconSquareCheck from '@/components/Icon/IconSquareCheck';
import SForm from '@/components/shared/formInputs/SForm';
import moment from 'moment-jalaali';
import { notifyError } from '../../../components/shared/notify/SNotify';
import IconTag from '../../../components/Icon/IconTag';
import ProductAttrs from '../../../components/shared/productAttrs';
import { usePersonalBlendQuery } from '../../../services/api/getPersonalBlendQuery';
import Pagination from '@mui/material/Pagination';

const Products = () => {
   const [openModal, setOpenModal] = useState(false);
   const [openDetailModal, setOpenDetailModal] = useState(false);
   const [activeStep, setActiveStep] = useState(1);
   const [activeAttrStep, setActiveAttrStep] = useState(1);
   const [categoryName, setCategoryName] = useState('');
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
   const [attValue, setAttValue] = useState([]);
   const dispatch = useDispatch();
   const [productId, setProductId] = useState({});
   const [selectedAtt, setSelectedAtt] = useState();
   const [page, setPage] = useState(1);
   const { data, isLoading, mutate } = usePersonalBlendQuery(page);

   const handleChange = (event, value) => {
      setPage(value);
   };
   const getAtt = (category_name) => {
      api.get('api/attribute', {
         params: { category_name },
      }).then((res) => {
         let data = res.data.attributes.map((item) => {
            const label = item.AttributeValue.map((i) => i.label).join('، ');
            return { ...item, label };
         });
         setAttValue(res.data.attributes);
         setAttributes(data);
      });
   };

   const sendData = (values: any) => {
      if (values.slug.length < 4) {
         notifyError('اسلاگ نمیتواند کمتر از 4 کاراکتر باشد');
         return;
      }
      if (values.summary.length < 5 || values.summary.length > 70) {
         notifyError('طول خلاصه محصول باید حداقل 5 کاراکتر و حداکثر 70 کاراکتر باشد.');
         return;
      }
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
         delete values.grind_types;
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
            bulk_cargo: true,
            step: 1,
         })
            .then((res) => {
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
               setProductId(res.data.product.id);
               notifySuccess('محصول با موفقیت ایجاد شد');
            })
            .catch((res) => notifyError('خطایی رخ داده است'));
      }
   };

   const sendAttribute = (values) => {
      api.put('api/attribute/assign-to-product', {
         values,
      })
         .then((res) => {
            setActiveStep(1);
            setOpenModal(false);
         })
         .catch((error) => notifyError('خطا در افزودن ویژگی'));
   };

   const onSubmit = (values) => {
      sendData(values);
      if (activeStep === 2) {
         sendAttribute({ productId, ...values });
      }
   };

   const AttrStep = [
      {
         label: 'تخصیص ویژگی',
         icon: <IconTag className="h-5 w-5" />,
         content: (
            <SForm
               formStructure={[
                  {
                     name: 'attributeId',
                     label: 'ویژگی',
                     type: 'select',
                     options: attributes,
                     optionKey: 'id',
                     optionLabel: 'name',
                     onChange: (val) => {
                        setSelectedAtt(val.attributeId);
                     },
                     required: true,
                     col: 6,
                  },
                  {
                     name: 'attributeValues',
                     label: 'مقدار',
                     type: 'select',
                     options: attValue.find((item) => item.id === selectedAtt)?.AttributeValue || [],
                     optionKey: 'id',
                     optionLabel: 'label',
                     required: true,
                     disabled: !selectedAtt,
                     col: 6,
                  },
               ]}
               submitHandler={(values) => {
                  api.put('api/attribute/assign-to-product', {
                     productId: selectedProducts[0],
                     attributeValues: [values.attributeValues],
                  })
                     .then((res) => {
                        notifySuccess('ویژگی با موفقیت تخصیص داده شد');
                     })
                     .catch((error) => notifyError('خطا در افزودن ویژگی'));
               }}
               disabelPadding={true}
            />
         ),
      },
      {
         label: 'حذف ویژگی',
         icon: <IconTrash className="h-5 w-5" />,
         content: <ProductAttrs proId={proId} />,
      },
   ];
   const steps = editPhase
      ? [
           {
              label: 'جزئیات',
              icon: <IconTag className="h-5 w-5" />,
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
              icon: <IconTag className="h-5 w-5" />,
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
        ];

   useEffect(() => {
      if (selectedProductCategory) {
         getAtt(selectedProductCategory);
      }
   }, [selectedProductCategory]);

   useEffect(() => {
      dispatch(setPageTitle('محصولات'));
      getAtt();
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
            <div className="grid grid-cols-1 justify-items-center gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
               {!isLoading &&
                  data?.products
                     .filter((i) => i.isActive === true)
                     .map((item, index) => (
                        <div className="mb-5 flex w-full items-center justify-center">
                           <div
                              group-
                              key={index}
                              className="group relative w-full rounded border border-white-light bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
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
                              {item.bulk_cargo && (
                                 <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-lg bg-primary px-2 py-1 text-sm text-primary-light">
                                    ترکیب دلخواه
                                 </span>
                              )}
                              <div className="absolute right-1 top-1 flex cursor-pointer flex-col gap-2 rounded-full p-1 transition-all">
                                 <span
                                    className="flex cursor-pointer rounded-full bg-primary p-1 transition-all"
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
                                    className="flex cursor-pointer rounded-full bg-primary p-1 transition-all"
                                    onClick={() => {
                                       api.delete(`api/product/${item.id}`).then((res) => {
                                          mutate();
                                          notifySuccess('محصول با موفقیت حذف شد');
                                       });
                                    }}
                                 >
                                    <IconTrash className="text-white-light" />
                                 </span>
                                 <span
                                    className="flex cursor-pointer rounded-full bg-primary p-1 transition-all"
                                    onClick={() => {
                                       setOpenAttributeModal(true);
                                       setProId(item.slug);
                                       setSelectedProducts([item.id]);
                                    }}
                                 >
                                    <IconPlus className="text-white-light" />
                                 </span>
                              </div>
                              <span
                                 className={`absolute left-1 top-1  cursor-pointer rounded-full bg-primary p-1 transition-all duration-200 group-hover:flex ${
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
            </div>{' '}
            <div className="mt-20 flex w-full justify-center self-end">
               {data?.total / 12 > 1 && (
                  <Pagination
                     count={Math.ceil(data?.total / 12)}
                     page={page}
                     onChange={handleChange}
                     color="primary"
                     boundaryCount={3}
                     siblingCount={3}
                     dir="rtl"
                  />
               )}
            </div>
         </div>
         <Modal
            open={openModal}
            setOpen={setOpenModal}
            title={editPhase ? 'ویرایش محصول' : 'ایجاد محصول'}
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
            open={openAttributeModal}
            setOpen={setOpenAttributeModal}
            title="تخصیص ویژگی"
            size="medium"
            content={
               <Stepper steps={AttrStep} activeStep={activeAttrStep} setActiveStep={setActiveAttrStep} hideButtons={true} clickable />
            }
         />
      </PermissionChecker>
   );
};

export default Products;
