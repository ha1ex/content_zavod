'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '../primitives/Icon';
import { cn } from '../primitives/cn';

export interface NonNativeSelectOption {
  value: string;
  label: string;
}

export interface NonNativeSelectProps {
  /** id кнопки (для label/якорей). */
  id?: string;
  /** name скрытого поля — уходит в submit формы. */
  name: string;
  /** lucide-иконка слева. */
  icon?: string;
  placeholder: string;
  options: NonNativeSelectOption[];
}

/**
 * NonNativeSelect — кастомный (ненативный) выпадающий список. Внешне повторяет
 * поле апрельской формы (белое, иконка слева, шеврон справа), но с собственной
 * панелью опций вместо системного `<select>`. Значение уходит в форму через
 * скрытый input. Клиентский компонент (нужна интераактивность); в статичной
 * выгрузке рендерится в закрытом состоянии — верстальщик доводит логику.
 */
export function NonNativeSelect({ id, name, icon, placeholder, options }: NonNativeSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-11 w-full items-center rounded-(--radius-lg) bg-white pr-10 text-left text-base',
          icon ? 'pl-10' : 'pl-3.5',
          'transition focus:outline-none focus:ring-2 focus:ring-(--color-action-primary)/40',
        )}
      >
        {icon && (
          <Icon
            name={icon}
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8b9a]"
            strokeWidth={2}
          />
        )}
        <span className={cn('truncate', selected ? 'text-[#221a2e]' : 'text-[#5a5a68]')}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          name="ChevronDown"
          className={cn(
            'pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8b9a] transition-transform',
            open && 'rotate-180',
          )}
          strokeWidth={2}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-(--radius-lg) bg-white p-1 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)]"
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                onClick={() => {
                  setValue(o.value);
                  setOpen(false);
                }}
                className={cn(
                  'block w-full rounded-(--radius-md) px-3 py-2 text-left text-base text-[#221a2e]',
                  'transition hover:bg-[#f1edfb]',
                  o.value === value && 'bg-[#f1edfb] font-medium',
                )}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
