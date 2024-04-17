import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import IconHorizontalDots from '@/components/Icon/IconHorizontalDots';

const DropDownMenu = ({ content }) => {
   const [isHover, toggleHover] = React.useState(false);
   const toggleHoverMenu = () => {
      toggleHover(!isHover);
   };
   const [isMouse, toggleMouse] = React.useState(false);
   const toggleMouseMenu = () => {
      toggleMouse(!isMouse);
   };
   const subMenuAnimate = {
      enter: {
         opacity: 1,
         rotateX: 0,
         transition: {
            duration: 0.5,
         },
         display: 'block',
      },
      exit: {
         opacity: 0,
         rotateX: -15,
         transition: {
            duration: 0.5,
            delay: 0.3,
         },
         transitionEnd: {
            display: 'none',
         },
      },
   };
   return (
      <>
         <div className={styles.container}>
            <div className="flex-item">
               <motion.div className={`${styles.menuItem} flex flex-col gap-2`} onHoverStart={toggleHoverMenu} onHoverEnd={toggleHoverMenu}>
                  <span className="flex w-fit rounded-full bg-primary p-1 transition-all">
                     <IconHorizontalDots className="text-white-light" />
                  </span>
                  <motion.div
                     className={`${styles.subMenuUnique} !flex w-fit flex-col gap-2`}
                     initial="exit"
                     animate={isHover ? 'enter' : 'exit'}
                     variants={subMenuAnimate}
                  >
                     {content}
                  </motion.div>
               </motion.div>
            </div>
         </div>
      </>
   );
};

export default DropDownMenu;
