import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { Provider } from 'react-redux';
import store from '../store/index';
import Head from 'next/head';
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from 'ni18n.config.ts';
import useAuthUser from '@/services/api/getAuthUserQuery.api';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

import '../styles/tailwind.css';
import { NextPage } from 'next';
import localFont from '@next/font/local';
import { SToastContainer } from '../components/shared/notify/SNotify';
import Loading from '@/components/shared/Loading';
import { useRouter } from 'next/router';
import api from '../services/interceptor';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// const dana = localFont({
//    src: [
//       {
//          path: './../assets/fonts/dana/woff2/dana-fanum-light.woff2',
//          weight: '300',
//          style: 'normal',
//       },
//       {
//          path: './../assets/fonts/dana/woff2/dana-fanum-regular.woff2',
//          weight: '400',
//          style: 'normal',
//       },
//       {
//          path: './../assets/fonts/dana/woff2/dana-fanum-medium.woff2',
//          weight: '500',
//          style: 'normal',
//       },
//       {
//          path: './../assets/fonts/dana/woff2/dana-fanum-bold.woff2',
//          weight: '700',
//          style: 'normal',
//       },
//    ],
//    variable: '--font-inter',
// });

const iranSans = localFont({
   src: [
      {
         path: './../assets/fonts/IRANSansXFaNum-Light.woff2',
         weight: '300',
         style: 'normal',
      },
      {
         path: './../assets/fonts/IRANSansXFaNum-Regular.woff2',
         weight: '400',
         style: 'normal',
      },
      {
         path: './../assets/fonts/IRANSansXFaNum-Medium.woff2',
         weight: '500',
         style: 'normal',
      },
      {
         path: './../assets/fonts/IRANSansXFaNum-Bold.woff2',
         weight: '700',
         style: 'normal',
      },
   ],
   variable: '--font-inter',
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
   getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

const theme = () => {
   let theme = createTheme({
      direction: 'rtl',
      typography: {
         fontFamily: 'IRANSansX , sans-serif',
         h1: {
            fontSize: '1rem',
            fontWeight: 600,
         },
         h5: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.5,
         },
         subtitle2: {
            fontSize: '0.75rem',
         },
      },
      palette: {
         primary: {
            main: '#225E82',
            dark: '#1B4B68',
            light: '#6A96B0',
            contrastText: '#FFFFFF',
         },
         secondary: {
            main: '#8AC43E',
            dark: '#6E9D32',
            light: '#A1D065',
            contrastText: '#FFFFFF',
         },
         neutral: {
            main: '#555859',
            light: '#EDEDEE',
            contrastText: '#FFFFFF',
         },
         info: {
            main: '#0288D1',
            dark: '#01579B',
            light: '#03A9F4',
            contrastText: '#FFFFFF',
         },
         success: {
            main: '#2E7D32',
            dark: '#1B5E20',
            light: '#4CAF50',
            contrastText: '#FFFFFF',
         },
         warning: {
            main: '#EF6C00',
            dark: '#EF6C00',
            light: '#FF9800',
            contrastText: '#FFFFFF',
         },
         error: {
            main: '#D32F2F',
            dark: '#C62828',
            light: '#EF5350',
            contrastText: '#FFFFFF',
         },
         background: {
            // default: isDarkMode ? '#090909' : '#f8f8fd',
         },
      },
      shape: {
         borderRadius: 8,
      },
      mixins: {
         toolbar: {
            height: 64,
         },
         navbar: {
            width: 278,
         },
      },
   });

   theme = createTheme(theme, {
      components: {
         MuiAppBar: {
            defaultProps: {
               variant: 'outlined',
               elevation: 0,
            },
            styleOverrides: {
               root: {
                  borderWidth: '0 0 1px 0',
               },
               colorDefault: {
                  backgroundColor: theme.palette.background.paper,
               },
            },
         },
         MuiCard: {
            defaultProps: {
               variant: 'outlined',
            },
            styleOverrides: {
               root: {
                  borderRadius: theme.shape.borderRadius * 2,
               },
            },
         },
         MuiCardContent: {
            styleOverrides: {
               root: {
                  '&:last-child': {
                     padding: theme.spacing(2),
                  },
               },
            },
         },
         MuiListSubheader: {
            styleOverrides: {
               root: {
                  fontSize: '0.75rem',
                  lineHeight: 2,
                  marginBottom: theme.spacing(1),
               },
            },
         },
         MuiListItem: {
            styleOverrides: {
               root: {
                  padding: theme.spacing(1),
               },
            },
         },
         MuiListItemSecondaryAction: {
            styleOverrides: {
               root: {
                  right: theme.spacing(1),
                  '& svg': {
                     width: 20,
                  },
               },
            },
         },
         MuiListItemButton: {
            styleOverrides: {
               root: {
                  borderRadius: theme.shape.borderRadius,
                  padding: theme.spacing(0),
                  '&.Mui-selected': {
                     color: theme.palette.primary.contrastText,
                     backgroundColor: theme.palette.primary.main,
                  },
                  '&.sub-selected': {
                     color: theme.palette.primary.main,
                     borderLeft: `2px solid ${theme.palette.primary.main}`,
                  },
               },
            },
         },
         MuiListItemText: {
            styleOverrides: {
               root: {
                  margin: 0,
               },
            },
         },
         MuiListItemIcon: {
            styleOverrides: {
               root: {
                  minWidth: 32,
                  color: 'inherit',
                  '& svg': {
                     width: 20,
                  },
               },
            },
         },
         MuiButton: {
            defaultProps: {
               variant: 'contained',
               disableElevation: true,
            },
            styleOverrides: {
               root: {
                  minWidth: 42,
                  padding: theme.spacing(1, 2),
                  borderRadius: theme.shape.borderRadius * 1.5,
                  lineHeight: 1.5,
                  '& svg': {
                     width: '1rem',
                  },
                  '&.square': {
                     padding: theme.spacing(1),
                  },
               },
               outlinedNeutral: {
                  border: `1px solid ${theme.palette.neutral.main}33`,
               },
            },
         },
         MuiTab: {
            styleOverrides: {
               root: {
                  fontSize: '0.95rem',
                  color: theme.palette.primary.dark,
                  minHeight: 50,
               },
            },
         },
         MuiDialog: {
            styleOverrides: {
               paper: {
                  borderRadius: theme.shape.borderRadius * 2,
               },
            },
         },
         MuiDialogTitle: {
            styleOverrides: {
               root: {
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  gap: theme.spacing(1),
                  alignItems: 'center',
                  '& span': {
                     flexGrow: 1,
                  },
               },
            },
         },
      },
   });
   return theme;
};

const cacheRtl = createCache({
   key: 'muirtl',
   stylisPlugins: [prefixer, rtlPlugin],
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
   const [handleShow, setHandleShow] = useState(false);
   const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);
   const router = useRouter();

   useEffect(() => {
      setTimeout(() => {
         setHandleShow(true);
      }, 500);
      api.get('api/auth/authorize')
         .then(() => router.push('/'))
         .catch((err) => {
            if (!router.asPath.startsWith('/auth')) router.push('/auth/login');
         });
   }, []);
   if (!handleShow) {
      return <Loading title={'در حال احراز هویت '} />;
   }

   return (
      <Provider store={store}>
         <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
               <Head>
                  <title>Ganz Coffee</title>
                  <meta charSet="UTF-8" />
                  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta name="description" content="Generated by create next app" />
                  <link rel="icon" href="/logo-mini.png" />
               </Head>
               <main className={`${iranSans.variable}`}>
                  <SToastContainer />
                  {getLayout(<Component {...pageProps} />)}
               </main>
            </ThemeProvider>
         </CacheProvider>
      </Provider>
   );
};
export default appWithI18Next(App, ni18nConfig);
