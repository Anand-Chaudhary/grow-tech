import { Package } from '../generated/prisma/client';

export const toPackageDto = (pkg: Package) => ({
  id: pkg.id,
  tier: pkg.tier,
  name: pkg.name,
  bestFor: pkg.bestFor,
  features: pkg.features,
  priceFrom: pkg.priceFrom,
  currency: pkg.currency,
  priceNote: pkg.priceNote,
  isHighlighted: pkg.isHighlighted,
});
