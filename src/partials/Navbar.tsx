/* eslint-disable tailwindcss/no-custom-classname */
import {
  type Locale,
  getLanguagePath,
  getLocalizedPath,
  i18n,
  locales,
} from '@/utils/i18n';
import { Profile } from '@/utils/Profile';

const realLinks = [
  { href: '/real/', label: 'Overview' },
  { href: '/real/resume/', label: 'Resume' },
  { href: '/real/projects/', label: 'Projects' },
  { href: '/real/notes/', label: 'Notes' },
  { href: '/real/blog/', label: 'Blogs' },
];

const fictionLinks = [
  { href: '/fiction/', label: 'Overview' },
  { href: '/fiction/oc/', label: 'OCs' },
  { href: '/fiction/world/', label: 'World' },
  { href: '/fiction/novels/', label: 'Stories' },
  { href: '/fiction/commissions/', label: 'Commissions' },
];

const languageLabels: Record<Locale, string> = {
  en: 'English',
  'zh-cn': '简体中文',
};

const dropdownScript = `
(() => {
  const setupDropdowns = () => {
    document.querySelectorAll('[data-dropdown-scope]').forEach((scope) => {
      const dropdowns = Array.from(scope.querySelectorAll('details[data-dropdown]'));

      dropdowns.forEach((dropdown) => {
        if (dropdown.dataset.dropdownReady === 'true') {
          return;
        }

        dropdown.dataset.dropdownReady = 'true';
        dropdown.addEventListener('toggle', () => {
          if (!dropdown.open) {
            return;
          }

          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.open = false;
            }
          });
        });
      });
    });
  };

  setupDropdowns();
  document.addEventListener('astro:page-load', setupDropdowns);
})();
`;

const LinkGroup = ({
  label,
  labelKey,
  links,
}: {
  label: string;
  labelKey: string;
  links: typeof realLinks;
}) => (
  <details
    className="group relative"
    data-dropdown
    data-dropdown-group="desktop-nav-dropdown"
  >
    <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
      <span data-home-i18n={labelKey}>{label}</span>
      <span className="text-xs text-slate-500 transition group-open:rotate-180">
        ⌄
      </span>
    </summary>
    <div className="nav-dropdown-panel absolute right-0 top-12 z-30 grid w-48 gap-1 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          {link.label}
        </a>
      ))}
    </div>
  </details>
);

const MobileGroup = ({
  label,
  labelKey,
  links,
}: {
  label: string;
  labelKey: string;
  links: typeof realLinks;
}) => (
  <details
    className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:hidden"
    data-dropdown
    data-dropdown-group="mobile-nav-dropdown"
  >
    <summary className="cursor-pointer list-none font-semibold text-white">
      <span data-home-i18n={labelKey}>{label}</span>
    </summary>
    <div className="nav-dropdown-panel mt-3 grid gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
        >
          {link.label}
        </a>
      ))}
    </div>
  </details>
);

const LanguageGroup = ({
  label,
  labelKey,
  locale,
  pathname,
}: {
  label: string;
  labelKey: string;
  locale: Locale;
  pathname: string;
}) => (
  <details
    className="group relative"
    data-dropdown
    data-dropdown-group="desktop-nav-dropdown"
  >
    <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white">
      <span data-home-i18n={labelKey}>{label}</span>
      <span className="text-xs text-slate-500 transition group-open:rotate-180">
        ⌄
      </span>
    </summary>
    <div className="nav-dropdown-panel absolute right-0 top-12 z-30 grid w-40 gap-1 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur">
      {locales.map((targetLocale) => (
        <a
          key={targetLocale}
          href={getLanguagePath(pathname, targetLocale)}
          aria-current={targetLocale === locale ? 'page' : undefined}
          data-language-link
          data-target-locale={targetLocale}
          className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
        >
          {languageLabels[targetLocale]}
        </a>
      ))}
    </div>
  </details>
);

const MobileLanguageGroup = ({
  label,
  labelKey,
  locale,
  pathname,
}: {
  label: string;
  labelKey: string;
  locale: Locale;
  pathname: string;
}) => (
  <details
    className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:hidden"
    data-dropdown
    data-dropdown-group="mobile-nav-dropdown"
  >
    <summary className="cursor-pointer list-none font-semibold text-white">
      <span data-home-i18n={labelKey}>{label}</span>
    </summary>
    <div className="nav-dropdown-panel mt-3 grid gap-2">
      {locales.map((targetLocale) => (
        <a
          key={targetLocale}
          href={getLanguagePath(pathname, targetLocale)}
          aria-current={targetLocale === locale ? 'page' : undefined}
          data-language-link
          data-target-locale={targetLocale}
          className="rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/10 aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
        >
          {languageLabels[targetLocale]}
        </a>
      ))}
    </div>
  </details>
);

const Navbar = ({ locale, pathname }: { locale: Locale; pathname: string }) => {
  const text = i18n[locale].nav;
  const localizedRealLinks = realLinks.map((link) => ({
    ...link,
    href: getLocalizedPath(link.href, locale),
  }));
  const localizedFictionLinks = fictionLinks.map((link) => ({
    ...link,
    href: getLocalizedPath(link.href, locale),
  }));
  const homeHref = getLocalizedPath('/', locale);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        aria-label="Primary navigation"
      >
        <a href={homeHref} className="flex items-center gap-3">
          <img
            src={Profile.avatar}
            alt={`${Profile.name} avatar`}
            className="h-9 w-9 rounded-2xl border border-white/10"
          />
          <span className="text-base font-black tracking-tight text-white">
            WeiKnight's Homepage
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex" data-dropdown-scope>
          <a
            href={homeHref}
            data-home-link="home"
            data-home-i18n="nav.home"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            {text.home}
          </a>
          <LinkGroup
            label={text.real}
            labelKey="nav.real"
            links={localizedRealLinks}
          />
          <LinkGroup
            label={text.fiction}
            labelKey="nav.fiction"
            links={localizedFictionLinks}
          />
          <LanguageGroup
            label={text.language}
            labelKey="nav.language"
            locale={locale}
            pathname={pathname}
          />
        </div>

        <details className="md:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
            Menu
          </summary>
          <div
            className="absolute inset-x-4 top-16 grid gap-3 rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur"
            data-dropdown-scope
          >
            <a
              href={homeHref}
              data-home-link="home"
              data-home-i18n="nav.home"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              {text.home}
            </a>
            <MobileGroup
              label={text.real}
              labelKey="nav.real"
              links={localizedRealLinks}
            />
            <MobileGroup
              label={text.fiction}
              labelKey="nav.fiction"
              links={localizedFictionLinks}
            />
            <MobileLanguageGroup
              label={text.language}
              labelKey="nav.language"
              locale={locale}
              pathname={pathname}
            />
          </div>
        </details>
      </nav>
      <style>{`
      details[open] > .nav-dropdown-panel {
        animation: nav-dropdown-in 180ms ease-out both;
      }

      @keyframes nav-dropdown-in {
        from {
          opacity: 0;
          transform: translateY(-0.4rem) scale(0.98);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `}</style>
      <script dangerouslySetInnerHTML={{ __html: dropdownScript }} />
    </header>
  );
};

export { Navbar };
