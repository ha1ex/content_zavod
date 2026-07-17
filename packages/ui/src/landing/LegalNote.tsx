import { cn } from '../primitives/cn';

export interface LegalNoteProps {
  /** Текст сноски (юридическая оговорка, источники, товарные знаки). */
  text: string;
}

/**
 * Мелкая юридическая сноска — третичный текст в конце страницы. Например,
 * оговорка об источниках и товарном знаке конкурента на vs-лендинге.
 */
export function LegalNote({ text }: LegalNoteProps) {
  return (
    <section className={cn('mx-auto w-full max-w-(--container-kaiten)', 'px-4 pb-12 md:px-6')}>
      <p
        data-comp="legal_note.text"
        className="max-w-3xl text-xs leading-relaxed text-(--color-text-tertiary)"
      >
        {text}
      </p>
    </section>
  );
}
