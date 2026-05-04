import type { GlossaryTermVI } from '../types';
import { rose } from './rose';
import { lily } from './lily';
import { peony } from './peony';
import { tulip } from './tulip';
import { sunflower } from './sunflower';
import { orchid } from './orchid';
import { lavender } from './lavender';
import { hydrangea } from './hydrangea';
import { dahlia } from './dahlia';
import { carnation } from './carnation';
import { chrysanthemum } from './chrysanthemum';
import { freesia } from './freesia';
import { gardenia } from './gardenia';
import { iris } from './iris';
import { jasmine } from './jasmine';
import { magnolia } from './magnolia';
import { marigold } from './marigold';
import { anemone } from './anemone';
import { ranunculus } from './ranunculus';
import { sweetPea } from './sweet-pea';
import { lotus } from './lotus';
import { daffodil } from './daffodil';
import { hyacinth } from './hyacinth';
import { gerbera } from './gerbera';
import { callaLily } from './calla-lily';
import { lisianthus } from './lisianthus';
import { alstroemeria } from './alstroemeria';
import { protea } from './protea';
import { plumeria } from './plumeria';
import { cherryBlossom } from './cherry-blossom';
import { lilyOfTheValley } from './lily-of-the-valley';
import { snapdragon } from './snapdragon';
import { apricotBlossom } from './apricot-blossom';
import { peachBlossom } from './peach-blossom';
import { hibiscus } from './hibiscus';
import { camellia } from './camellia';
import { birdOfParadise } from './bird-of-paradise';
import { bougainvillea } from './bougainvillea';
import { anthurium } from './anthurium';
import { poppy } from './poppy';
import { cosmos } from './cosmos';
import { forgetMeNot } from './forget-me-not';
import { wisteria } from './wisteria';
import { margueriteDaisy } from './marguerite-daisy';
import { tuberose } from './tuberose';
import { babysBreath } from './babys-breath';
import { zinnia } from './zinnia';
import { stock } from './stock';
import { waterLily } from './water-lily';
import { delphinium } from './delphinium';

export const GLOSSARY_TERMS_VI: GlossaryTermVI[] = [
  rose,
  lily,
  peony,
  tulip,
  sunflower,
  orchid,
  lavender,
  hydrangea,
  dahlia,
  carnation,
  chrysanthemum,
  freesia,
  gardenia,
  iris,
  jasmine,
  magnolia,
  marigold,
  anemone,
  ranunculus,
  sweetPea,
  lotus,
  daffodil,
  hyacinth,
  gerbera,
  callaLily,
  lisianthus,
  alstroemeria,
  protea,
  plumeria,
  cherryBlossom,
  lilyOfTheValley,
  snapdragon,
  apricotBlossom,
  peachBlossom,
  hibiscus,
  camellia,
  birdOfParadise,
  bougainvillea,
  anthurium,
  poppy,
  cosmos,
  forgetMeNot,
  wisteria,
  margueriteDaisy,
  tuberose,
  babysBreath,
  zinnia,
  stock,
  waterLily,
  delphinium,
];

export function getVITermBySlug(slug: string): GlossaryTermVI | undefined {
  return GLOSSARY_TERMS_VI.find((t) => t.slug === slug);
}

export const allTermsVi = GLOSSARY_TERMS_VI;
