import defaultSettings from '@/settings';

const title = defaultSettings.title || '自猎网';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
