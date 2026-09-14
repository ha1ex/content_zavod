/**
 * LinkedText — фирменная фиолетовая ссылка внутри обычного абзаца.
 *
 * Общий помощник для секций, где часть описания ведёт наружу (`MediaCopy`,
 * `CtaBanner`). Работает как `AccentText`, только вместо цветного span
 * рендерит `<a>`. Ссылок может быть несколько — тогда `link` это массив.
 *
 * Поиск подстроки устойчив к неразрывным пробелам: типографский трансформер
 * (`ruNbsp`) подставляет &nbsp; уже на рендере, поэтому в спеке текст ссылки
 * пишется обычными пробелами.
 *
 * Если ссылка не задана или её текст не найден — рендерится обычный текст.
 */
export interface TextLink {
  text: string;
  href: string;
}

const LINK_CLASS =
  'text-(--color-text-accent) underline decoration-(--color-text-accent)/30 underline-offset-2 transition-colors hover:decoration-(--color-text-accent)';

/** Неразрывный пробел приравниваем к обычному — иначе подстрока не находится. */
const plain = (s: string) => s.replace(/ /g, ' ');

export function LinkedText({ text, link }: { text: string; link?: TextLink | TextLink[] }) {
  const links = link ? (Array.isArray(link) ? link : [link]) : [];
  if (links.length === 0) return <>{text}</>;

  // Идём по абзацу слева направо и на каждом шаге берём ту ссылку, чей текст
  // встречается раньше остальных: порядок в спеке тогда не важен.
  const parts: React.ReactNode[] = [];
  let rest = text;
  let remaining = links;
  let key = 0;

  while (remaining.length > 0) {
    let best: { link: TextLink; at: number } | undefined;
    for (const l of remaining) {
      const at = plain(rest).indexOf(plain(l.text));
      if (at >= 0 && (!best || at < best.at)) best = { link: l, at };
    }
    if (!best) break;

    parts.push(rest.slice(0, best.at));
    parts.push(
      <a key={key++} href={best.link.href} className={LINK_CLASS}>
        {rest.slice(best.at, best.at + best.link.text.length)}
      </a>,
    );
    rest = rest.slice(best.at + best.link.text.length);
    remaining = remaining.filter((l) => l !== best!.link);
  }

  parts.push(rest);
  return <>{parts}</>;
}
