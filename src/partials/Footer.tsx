import { i18n, type Locale } from '@/utils/i18n';

const Footer = ({ locale }: { locale: Locale }) => (
  <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 text-sm text-slate-500 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p>{i18n[locale].footer.builtWith}</p>
      <p>{i18n[locale].footer.designedFor}</p>
    </div>
  </footer>
);

export { Footer };
