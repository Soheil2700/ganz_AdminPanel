import { useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import IconTrashLines from '@/components/Icon/IconTrashLines';
import IconXCircle from '@/components/Icon/IconXCircle';
import SimpleTable from '../components/shared/tables/simpleTable';
import HoverTable from '../components/shared/tables/hoverTable';
import StrippedTable from '../components/shared/tables/strippedTable';
import LightTable from '../components/shared/tables/lightTable';
import CaptionsTable from '../components/shared/tables/captionsTable';
import ProgressTable from '../components/shared/tables/progressTable';
import DropdownTable from '../components/shared/tables/dropdownTable';
import FooterTable from '../components/shared/tables/footerTable';
import CheckBoxesTable from '../components/shared/tables/checkBoxesTable';

const Tables = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setPageTitle('Tables'));
   });

   return (
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
         {/* Simple */}
         <SimpleTable />

         {/* Hover Table  */}
         <HoverTable />

         {/* stripped Table  */}
         <StrippedTable />

         {/* light Table  */}
         <LightTable />

         {/* captions */}
         <CaptionsTable />
         {/* progress */}
         <ProgressTable />

         {/* dropdown */}
         <DropdownTable />

         {/* footer Table  */}
         <FooterTable />

         {/* checkboxes */}
         <CheckBoxesTable />
      </div>
   );
};

export default Tables;
