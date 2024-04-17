import React, { useEffect, useState } from 'react';
import PermissionChecker from '@/components/permissionChecker';
import Modal from '@/components/shared/modal';
import api from '@/services/interceptor';
import chatBg from '@/assets/images/chat.jpg';
import MessageText from '@/components/Icon/IconChatDot';
import Calendar from '@/components/Icon/IconClock';
import RecordCircle from '@/components/Icon/IconArrowBackward';
import Send from '@/components/Icon/IconSend';

const Tickets = () => {
   const [tickets, setTickets] = useState([]);
   const [ticketDetailModal, setTicketDetailModal] = useState(false);
   const [ticketContent, setTicketContent] = useState({});
   const [formValues, setFormValues] = useState({
      answer: '',
   });
   const moment = require('moment-jalaali');

   const getTickets = () => {
      api.get('/admin/api/ticket?answered=0').then((res) => setTickets(res.data.tickets));
   };
   const handleChange = (e) => {
      setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
   };
   const sendTicket = () => {
      api.put('/admin/api/ticket/answer', {
         ...formValues,
         ticketId: ticketContent.id,
      }).then(() => {
         getTickets();
         setFormValues({ answer: '' });
      });
   };
   useEffect(() => {
      getTickets();
   }, []);
   return (
      <PermissionChecker roles={['ADMIN']}>
         <div className="mx-4 mb-4 grid grid-cols-1 justify-center gap-4 md:mx-24">
            {tickets.map((item, index) => (
               <div
                  key={index}
                  className="grid cursor-pointer grid-cols-12 justify-items-start gap-2 rounded border px-2 py-3 text-white md:px-10 dark:bg-primary-dark-light"
                  onClick={() => {
                     setTicketContent(item);
                     setTicketDetailModal(true);
                  }}
               >
                  <span className="col-span-5 flex items-center justify-center gap-1 text-sm text-white md:text-base">
                     <MessageText size="20" color="#fff" />
                     <p className="flex gap-2">
                        <span className="hidden md:flex">عنوان تیکت:</span>
                        {item.title}
                     </p>
                  </span>
                  <span className="col-span-4 flex items-center justify-center gap-1 text-sm md:text-base">
                     <Calendar size="20" color="#fff" />
                     <p className="flex gap-2">
                        <span className="hidden md:flex">تاریخ ثبت:</span>
                        {moment(item.createdAt).format('jYYYY/jM/jD')}
                     </p>
                  </span>
                  <span className="col-span-3 flex items-center justify-center gap-1 text-sm md:text-base">
                     <RecordCircle size="20" color="#fff" variant="Outline" />
                     <p className="flex gap-2">
                        <span className="hidden md:flex">وضعیت:</span>
                        {item.answered ? 'پاسخ داده شده' : 'باز'}
                     </p>
                  </span>
               </div>
            ))}
         </div>
         <Modal
            open={ticketDetailModal}
            setOpen={setTicketDetailModal}
            size="fit"
            content={
               <div
                  className="flex min-h-[350px] min-w-[300px] flex-col justify-end gap-3 rounded-lg p-7 md:min-h-[400px] md:min-w-[400px]"
                  style={{ backgroundImage: `url(${chatBg.src})` }}
               >
                  <p className="flex w-fit max-w-xs flex-col gap-2 self-end rounded-2xl rounded-bl-none bg-slate-500 px-3 py-2 text-sm text-white">
                     <span className="text-[10px]">{ticketContent?.user?.first_name + ' ' + ticketContent?.user?.last_name}</span>
                     {ticketContent.description}
                     <span className="flex self-end text-[10px]">{moment(ticketContent.createdAt).format('HH:mm')}</span>
                  </p>
                  {ticketContent.answered && (
                     <p className="flex w-fit max-w-md flex-col gap-2 self-start rounded-2xl rounded-br-none bg-slate-500 px-3 py-2 text-sm text-white">
                        <span className="text-[10px]">پشتیبانی</span>
                        {ticketContent.answer}
                        <span className="text-[10px]">{moment(ticketContent.updatedAt).format('HH:mm')}</span>
                     </p>
                  )}
                  {!ticketContent.answered && (
                     <div className="flex flex-col gap-2">
                        <form className="flex gap-2">
                           <input
                              className="col-span-12 w-full rounded-lg border border-gray-300 p-2 outline-none"
                              name="answer"
                              value={formValues.answer}
                              placeholder="پاسخ"
                              onChange={handleChange}
                           />
                           <span className="cursor-pointer rounded-full bg-slate-500 p-2 backdrop-blur-sm" onClick={sendTicket}>
                              <Send size="25" color="#fff" />
                           </span>
                        </form>
                     </div>
                  )}
               </div>
            }
         />
      </PermissionChecker>
   );
};

export default Tickets;
