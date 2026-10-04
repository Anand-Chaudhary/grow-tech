import { Service } from '../generated/prisma/client';

export const toServiceDto = (svc: Service) => ({
  id: svc.id,
  slug: svc.slug,
  title: svc.title,
  description: svc.description,
});
