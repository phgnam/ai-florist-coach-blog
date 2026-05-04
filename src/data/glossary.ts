// Pure re-export barrel. All English Flower Glossary data lives in
// src/data/glossary/en/. Edit individual flower files there.

export type { GlossaryTerm } from './glossary/types';
export { GLOSSARY_TERMS, getTermBySlug } from './glossary/en';
