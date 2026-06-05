import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Контент-завод Кайтен — LLM harness for landings',
  description: 'Управляемый контур вокруг LLM для генерации SaaS-лендингов',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
