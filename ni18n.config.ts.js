const path = require('path');
const supportedLngs = ['en', 'fa'];
import themeConfig from 'theme.config';
export const ni18nConfig = {
    fallbackLng: [themeConfig.locale || 'fa'],
    supportedLngs,
    ns: ['translation'],
    react: { useSuspense: false },
    backend: {
        loadPath: path.resolve(`/locales/{{lng}}.json`),
    },
};
