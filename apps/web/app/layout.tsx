import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

/**
 * Roboto — единственное семейство дизайн-системы (token `typography.fontFamily.sans`).
 * Раньше шрифт нигде не подключался и брался из системы: на машине без Roboto
 * лендинг молча уезжал на системный. Подключаем сами, self-hosted через next/font
 * (без запросов к Google на проде), с кириллицей и начертаниями DS: 400/500/600.
 */
const roboto = Roboto({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Контент-завод Кайтен — LLM harness for landings',
  description: 'Управляемый контур вокруг LLM для генерации SaaS-лендингов',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={roboto.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
