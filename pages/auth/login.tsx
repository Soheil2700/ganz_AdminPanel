import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';
import IconPhone from '@/components/Icon/IconPhone';
import IconLockDots from '@/components/Icon/IconLockDots';
import IconInstagram from '@/components/Icon/IconInstagram';
import IconGoogle from '@/components/Icon/IconGoogle';
import api from '@/services/interceptor';
import { notifyError, notifyWarning } from '../../components/shared/notify/SNotify';
import { useSWRConfig } from 'swr';

const Login = () => {
   const [formValues, setFormValues] = useState({ mobile: '', otp: '', mode: 'check' });
   const [show, setShow] = useState(false);
   const dispatch = useDispatch();
   const { mutate, cache } = useSWRConfig();
   const router = useRouter();

   const submitForm = useCallback(
      (e: {}) => {
         e.preventDefault();
         // router.push('/');
         const { mode } = formValues;
         if (mode === 'check') {
            api.post('auth/check', { mobile: formValues.mobile.replace('0', '+98') })
               .then((res) => {
                  if (res.data?.code === 102) notifyWarning('ابتدا از طریق وبسایت حساب کاربری ایجاد کنید');
                  else if (res.data?.code === 101) {
                     setShow(true);
                     setFormValues((prev) => ({ ...prev, mode: 'login' }));
                  }
               })
               .catch((err) => {});
         } else {
            api.post('auth/login', {
               ...formValues,
               mobile: formValues.mobile.replace('0', '+98'),
            })
               .then((res) => {
                  mutate('get-user', res.data.user, { revalidate: false });
                  router.push('/');
               })
               .catch((err) => notifyError('کد وارد شده نامعتبر است!'));
         }
      },
      [formValues]
   );

   const handleChange = (e: {}) => {
      setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   useEffect(() => {
      dispatch(setPageTitle('ورود'));
   }, []);

   return (
      <div>
         <div className="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
         </div>

         <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 sm:px-16 dark:bg-[#060818]">
            <img
               src="/assets/images/auth/coming-soon-object1.png"
               alt="image"
               className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2"
            />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
            <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
               <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg lg:min-h-[758px] dark:bg-black/50">
                  <div className="mx-auto w-full max-w-[440px]">
                     <div className="mb-10">
                        <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">ورود</h1>
                        <p className="text-base font-bold leading-normal text-white-dark">برای ورود شماره موبایل خود را وارد کنید</p>
                     </div>
                     <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                        <div>
                           <label htmlFor="Mobile">موبایل</label>
                           <div className="relative text-white-dark">
                              <input
                                 id="Mobile"
                                 name="mobile"
                                 type="text"
                                 disabled={show}
                                 placeholder="شماره موبایل خود را وارد کنید"
                                 className="form-input ps-10 placeholder:text-white-dark"
                                 onChange={handleChange}
                              />
                              <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                 <IconPhone fill={true} />
                              </span>
                           </div>
                        </div>
                        {show && (
                           <div>
                              <label htmlFor="OTP">کد ارسالی</label>
                              <div className="relative text-white-dark">
                                 <input
                                    id="OTP"
                                    name="otp"
                                    type="password"
                                    placeholder="کد ارسالی را وارد کنید"
                                    className="form-input ps-10 placeholder:text-white-dark"
                                    onChange={handleChange}
                                 />
                                 <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                    <IconLockDots fill={true} />
                                 </span>
                              </div>
                           </div>
                        )}
                        <button
                           type="submit"
                           className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                        >
                           ورود
                        </button>
                     </form>
                     <div className="relative my-7 text-center md:mb-9">
                        <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                        <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">
                           یا
                        </span>
                     </div>
                     <div className="mb-10 md:mb-[60px]">
                        <ul className="flex justify-center gap-3.5 text-white">
                           <li>
                              <Link
                                 href="#"
                                 className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                 style={{
                                    background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)',
                                 }}
                              >
                                 <IconInstagram />
                              </Link>
                           </li>
                           <li>
                              <Link
                                 href="#"
                                 className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                 style={{
                                    background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)',
                                 }}
                              >
                                 <IconGoogle />
                              </Link>
                           </li>
                        </ul>
                     </div>
                     <div className="text-center dark:text-white">
                        حساب کاربری ندارید ?&nbsp;
                        <Link
                           href="/auth/boxed-signup"
                           className="uppercase text-primary underline transition hover:text-black dark:hover:text-white"
                        >
                           ورود
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
Login.getLayout = (page: any) => {
   return <BlankLayout>{page}</BlankLayout>;
};
export default Login;
