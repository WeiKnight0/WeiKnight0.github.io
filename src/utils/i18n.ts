export const locales = ['en', 'zh-cn'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const i18n = {
  en: {
    nav: {
      home: 'Home',
      real: 'Real',
      fiction: 'Fiction',
      language: 'Language',
    },
    footer: {
      builtWith: 'Built with Astro, React and Tailwind CSS.',
      designedFor: 'Designed for real-world portfolio and fictional archive.',
    },
  },
  'zh-cn': {
    nav: {
      home: '首页',
      real: '三次元',
      fiction: '二次元',
      language: '语言',
    },
    footer: {
      builtWith: '使用 Astro、React 与 Tailwind CSS 构建。',
      designedFor: '为现实作品集与幻想档案而设计。',
    },
  },
} as const;

export const getLocaleFromPath = (pathname: string): Locale => {
  return pathname === '/zh-cn' || pathname.startsWith('/zh-cn/')
    ? 'zh-cn'
    : defaultLocale;
};

export const getLocalizedPath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) {
    return path;
  }

  return path === '/' ? '/zh-cn/' : `/zh-cn${path}`;
};

const translatedEnglishPaths = new Set([
  '/',
  '/real/',
  '/real/resume/',
  '/real/projects/',
  '/real/notes/',
  '/real/blog/',
  '/fiction/',
  '/fiction/oc/',
  '/fiction/oc/oc-a/',
  '/fiction/oc/oc-b/',
  '/fiction/world/',
  '/fiction/novels/',
  '/fiction/commissions/',
]);

const translatedEnglishPrefixes = [
  '/real/projects/',
  '/real/notes/',
  '/real/blog/',
  '/fiction/world/',
  '/fiction/novels/',
  '/fiction/commissions/',
];

export const getLanguagePath = (pathname: string, targetLocale: Locale): string => {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const currentLocale = getLocaleFromPath(normalizedPath);

  if (targetLocale === currentLocale) {
    return normalizedPath;
  }

  if (targetLocale === defaultLocale) {
    const englishPath = normalizedPath.replace(/^\/zh-cn/, '');
    return englishPath === '' ? '/' : englishPath;
  }

  if (normalizedPath === '/') {
    return '/zh-cn/';
  }

  if (
    translatedEnglishPaths.has(normalizedPath) ||
    translatedEnglishPrefixes.some((prefix) => normalizedPath.startsWith(prefix))
  ) {
    return `/zh-cn${normalizedPath}`;
  }

  if (normalizedPath.startsWith('/real/')) {
    return '/zh-cn/real/';
  }

  if (normalizedPath.startsWith('/fiction/')) {
    return '/zh-cn/fiction/';
  }

  return '/zh-cn/';
};
