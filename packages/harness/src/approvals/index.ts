import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  ApprovalSchema,
  defaultApproval,
  type Approval,
  type ApprovalStatus,
} from '../schemas/approval.js';

/**
 * Approval storage (этап 5) — простые JSON-файлы в content/approvals/.
 * Используется и Next.js API route'ами, и CLI.
 */

export function approvalDir(repoRoot: string): string {
  return resolve(repoRoot, 'content', 'approvals');
}

export function approvalPath(repoRoot: string, slug: string): string {
  return resolve(approvalDir(repoRoot), `${slug}.json`);
}

export async function readApproval(repoRoot: string, slug: string): Promise<Approval> {
  const path = approvalPath(repoRoot, slug);
  try {
    const raw = await readFile(path, 'utf-8');
    return ApprovalSchema.parse(JSON.parse(raw));
  } catch (err) {
    if (err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === 'ENOENT') {
      return defaultApproval(slug);
    }
    throw err;
  }
}

export async function writeApproval(
  repoRoot: string,
  slug: string,
  patch: { status: ApprovalStatus; reviewer?: string; comments?: string },
): Promise<Approval> {
  const next: Approval = {
    slug,
    status: patch.status,
    reviewer: patch.reviewer,
    comments: patch.comments,
    updatedAt: new Date().toISOString(),
  };
  const validated = ApprovalSchema.parse(next);
  const path = approvalPath(repoRoot, slug);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(validated, null, 2) + '\n', 'utf-8');
  return validated;
}

export async function listApprovals(repoRoot: string): Promise<Approval[]> {
  const dir = approvalDir(repoRoot);
  let files: string[] = [];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }
  const results: Approval[] = [];
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const slug = f.replace(/\.json$/, '');
    try {
      results.push(await readApproval(repoRoot, slug));
    } catch {
      // skip invalid files
    }
  }
  return results.sort((a, b) => a.slug.localeCompare(b.slug));
}
