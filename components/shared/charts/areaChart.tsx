import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { IRootState } from '@/store';
import { useSelector } from 'react-redux';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
   ssr: false,
});

interface Props {
   title?: string;
   name?: string;
   data?: number[];
   height?: number;
   width?: number;
   colors?: string[];
   labels?: string[];
   className?: string;
}

const AreaChart = ({
   title = 'AreaChart',
   name = 'Income',
   data = [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
   height = 300,
   colors = ['#805dca'],
   width = 2,
   labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
   className
}: Props) => {
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => {
      setIsMounted(true);
   });
   const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
   const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

   const areaChart: any = {
      series: [
         {
            name: name,
            data: data,
         },
      ],
      options: {
         chart: {
            type: 'area',
            height: height,
            zoom: {
               enabled: false,
            },
            toolbar: {
               show: false,
            },
         },
         colors: colors,
         dataLabels: {
            enabled: false,
         },
         stroke: {
            width: width,
            curve: 'smooth',
         },
         xaxis: {
            axisBorder: {
               color: isDark ? '#191e3a' : '#e0e6ed',
            },
         },
         yaxis: {
            opposite: isRtl ? true : false,
            labels: {
               offsetX: isRtl ? -40 : 0,
            },
         },
         labels: labels,
         legend: {
            horizontalAlign: 'left',
         },
         grid: {
            borderColor: isDark ? '#191E3A' : '#E0E6ED',
         },
         tooltip: {
            theme: isDark ? 'dark' : 'light',
         },
      },
   };
   return (
      <div className="panel">
         <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white">{title}</h5>
         </div>
         <div className="mb-5">
            {isMounted && (
               <ReactApexChart
                  series={areaChart.series}
                  options={areaChart.options}
                  className={`rounded-lg bg-white dark:bg-black ${className}`}
                  type="area"
                  height={height}
                  width={'100%'}
               />
            )}
         </div>
      </div>
   );
};

export default AreaChart;
