import { z } from 'zod';

/**
 * Approval (этап 5) — human-in-the-loop статус для готового LandingSpec/иллюстрации.
 *
 * Файл лежит в content/approvals/<slug>.json — read/write через API route и CLI.
 * Источник истины для CI-проверки 'все ли одобрено перед handoff' (этап 6).
 */
export const ApprovalStatusSchema = z.enum(['pending', 'approved', 'rejected', 'changes_requested']);
export type ApprovalStatus = z.infer<typeof ApprovalStatusSchema>;

export const ApprovalSchema = z.object({
  slug: z.string().min(1),
  status: ApprovalStatusSchema,
  reviewer: z.string().max(120).optional(),
  comments: z.string().max(4000).optional(),
  updatedAt: z.string().describe('ISO timestamp'),
});
export type Approval = z.infer<typeof ApprovalSchema>;

export function defaultApproval(slug: string): Approval {
  return {
    slug,
    status: 'pending',
    updatedAt: new Date().toISOString(),
  };
}
