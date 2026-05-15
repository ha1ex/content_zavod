'use client';

import { useState, useTransition } from 'react';
import type { Approval, ApprovalStatus } from '@buffalo/harness/schemas';

interface Props {
  slug: string;
  initial: Approval;
}

const STATUSES: { value: ApprovalStatus; label: string; tone: string }[] = [
  { value: 'pending', label: 'Pending', tone: 'bg-slate-100 text-slate-700' },
  { value: 'changes_requested', label: 'Changes requested', tone: 'bg-amber-100 text-amber-800' },
  { value: 'approved', label: 'Approve', tone: 'bg-emerald-100 text-emerald-800' },
  { value: 'rejected', label: 'Reject', tone: 'bg-rose-100 text-rose-800' },
];

export function ApprovalForm({ slug, initial }: Props) {
  const [status, setStatus] = useState<ApprovalStatus>(initial.status);
  const [reviewer, setReviewer] = useState<string>(initial.reviewer ?? '');
  const [comments, setComments] = useState<string>(initial.comments ?? '');
  const [updatedAt, setUpdatedAt] = useState<string>(initial.updatedAt);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  function submit() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await fetch(`/api/approve/${slug}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          status,
          reviewer: reviewer.trim() || undefined,
          comments: comments.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        setError(`Save failed (${res.status}): ${body}`);
        return;
      }
      const next = (await res.json()) as Approval;
      setUpdatedAt(next.updatedAt);
      setSaved(true);
    });
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Статус</legend>
        <div className="grid grid-cols-2 gap-2">
          {STATUSES.map((s) => {
            const active = s.value === status;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatus(s.value)}
                className={[
                  'rounded-(--radius-lg) border px-3 py-2 text-sm text-left transition',
                  active
                    ? `${s.tone} border-current font-medium`
                    : 'border-(--color-border-default) hover:bg-(--color-surface-section)',
                ].join(' ')}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Reviewer</span>
        <input
          type="text"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          placeholder="e.g. alex@buffalo"
          className="rounded-(--radius-lg) border border-(--color-border-default) px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Комментарии</span>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={6}
          placeholder="Что менять, чего не хватает, ссылки на эталоны…"
          className="rounded-(--radius-lg) border border-(--color-border-default) px-3 py-2"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-(--radius-lg) bg-(--color-action-primary) px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? 'Сохраняю…' : 'Сохранить approval'}
      </button>

      {saved && (
        <p className="text-xs text-(--color-text-secondary)">
          Сохранено: <code>content/approvals/{slug}.json</code> · {new Date(updatedAt).toLocaleString()}
        </p>
      )}
      {error && <p className="text-xs text-rose-700">{error}</p>}
    </form>
  );
}
