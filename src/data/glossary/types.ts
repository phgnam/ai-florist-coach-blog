export interface GlossaryTerm {
  slug: string;
  name: string;
  emoji: string;
  title: string;
  metaDescription: string;
  summary: string;
  meaning: string;
  bloomSeason: string;
  careLevel: 'Easy' | 'Moderate' | 'Advanced';
  careTips: string[];
  commonVarieties: { name: string; description: string }[];
  bestFor: string[];
  interestingFact: string;
  colors: string[];
  lifespan: string;
}

export interface GlossaryTermVI {
  slug: string;
  name: string;
  emoji: string;
  title: string;
  metaDescription: string;
  summary: string;
  meaning: string;
  bloomSeason: string;
  careLevel: 'Dễ' | 'Trung bình' | 'Khó';
  careTips: string[];
  commonVarieties: { name: string; description: string }[];
  bestFor: string[];
  interestingFact: string;
  colors: string[];
  lifespan: string;
}
