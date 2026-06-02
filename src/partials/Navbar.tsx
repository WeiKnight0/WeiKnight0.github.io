/* eslint-disable tailwindcss/no-custom-classname */
import {
  type Locale,
  getLanguagePath,
  getLocalizedPath,
  i18n,
  localeLabels,
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
  themeClass,
}: {
  label: string;
  labelKey: string;
  links: typeof realLinks;
  themeClass: string;
}) => (
  <details
    className="group relative"
    data-dropdown
    data-dropdown-group="desktop-nav-dropdown"
  >
    <summary className={`flex cursor-pointer list-none items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${themeClass}`}>
      <span data-home-i18n={labelKey}>{label}</span>
      <span className="text-xs transition-transform group-open:rotate-180 opacity-50">
        ⌄
      </span>
    </summary>
    <div className="nav-dropdown-panel absolute left-0 top-full mt-2 z-30 grid w-48 gap-1 border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-md">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          data-localized-path={link.href}
          className={`px-3 py-2 text-sm transition-colors ${themeClass}`}
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
    <summary className="flex cursor-pointer list-none items-center gap-2 border border-white/10 px-3 py-1.5 text-xs font-bold text-white/50 transition hover:bg-white/10 hover:text-white uppercase tracking-widest">
      <span data-home-i18n={labelKey}>{label}</span>
      <span className="text-[10px] transition group-open:rotate-180">
        ▼
      </span>
    </summary>
    <div className="nav-dropdown-panel absolute right-0 top-full mt-2 z-30 grid w-32 gap-1 border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-md">
      {locales.map((targetLocale) => (
        <a
          key={targetLocale}
          href={getLanguagePath(pathname, targetLocale)}
          aria-current={targetLocale === locale ? 'page' : undefined}
          data-language-link
          data-target-locale={targetLocale}
          className="px-3 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white aria-[current=page]:text-white aria-[current=page]:bg-white/5"
        >
          {localeLabels[targetLocale]}
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

  const isReal = pathname.includes('/real');
  const isFiction = pathname.includes('/fiction');

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
        aria-label="Primary navigation"
      >
        <a href={homeHref} className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">
          {/* 头像保持原色，不加任何滤镜 */}
          <img
            src={Profile.avatar}
            alt={`${Profile.name} avatar`}
            className="h-9 w-9 border border-white/20 rounded-md"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white uppercase">
              WeiKnight
            </span>
            <span className="text-[10px] text-white/40 tracking-widest uppercase font-real-mono">
              {isReal ? 'System' : isFiction ? 'Archive' : 'Nexus'}
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-4 md:flex" data-dropdown-scope>
          <a
            href={homeHref}
            data-home-link="home"
            data-home-i18n="nav.home"
            data-localized-path="/"
            className="px-4 py-2 text-sm font-semibold text-white/60 transition hover:text-white uppercase tracking-wider"
          >
            {text.home}
          </a>
          <div className="h-4 w-px bg-white/20"></div>
          <LinkGroup
            label={text.real}
            labelKey="nav.real"
            links={localizedRealLinks}
            themeClass="font-real-mono text-white/70 hover:text-real-accent hover:bg-real-accent/10"
          />
          <LinkGroup
            label={text.fiction}
            labelKey="nav.fiction"
            links={localizedFictionLinks}
            themeClass="font-fiction-serif text-white/70 hover:text-fiction-accent hover:bg-fiction-accent/10"
          />
          <div className="h-4 w-px bg-white/20 ml-2 mr-2"></div>
          <LanguageGroup
            label={text.language}
            labelKey="nav.language"
            locale={locale}
            pathname={pathname}
          />
        </div>

        {/* Mobile menu */}
        <details className="md:hidden">
          <summary className="cursor-pointer list-none border border-white/10 px-4 py-2 text-xs font-semibold text-white uppercase tracking-widest">
            Menu
          </summary>
          <div
            className="absolute left-0 right-0 top-full mt-1 border-b border-white/10 bg-black/95 p-4 shadow-2xl backdrop-blur-xl"
            data-dropdown-scope
          >
            <div className="grid gap-4">
              <a href={homeHref} className="text-white/80 font-bold uppercase tracking-widest text-sm py-2">{text.home}</a>
              <div className="pl-4 border-l border-white/10 grid gap-2">
                 <div className="text-real-accent text-xs font-real-mono mb-1">REAL_</div>
                 {localizedRealLinks.map(l => <a key={l.href} href={l.href} className="text-white/60 text-sm font-real-mono py-1">{l.label}</a>)}
              </div>
              <div className="pl-4 border-l border-white/10 grid gap-2">
                 <div className="text-fiction-accent text-xs font-fiction-serif mb-1">FICTION*</div>
                 {localizedFictionLinks.map(l => <a key={l.href} href={l.href} className="text-white/60 text-sm font-fiction-serif py-1">{l.label}</a>)}
              </div>
            </div>
          </div>
        </details>
      </nav>
      <style>{`
      details[open] > .nav-dropdown-panel {
        animation: nav-dropdown-in 150ms ease-out forwards;
        transform-origin: top;
      }

      @keyframes nav-dropdown-in {
        from {
          opacity: 0;
          transform: scaleY(0.95);
        }
        to {
          opacity: 1;
          transform: scaleY(1);
        }
      }
    `}</style>
      <script dangerouslySetInnerHTML={{ __html: dropdownScript }} />
    </header>
  );
};

export { Navbar };
