import { NextResponse } from 'next/server';
import { hasLLMCredentials } from '@buffalo/harness/providers';
import { detectAvailableCli, getFailureSnapshot } from '../extract-brief/cli-extract';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const installed = await detectAvailableCli();
  const failing = getFailureSnapshot();
  // agy убран из UI — в текущей среде OAuth Google не настроен, тихо фейлится.
  // Если понадобится — можно вернуть фильтрацией: {claude, codex, agy} → {claude, codex}.
  return NextResponse.json({
    cli: { claude: installed.claude, codex: installed.codex },
    failing: { claude: failing.claude, codex: failing.codex },
    apiKey: hasLLMCredentials(),
    preferredOrder: ['claude', 'codex', 'api-key', 'heuristic'],
  });
}
