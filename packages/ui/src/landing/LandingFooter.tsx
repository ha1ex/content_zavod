import { cn } from '../primitives/cn.js';

export interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

export interface LandingFooterProps {
  brandName: string;
  brandTagline?: string;
  columns: FooterColumnProps[];
  copyright?: string;
}

export function LandingFooter({
  brandName,
  brandTagline,
  columns,
  copyright,
}: LandingFooterProps) {
  return (
    <footer
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 pt-16 pb-10 md:px-6',
      )}
    >
      <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
        <div className="col-span-2">
          <p className="text-xl font-semibold">{brandName}</p>
          {brandTagline && (
            <p className="mt-2 max-w-sm text-sm text-(--color-text-secondary)">
              {brandTagline}
            </p>
          )}
        </div>
        {columns.map((col, i) => (
          <div key={i}>
            <p className="text-sm font-medium uppercase tracking-wide text-(--color-text-secondary)">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a
                    href={link.href}
                    className="text-sm text-(--color-text-primary) hover:text-(--color-text-accent)"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 border-t border-(--color-border-default) pt-6 text-xs text-(--color-text-secondary)">
        {copyright ?? `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}
      </div>
    </footer>
  );
}
