// Public entry point for the Vietnamese Flower Glossary.
// Individual flower data lives in src/data/glossary/vi/<slug>.ts. The full
// list is assembled in src/data/glossary/vi/index.ts. Edit individual flower
// files there; this file should rarely change.

import type { GlossaryTermVI } from './glossary/types';
import { allTermsVi } from './glossary/vi';

export type { GlossaryTermVI } from './glossary/types';

export const GLOSSARY_TERMS_VI: GlossaryTermVI[] = allTermsVi;

export function getVITermBySlug(slug: string): GlossaryTermVI | undefined {
  return GLOSSARY_TERMS_VI.find((t) => t.slug === slug);
}
