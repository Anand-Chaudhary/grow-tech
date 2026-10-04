import prisma from '../src/db/prisma';
import bcrypt from 'bcryptjs';

const main = async () => {
  // Packages
  await prisma.package.createMany({
    data: [
      {
        tier: 'LAUNCH',
        name: 'Launch Package',
        bestFor: 'Startups',
        features: ['Feature A', 'Feature B'],
        priceFrom: 5000,
        currency: 'USD',
        priceNote: null,
        isHighlighted: true,
        isActive: true,
        sortOrder: 1,
      },
      {
        tier: 'GROWTH',
        name: 'Growth Package',
        bestFor: 'Scaling',
        features: ['Feature C', 'Feature D'],
        priceFrom: 10000,
        currency: 'USD',
        priceNote: null,
        isHighlighted: false,
        isActive: true,
        sortOrder: 2,
      },
      {
        tier: 'SCALE',
        name: 'Scale Package',
        bestFor: 'Enterprise',
        features: ['Feature E', 'Feature F'],
        priceFrom: null,
        currency: 'USD',
        priceNote: 'Custom quote',
        isHighlighted: false,
        isActive: true,
        sortOrder: 3,
      },
    ],
  });

  // Services
  await prisma.service.createMany({
    data: [
      { slug: 'seo', title: 'SEO', description: 'Search engine optimization', isActive: true, sortOrder: 1 },
      { slug: 'design', title: 'Design', description: 'UX/UI design', isActive: true, sortOrder: 2 },
      { slug: 'dev', title: 'Development', description: 'Full‑stack development', isActive: true, sortOrder: 3 },
      { slug: 'marketing', title: 'Marketing', description: 'Growth marketing', isActive: true, sortOrder: 4 },
    ],
  });

  // FAQs
  await prisma.faq.createMany({
    data: [
      { question: 'What is Grow Tech?', answer: 'We build digital products.', isActive: true, sortOrder: 1 },
      { question: 'How do I start?', answer: 'Contact us via the lead form.', isActive: true, sortOrder: 2 },
    ],
  });

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        authorName: 'Alice',
        authorRole: 'CEO',
        company: 'Acme Corp',
        quote: 'Great service!',
        avatarUrl: null,
        isPublished: true,
        sortOrder: 1,
      },
    ],
  });

  // Case Studies
  await prisma.caseStudy.createMany({
    data: [
      {
        slug: 'case-study-1',
        clientName: 'Client One',
        industry: 'E‑commerce',
        challenge: 'Low conversion',
        solution: 'Redesign checkout',
        resultSummary: '30% increase in sales',
        metrics: [{ label: 'Conversion', value: '30%' }],
        techStack: ['React', 'Node'],
        isPublished: true,
        publishedAt: new Date(),
        sortOrder: 1,
      },
    ],
  });

  // Posts
  await prisma.post.createMany({
    data: [
      {
        slug: 'welcome',
        title: 'Welcome to our blog',
        excerpt: 'Introduction to Grow Tech.',
        contentMd: '# Hello World',
        authorName: 'Admin',
        tags: ['intro'],
        status: 'PUBLISHED',
        publishedAt: new Date(),
        sortOrder: 1,
      },
    ],
  });

  // Default admin if none exists
  const adminCount = await prisma.adminUser.count();
  if (adminCount === 0) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.adminUser.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        passwordHash,
        role: 'OWNER',
        isActive: true,
      },
    });
    console.log('Created default admin (email: admin@example.com, password: admin123)');
  }

  console.log('Seeding complete');
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
