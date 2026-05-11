export const locales = ['en', 'zh-cn'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  'zh-cn': '简体中文',
};

export const htmlLangs: Record<Locale, string> = {
  en: 'en',
  'zh-cn': 'zh-CN',
};

export const localePathPrefixes: Record<Locale, string> = {
  en: '',
  'zh-cn': '',
};

export const clientI18nPaths = [
  '/',
  '/real/',
  '/real/blog/',
  '/fiction/',
  '/fiction/novels/',
  '/fiction/commissions/',
] as const;

const clientI18nPathSet = new Set<string>(clientI18nPaths);

export const localizedRouteGroups = [
  { base: '/fiction/world/', localizedBase: '/fiction/world/zh-cn/' },
  { base: '/fiction/oc/', localizedBase: '/fiction/oc/zh-cn/' },
  { base: '/real/projects/', localizedBase: '/real/projects/zh-cn/' },
  { base: '/real/resume/', localizedBase: '/real/resume/zh-cn/' },
  { base: '/real/notes/', localizedBase: '/real/notes/zh-cn/' },
] as const;

export const worldCategoryLabels: Record<
  Locale,
  Record<'theory' | 'setting', string>
> = {
  en: {
    theory: 'Theoretical Introduction',
    setting: 'Worldview Introduction',
  },
  'zh-cn': {
    theory: '理论介绍',
    setting: '世界观介绍',
  },
};

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

export const normalizePath = (pathname: string): string => {
  if (pathname === '') {
    return '/';
  }

  const pathOnly = pathname.split(/[?#]/)[0] ?? '/';
  const withLeadingSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;

  return withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
};

export const isClientI18nPath = (pathname: string): boolean =>
  clientI18nPathSet.has(normalizePath(pathname));

export const getLocaleFromPath = (pathname: string): Locale => {
  const normalizedPath = normalizePath(pathname);

  return localizedRouteGroups.some((group) =>
    normalizedPath.startsWith(group.localizedBase)
  )
    ? 'zh-cn'
    : defaultLocale;
};

export const stripLocaleFromPath = (pathname: string): string => {
  const normalizedPath = normalizePath(pathname);

  const routeGroup = localizedRouteGroups.find((group) =>
    normalizedPath.startsWith(group.localizedBase)
  );

  if (routeGroup) {
    return `${routeGroup.base}${normalizedPath.slice(
      routeGroup.localizedBase.length
    )}`;
  }

  return normalizedPath;
};

export const getLocalizedPath = (path: string, locale: Locale): string => {
  const normalizedPath = normalizePath(stripLocaleFromPath(path));

  if (isClientI18nPath(normalizedPath)) {
    return normalizedPath;
  }

  if (locale === defaultLocale) {
    return normalizedPath;
  }

  const routeGroup = localizedRouteGroups.find((group) =>
    normalizedPath.startsWith(group.base)
  );

  if (routeGroup) {
    return `${routeGroup.localizedBase}${normalizedPath.slice(
      routeGroup.base.length
    )}`;
  }

  return normalizedPath;
};

export const getLanguagePath = (
  pathname: string,
  targetLocale: Locale
): string => {
  const normalizedPath = normalizePath(pathname);
  const currentLocale = getLocaleFromPath(normalizedPath);

  if (targetLocale === currentLocale) {
    return normalizedPath;
  }

  return getLocalizedPath(normalizedPath, targetLocale);
};

export const getAlternateLocalePath = (
  pathname: string,
  targetLocale: Locale
): string => getLanguagePath(pathname, targetLocale);

export const getAlternateLocalePaths = (
  pathname: string
): Record<Locale, string> => ({
  en: getAlternateLocalePath(pathname, 'en'),
  'zh-cn': getAlternateLocalePath(pathname, 'zh-cn'),
});

export const hasDistinctLocalePaths = (pathname: string): boolean => {
  const alternatePaths = getAlternateLocalePaths(pathname);

  return alternatePaths.en !== alternatePaths['zh-cn'];
};

export const getAbsoluteUrl = (
  site: URL | undefined,
  pathname: string
): string => {
  const normalizedPath = normalizePath(pathname);

  if (!site) {
    return normalizedPath;
  }

  return new URL(normalizedPath, site).toString();
};
