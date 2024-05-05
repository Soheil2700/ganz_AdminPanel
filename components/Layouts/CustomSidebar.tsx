import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconMinus from '../Icon/IconMinus';
import Link from 'next/link';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconTicket from '@/components/Icon/IconChatDot';
import IconProduct from '@/components/Icon/IconBox';
import IconCategory from '@/components/Icon/IconArchive';
import IconTag from '../Icon/IconTag';
import IconBarChart from '../Icon/IconBarChart';
import IconAttribute from '@/components/Icon/IconListCheck';
import IconShoppingBag from '../Icon/IconShoppingBag';
import IconHome from '../Icon/IconHome';
import { IRootState } from '@/store';

const CustomSidebar = () => {
   const router = useRouter();
   const themeConfig = useSelector((state: IRootState) => state.themeConfig);
   const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);

   useEffect(() => {
      const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
      if (selector) {
         selector.classList.add('active');
         const ul: any = selector.closest('ul.sub-menu');
         if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
            if (ele.length) {
               ele = ele[0];
               setTimeout(() => {
                  ele.click();
               });
            }
         }
      }
   }, []);

   useEffect(() => {
      setActiveRoute();
      if (window.innerWidth < 1024 && themeConfig.sidebar) {
         dispatch(toggleSidebar());
      }
   }, [router.pathname]);

   const setActiveRoute = () => {
      let allLinks = document.querySelectorAll('.sidebar ul a.active');
      for (let i = 0; i < allLinks.length; i++) {
         const element = allLinks[i];
         element?.classList.remove('active');
      }
      const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
      selector?.classList.add('active');
   };

   const dispatch = useDispatch();
   const { t } = useTranslation();
   return (
      <div className={semidark ? 'dark' : ''}>
         <nav
            className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${
               semidark ? 'text-white-dark' : ''
            }`}
         >
            <div className="h-full bg-white dark:bg-black">
               <div className="flex items-center justify-between px-4 py-3">
                  <Link href="/" className="main-logo flex shrink-0 items-center">
                     <img className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" />
                     <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
                        {t('VRISTO')}
                     </span>
                  </Link>

                  <button
                     type="button"
                     className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                     onClick={() => dispatch(toggleSidebar())}
                  >
                     <IconCaretsDown className="m-auto rotate-90" />
                  </button>
               </div>
               <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                  <ul className="relative mt-6 flex flex-col justify-center gap-2 space-y-0.5 p-4 py-0 font-semibold">
                     <li className="menu nav-item">
                        <Link href="/" className="nav-link group">
                           <div className="flex items-center">
                              <IconHome className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 {t('dashboard')}
                              </span>
                           </div>
                        </Link>
                     </li>

                     <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                        <IconMinus className="hidden h-5 w-4 flex-none" />
                        <span>{t('products')}</span>
                     </h2>

                     <li className="menu nav-item">
                        <Link href="/apps/products" className="nav-link group">
                           <div className="flex items-center">
                              <IconProduct className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 تعریف و ویرایش محصول
                              </span>
                           </div>
                        </Link>
                     </li>

                     <li className="menu nav-item">
                        <Link href="/apps/category" className="nav-link group">
                           <div className="flex items-center">
                              <IconCategory className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 دسته بندی ها
                              </span>
                           </div>
                        </Link>
                     </li>

                     <li className="menu nav-item">
                        <Link href="/apps/attribute" className="nav-link group">
                           <div className="flex items-center">
                              <IconAttribute className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 ویژگی ها
                              </span>
                           </div>
                        </Link>
                     </li>

                     {/* <li className="menu nav-item">
                        <Link href="/apps/tags" className="nav-link group">
                           <div className="flex items-center">
                              <IconTag className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 تگ ها
                              </span>
                           </div>
                        </Link>
                     </li> */}

                     <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                        <IconBarChart className="hidden h-5 w-4 flex-none" />
                        <span>مالی</span>
                     </h2>

                     <li className="menu nav-item">
                        <Link href="/apps/orders" className="nav-link group">
                           <div className="flex items-center">
                              <IconShoppingBag className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 سفارشات
                              </span>
                           </div>
                        </Link>
                     </li>

                     <li className="menu nav-item">
                        <Link href="/apps/discount" className="nav-link group">
                           <div className="flex items-center">
                              <IconShoppingBag className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 تخفیفات
                              </span>
                           </div>
                        </Link>
                     </li>

                     {/* <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                        <IconMinus className="hidden h-5 w-4 flex-none" />
                        <span>{t('supports')}</span>
                     </h2>

                     <li className="menu nav-item">
                        <Link href="/apps/tickets" className="nav-link group">
                           <div className="flex items-center">
                              <IconTicket className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 {t('tickets')}
                              </span>
                           </div>
                        </Link>
                     </li> */}

                     {/* <li className="menu nav-item">
                        <Link href="https://vristo.sbthemes.com" target="_blank" className="nav-link group">
                           <div className="flex items-center">
                              <IconMenuDocumentation className="shrink-0 group-hover:!text-primary" />
                              <span className="text-black ltr:pl-3 rtl:pr-3 dark:text-white-light dark:group-hover:text-white-dark">
                                 {t('documentation')}
                              </span>
                           </div>
                        </Link>
                     </li> */}
                  </ul>
               </PerfectScrollbar>
            </div>
         </nav>
      </div>
   );
};

export default CustomSidebar;
