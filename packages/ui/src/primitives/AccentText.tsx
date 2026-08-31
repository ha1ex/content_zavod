/**
 * AccentText — подсветка куска заголовка фирменным фиолетовым.
 *
 * Общий помощник для секций, где часть заголовка выделяется цветом
 * (`LogoMarquee`, `MediaCopy`). Без плашки: только цвет текста. Вариант
 * с плашкой-пилюлей живёт в `HeroSection` (`highlightAccent`) — там у неё
 * свои отступы под крупный H1.
 *
 * Если `accentWord` не задан или не найден в заголовке — рендерится
 * обычный текст, без разметки.
 */
export function AccentText({ text, accentWord }: { text: string; accentWord?: string }) {
  if (!accentWord) return <>{text}</>;
  const at = text.indexOf(accentWord);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-(--color-text-accent)">{accentWord}</span>
      {text.slice(at + accentWord.length)}
    </>
  );
}
