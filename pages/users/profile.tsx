import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect } from 'react';
import IconPencilPaper from '@/components/Icon/IconPencilPaper';
import IconCoffee from '@/components/Icon/IconCoffee';
import IconCalendar from '@/components/Icon/IconCalendar';
import IconMapPin from '@/components/Icon/IconMapPin';
import IconMail from '@/components/Icon/IconMail';
import IconPhone from '@/components/Icon/IconPhone';
import IconTwitter from '@/components/Icon/IconTwitter';
import IconDribbble from '@/components/Icon/IconDribbble';
import IconGithub from '@/components/Icon/IconGithub';
import IconShoppingBag from '@/components/Icon/IconShoppingBag';
import IconTag from '@/components/Icon/IconTag';
import IconCreditCard from '@/components/Icon/IconCreditCard';
import IconClock from '@/components/Icon/IconClock';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';
import personPlaceholder from '@/assets/images/personPlaceholder.png';
import Image from 'next/image';
import useAuthUser from '@/services/api/getAuthUserQuery.api';

const Profile = () => {
   const dispatch = useDispatch();
   const { data } = useAuthUser();

   useEffect(() => {
      dispatch(setPageTitle('پروفایل کاربری'));
   });
   const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
   return (
      <div>
         <div className="pt-5">
            <div className="mb-5 grid grid-cols-12 gap-5">
               <div className="panel col-span-3">
                  <div className="mb-5 flex items-center justify-between">
                     <h5 className="text-lg font-semibold dark:text-white-light">پروفایل</h5>
                  </div>
                  <div className="mb-5">
                     <div className="flex flex-col items-center justify-center">
                        <Image
                           width={300}
                           height={300}
                           src={data?.user.image ? process.env.NEXT_PUBLIC_BASE_URL + data?.user.image : personPlaceholder}
                           alt="img"
                           className="mb-5 h-24 w-24 rounded-full  object-cover"
                        />
                        <p className="text-xl font-semibold text-primary">{data?.user.first_name + ' ' + data?.user.last_name}</p>
                     </div>
                     <ul className="m-auto mt-5 flex max-w-[160px] flex-col space-y-4 font-semibold text-white-dark">
                        <li className="flex items-center gap-2">
                           <IconPhone />
                           <span className="whitespace-nowrap" dir="ltr">
                              {data?.user.mobile?.replace('+98', '0')}
                           </span>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="col-span-9 flex flex-col gap-5">
                  <div className="panel">
                     <div className="mb-5">
                        <h5 className="text-lg font-semibold dark:text-white-light">خلاصه گزارشات</h5>
                     </div>
                     <div className="space-y-4">
                        <div className="rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]">
                           <div className="flex items-center justify-between p-4 py-2">
                              <div className="grid h-9 w-9 place-content-center rounded-md bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light">
                                 <IconShoppingBag />
                              </div>
                              <div className="flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4">
                                 <h6 className="text-[13px] text-white-dark dark:text-white-dark">
                                    درآمد
                                    <span className="block text-base text-[#515365] dark:text-white-light">$92,600</span>
                                 </h6>
                                 <p className="text-secondary ltr:ml-auto rtl:mr-auto">90%</p>
                              </div>
                           </div>
                        </div>
                        <div className="rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]">
                           <div className="flex items-center justify-between p-4 py-2">
                              <div className="grid h-9 w-9 place-content-center rounded-md bg-info-light text-info dark:bg-info dark:text-info-light">
                                 <IconTag />
                              </div>
                              <div className="flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4">
                                 <h6 className="text-[13px] text-white-dark dark:text-white-dark">
                                    سود
                                    <span className="block text-base text-[#515365] dark:text-white-light">$37,515</span>
                                 </h6>
                                 <p className="text-info ltr:ml-auto rtl:mr-auto">65%</p>
                              </div>
                           </div>
                        </div>
                        <div className="rounded border border-[#ebedf2] dark:border-0 dark:bg-[#1b2e4b]">
                           <div className="flex items-center justify-between p-4 py-2">
                              <div className="grid h-9 w-9 place-content-center rounded-md bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                                 <IconCreditCard />
                              </div>
                              <div className="flex flex-auto items-start justify-between font-semibold ltr:ml-4 rtl:mr-4">
                                 <h6 className="text-[13px] text-white-dark dark:text-white-dark">
                                    هزینه ها
                                    <span className="block text-base text-[#515365] dark:text-white-light">$55,085</span>
                                 </h6>
                                 <p className="text-warning ltr:ml-auto rtl:mr-auto">80%</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="panel">
                     <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">تاریخچه پرداخت ها</h5>
                     </div>
                     <div>
                        <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                           <div className="flex items-center justify-between py-2">
                              <h6 className="font-semibold text-[#515365] dark:text-white-dark">
                                 March
                                 <span className="block text-white-dark dark:text-white-light">Pro Membership</span>
                              </h6>
                              <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                 <p className="font-semibold">90%</p>
                                 <div className="dropdown ltr:ml-4 rtl:mr-4">
                                    <Dropdown
                                       offset={[0, 5]}
                                       placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                       btnClassName="hover:text-primary"
                                       button={<IconHorizontalDots className="opacity-80 hover:opacity-100" />}
                                    >
                                       <ul className="!min-w-[150px]">
                                          <li>
                                             <button type="button">مشاهده فاکتور</button>
                                          </li>
                                          <li>
                                             <button type="button">دانلود فاکتور</button>
                                          </li>
                                       </ul>
                                    </Dropdown>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                           <div className="flex items-center justify-between py-2">
                              <h6 className="font-semibold text-[#515365] dark:text-white-dark">
                                 February
                                 <span className="block text-white-dark dark:text-white-light">Pro Membership</span>
                              </h6>
                              <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                 <p className="font-semibold">90%</p>
                                 <div className="dropdown ltr:ml-4 rtl:mr-4">
                                    <Dropdown
                                       offset={[0, 5]}
                                       placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                       button={<IconHorizontalDots className="opacity-80 hover:opacity-100" />}
                                    >
                                       <ul className="!min-w-[150px]">
                                          <li>
                                             <button type="button">مشاهده فاکتور</button>
                                          </li>
                                          <li>
                                             <button type="button">دانلود فاکتور</button>
                                          </li>
                                       </ul>
                                    </Dropdown>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div>
                           <div className="flex items-center justify-between py-2">
                              <h6 className="font-semibold text-[#515365] dark:text-white-dark">
                                 January
                                 <span className="block text-white-dark dark:text-white-light">Pro Membership</span>
                              </h6>
                              <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                                 <p className="font-semibold">90%</p>
                                 <div className="dropdown ltr:ml-4 rtl:mr-4">
                                    <Dropdown
                                       offset={[0, 5]}
                                       placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                       button={<IconHorizontalDots className="opacity-80 hover:opacity-100" />}
                                    >
                                       <ul className="!min-w-[150px]">
                                          <li>
                                             <button type="button">مشاهده فاکتور</button>
                                          </li>
                                          <li>
                                             <button type="button">دانلود فاکتور</button>
                                          </li>
                                       </ul>
                                    </Dropdown>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* <div className="panel lg:col-span-2 xl:col-span-3">
                  <div className="mb-5">
                     <h5 className="text-lg font-semibold dark:text-white-light">Task</h5>
                  </div>
                  <div className="mb-5">
                     <div className="table-responsive font-semibold text-[#515365] dark:text-white-light">
                        <table className="whitespace-nowrap">
                           <thead>
                              <tr>
                                 <th>Projects</th>
                                 <th>Progress</th>
                                 <th>Task Done</th>
                                 <th className="text-center">Time</th>
                              </tr>
                           </thead>
                           <tbody className="dark:text-white-dark">
                              <tr>
                                 <td>Figma Design</td>
                                 <td>
                                    <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                       <div className="w-[29.56%] rounded-full bg-danger"></div>
                                    </div>
                                 </td>
                                 <td className="text-danger">29.56%</td>
                                 <td className="text-center">2 mins ago</td>
                              </tr>
                              <tr>
                                 <td>Vue Migration</td>
                                 <td>
                                    <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                       <div className="w-1/2 rounded-full bg-info"></div>
                                    </div>
                                 </td>
                                 <td className="text-success">50%</td>
                                 <td className="text-center">4 hrs ago</td>
                              </tr>
                              <tr>
                                 <td>Flutter App</td>
                                 <td>
                                    <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                       <div className="w-[39%] rounded-full  bg-warning"></div>
                                    </div>
                                 </td>
                                 <td className="text-danger">39%</td>
                                 <td className="text-center">a min ago</td>
                              </tr>
                              <tr>
                                 <td>API Integration</td>
                                 <td>
                                    <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                       <div className="w-[78.03%] rounded-full  bg-success"></div>
                                    </div>
                                 </td>
                                 <td className="text-success">78.03%</td>
                                 <td className="text-center">2 weeks ago</td>
                              </tr>

                              <tr>
                                 <td>Blog Update</td>
                                 <td>
                                    <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                       <div className="w-full  rounded-full  bg-secondary"></div>
                                    </div>
                                 </td>
                                 <td className="text-success">100%</td>
                                 <td className="text-center">18 hrs ago</td>
                              </tr>
                              <tr>
                                 <td>Landing Page</td>
                                 <td>
                                    <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                       <div className="w-[19.15%] rounded-full  bg-danger"></div>
                                    </div>
                                 </td>
                                 <td className="text-danger">19.15%</td>
                                 <td className="text-center">5 days ago</td>
                              </tr>
                              <tr>
                                 <td>Shopify Dev</td>
                                 <td>
                                    <div className="flex h-1.5 w-full rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                       <div className="w-[60.55%] rounded-full bg-primary"></div>
                                    </div>
                                 </td>
                                 <td className="text-success">60.55%</td>
                                 <td className="text-center">8 days ago</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div> */}
            </div>
         </div>
      </div>
   );
};

export default Profile;
