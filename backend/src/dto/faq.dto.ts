import { Faq } from '../generated/prisma/client';

export const toFaqDto = (faq: Faq) => ({
  id: faq.id,
  question: faq.question,
  answer: faq.answer,
});
