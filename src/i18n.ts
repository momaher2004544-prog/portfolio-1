import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => ({
  locale: await requestLocale,
  messages: (await import(`./messages/${(await requestLocale) || 'en'}.json`)).default
}));