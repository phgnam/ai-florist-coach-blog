// Public entry point for the English Flower Glossary.
// Individual flower data lives in src/data/glossary/en/<slug>.ts. The full
// list is assembled in src/data/glossary/en/index.ts. Edit individual flower
// files there; this file should rarely change.

import type { GlossaryTerm } from './glossary/types';
import { allTermsEn } from './glossary/en';

export type { GlossaryTerm } from './glossary/types';

export const GLOSSARY_TERMS: GlossaryTerm[] = allTermsEn;

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}
