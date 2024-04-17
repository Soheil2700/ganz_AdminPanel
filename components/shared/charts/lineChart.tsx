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
   xCategory?: string[];
   className?: string;
}

const LineChart = ({
   title = 'simple Chart',
   name = 'simple Chart',
   data = [45, 55, 75, 25, 45, 110],
   height = 300,
   colors = ['#4361EE'],
   width = 2,
   xCategory = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
   className,
}: Props) => {
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => {
      setIsMounted(true);
   });
   const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
   const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

   const lineChart: any = {
      series: [
         {
            name: name,
            data: data,
         },
      ],
      options: {
         chart: {
            height: height,
            type: 'line',
            toolbar: false,
         },
         colors: colors,
         tooltip: {
            marker: false,
            y: {
               formatter(number: number) {
                  return number;
               },
            },
         },
         stroke: {
            width: width,
            curve: 'smooth',
         },
         xaxis: {
            categories: xCategory,
            axisBorder: {
               color: isDark ? '#191e3a' : '#e0e6ed',
            },
         },
         yaxis: {
            opposite: isRtl ? true : false,
            labels: {
               offsetX: isRtl ? -20 : 0,
            },
         },
         grid: {
            borderColor: isDark ? '#191e3a' : '#e0e6ed',
         },
      },
   };
   return (
      <div className="panel">
         <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
         </div>
         <div className="mb-5">
            {isMounted && (
               <ReactApexChart
                  series={lineChart.series}
                  options={lineChart.options}
                  className={`rounded-lg bg-white dark:bg-black ${className}`}
                  type="line"
                  height={300}
                  width={'100%'}
               />
            )}
         </div>
      </div>
   );
};

export default LineChart;
