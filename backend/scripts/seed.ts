import 'dotenv/config'
import prisma from '../src/db/prisma'

async function main() {
  console.log('🌱 Starting database seed...');

  // ---------------------------------------------------------
  // Packages
  // ---------------------------------------------------------

  const packages = [
    {
      tier: 'LAUNCH' as const,
      name: 'Launch Package',
      bestFor: 'Startups and small businesses',
      features: [
        'Professional website',
        'Responsive design',
        'SEO-ready structure',
      ],
      priceFrom: 5000,
      currency: 'USD',
      priceNote: 'Excludes hosting, domain, and third-party tools',
      isHighlighted: false,
      isActive: true,
      sortOrder: 1,
    },
    {
      tier: 'GROWTH' as const,
      name: 'Growth Package',
      bestFor: 'Growing businesses',
      features: [
        'Everything in Launch',
        'Advanced UI/UX',
        'Conversion optimization',
        'Performance optimization',
      ],
      priceFrom: 10000,
      currency: 'USD',
      priceNote: 'Excludes hosting, domain, and third-party tools',
      isHighlighted: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      tier: 'SCALE' as const,
      name: 'Scale Package',
      bestFor: 'Established businesses and larger projects',
      features: [
        'Everything in Growth',
        'Custom integrations',
        'Advanced optimization',
        'Ongoing technical support',
      ],
      priceFrom: null,
      currency: 'USD',
      priceNote: 'Custom quote based on project requirements',
      isHighlighted: false,
      isActive: true,
      sortOrder: 3,
    },
    {
      tier: 'NOT_SURE' as const,
      name: 'Not Sure',
      bestFor: 'Businesses that need help choosing a package',
      features: [],
      priceFrom: null,
      currency: 'USD',
      priceNote: 'We will recommend the right package after reviewing your requirements',
      isHighlighted: false,
      isActive: true,
      sortOrder: 4,
    },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: {
        tier: pkg.tier,
      },
      update: {
        name: pkg.name,
        bestFor: pkg.bestFor,
        features: pkg.features,
        priceFrom: pkg.priceFrom,
        currency: pkg.currency,
        priceNote: pkg.priceNote,
        isHighlighted: pkg.isHighlighted,
        isActive: pkg.isActive,
        sortOrder: pkg.sortOrder,
      },
      create: pkg,
    });
  }

  console.log('✓ Packages seeded');

  // ---------------------------------------------------------
  // Services
  // ---------------------------------------------------------

  const services = [
    {
      slug: 'seo',
      title: 'SEO',
      description:
        'Improve search visibility and attract more qualified organic traffic.',
      isActive: true,
      sortOrder: 1,
    },
    {
      slug: 'design',
      title: 'Design',
      description:
        'Create modern, intuitive interfaces designed around your users and business goals.',
      isActive: true,
      sortOrder: 2,
    },
    {
      slug: 'development',
      title: 'Development',
      description:
        'Build fast, reliable and scalable digital products using modern technologies.',
      isActive: true,
      sortOrder: 3,
    },
    {
      slug: 'marketing',
      title: 'Marketing',
      description:
        'Turn your digital presence into a consistent source of qualified leads and growth.',
      isActive: true,
      sortOrder: 4,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: {
        slug: service.slug,
      },
      update: {
        title: service.title,
        description: service.description,
        isActive: service.isActive,
        sortOrder: service.sortOrder,
      },
      create: service,
    });
  }

  console.log('✓ Services seeded');

  // ---------------------------------------------------------
  // Case Study
  // ---------------------------------------------------------

  const caseStudy = await prisma.caseStudy.upsert({
    where: {
      slug: 'case-study-1',
    },
    update: {
      clientName: 'Client One',
      industry: 'E-commerce',
      challenge:
        'The existing website had a low conversion rate and a difficult checkout experience.',
      solution:
        'Redesigned the checkout flow and improved the overall user experience.',
      resultSummary: '30% increase in sales',
      metrics: [
        {
          label: 'Conversion',
          value: '30%',
        },
      ],
      techStack: ['React', 'Node.js'],
      isPublished: true,
      publishedAt: new Date(),
      sortOrder: 1,
    },
    create: {
      slug: 'case-study-1',
      clientName: 'Client One',
      industry: 'E-commerce',
      challenge:
        'The existing website had a low conversion rate and a difficult checkout experience.',
      solution:
        'Redesigned the checkout flow and improved the overall user experience.',
      resultSummary: '30% increase in sales',
      metrics: [
        {
          label: 'Conversion',
          value: '30%',
        },
      ],
      techStack: ['React', 'Node.js'],
      isPublished: true,
      publishedAt: new Date(),
      sortOrder: 1,
    },
  });

  console.log('✓ Case study seeded');

  // ---------------------------------------------------------
  // Testimonial
  // ---------------------------------------------------------

  await prisma.testimonial.deleteMany({
    where: {
      authorName: 'Alice',
      company: 'Acme Corp',
    },
  });

  await prisma.testimonial.create({
    data: {
      authorName: 'Alice',
      authorRole: 'CEO',
      company: 'Acme Corp',
      quote: 'Great service!',
      isPublished: true,
      sortOrder: 1,
      caseStudyId: caseStudy.id,
    },
  });

  console.log('✓ Testimonial seeded');

  // ---------------------------------------------------------
  // FAQs
  // ---------------------------------------------------------

  const faqCount = await prisma.faq.count();

  if (faqCount === 0) {
    await prisma.faq.createMany({
      data: [
        {
          question: 'What is Grow Tech?',
          answer: 'We build digital products that help businesses grow.',
          isActive: true,
          sortOrder: 1,
        },
        {
          question: 'How do I start?',
          answer:
            'Contact us through the free site review form and tell us about your project.',
          isActive: true,
          sortOrder: 2,
        },
      ],
    });

    console.log('✓ FAQs seeded');
  } else {
    console.log('↳ FAQs already exist, skipping');
  }

  // ---------------------------------------------------------
  // Blog Post
  // ---------------------------------------------------------

  await prisma.post.upsert({
    where: {
      slug: 'welcome',
    },
    update: {
      title: 'Welcome to our blog',
      excerpt: 'Introduction to Grow Tech.',
      contentMd: '# Hello World',
      authorName: 'Admin',
      tags: ['intro'],
      status: 'PUBLISHED',
      publishedAt: new Date(),
      readingMinutes: 1,
    },
    create: {
      slug: 'welcome',
      title: 'Welcome to our blog',
      excerpt: 'Introduction to Grow Tech.',
      contentMd: '# Hello World',
      authorName: 'Admin',
      tags: ['intro'],
      status: 'PUBLISHED',
      publishedAt: new Date(),
      readingMinutes: 1,
    },
  });

  console.log('✓ Blog post seeded');

  // ---------------------------------------------------------
  // Performance Snapshot
  // ---------------------------------------------------------

  const perfSnapshotCount = await prisma.perfSnapshot.count();

  if (perfSnapshotCount === 0) {
    await prisma.perfSnapshot.create({
      data: {
        url: 'https://growtech.example',
        strategy: 'MOBILE',
        source: 'LAB',
        lcpMs: 1400,
        inpMs: 100,
        cls: 0.05,
        perfScore: 95,
        a11yScore: 98,
        commitSha: null,
      },
    });

    console.log('✓ Performance snapshot seeded');
  } else {
    console.log('↳ Performance snapshots already exist, skipping');
  }

  // ---------------------------------------------------------
  // Admin User
  // ---------------------------------------------------------

  /*
   * This uses bcrypt.
   *
   * Make sure bcrypt is installed:
   *
   * npm install bcrypt
   * npm install -D @types/bcrypt
   */

  const bcrypt = await import('bcrypt');

  const passwordHash = await bcrypt.hash('admin123', 12);

  await prisma.adminUser.upsert({
    where: {
      email: 'admin@example.com',
    },
    update: {
      name: 'Admin',
      passwordHash,
      role: 'OWNER',
      isActive: true,
    },
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      passwordHash,
      role: 'OWNER',
      isActive: true,
    },
  });

  console.log('✓ Admin user seeded');

  // ---------------------------------------------------------
  // Leads
  // ---------------------------------------------------------

  const leadCount = await prisma.lead.count();

  if (leadCount === 0) {
    await prisma.lead.create({
      data: {
        name: 'Demo Client',
        email: 'demo@example.com',
        websiteUrl: 'https://example.com',
        goal: 'Improve website conversions',
        packageTier: 'GROWTH',
        status: 'NEW',
        consent: true,
      },
    });

    console.log('✓ Demo lead seeded');
  } else {
    console.log('↳ Leads already exist, skipping');
  }

  console.log('🎉 Database seeding completed successfully');
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
