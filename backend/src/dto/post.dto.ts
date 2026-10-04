import { Post } from '../generated/prisma/client';

export const toPostDto = (p: Post) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  coverImageUrl: p.coverImageUrl ?? null,
  tags: p.tags,
  authorName: p.authorName,
  readingMinutes: p.readingMinutes ?? null,
  publishedAt: p.publishedAt ?? null,
});
