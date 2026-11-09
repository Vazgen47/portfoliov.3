/** Ten services. `image` is optional (reused line-art illustrations from the original site). */
export const services = [
  {
    slug: 'websites',
    title: { en: 'Website Design & Development', hy: 'Կայքերի դիզայն և մշակում' },
    short: { en: 'Websites', hy: 'Կայքեր' },
    description: {
      en: 'Fast, responsive websites designed around your brand and built to perform.',
      hy: 'Արագ, ադապտիվ կայքեր, որոնք նախագծվում են ձեր բրենդի շուրջ և ստեղծվում են արդյունք տալու համար։',
    },
    benefits: {
      en: ['Custom design, no templates', 'Responsive on every screen', 'Performance and SEO foundations built in'],
      hy: ['Անհատական դիզայն՝ առանց կաղապարների', 'Ադապտիվ՝ ցանկացած էկրանի վրա', 'Արագության և SEO հիմքերը ներառված են'],
    },
    image: '/assets/images/illustrations/web-dev.webp',
  },
  {
    slug: 'web-applications',
    title: { en: 'Web Applications', hy: 'Վեբ հավելվածներ' },
    short: { en: 'Web apps', hy: 'Վեբ հավելվածներ' },
    description: {
      en: 'Interactive products and dashboards built on React, Next.js and Node.js.',
      hy: 'Ինտերակտիվ արտադրանք և վահանակներ՝ կառուցված React-ով, Next.js-ով և Node.js-ով։',
    },
    benefits: {
      en: ['Scalable architecture', 'REST API and database integration', 'Maintainable, documented code'],
      hy: ['Մասշտաբավորվող ճարտարապետություն', 'REST API-ի և տվյալների բազայի ինտեգրում', 'Պահպանելի, փաստաթղթավորված կոդ'],
    },
    image: null,
  },
  {
    slug: 'mobile-applications',
    title: { en: 'Mobile Applications', hy: 'Մոբայլ հավելվածներ' },
    short: { en: 'Mobile apps', hy: 'Մոբայլ հավելվածներ' },
    description: {
      en: 'Mobile experiences that feel native and ship on a clear plan.',
      hy: 'Մոբայլ փորձառություն, որը զգացվում է բնական և թողարկվում է հստակ պլանով։',
    },
    benefits: {
      en: ['Interfaces designed for touch', 'Shared logic with your web product where it makes sense', 'Release and store-submission guidance'],
      hy: ['Հպման համար նախագծված ինտերֆեյսներ', 'Ընդհանուր տրամաբանություն վեբ արտադրանքի հետ՝ որտեղ իմաստ ունի', 'Թողարկման և խանութներում հրապարակման աջակցություն'],
    },
    image: null,
  },
  {
    slug: 'ui-ux-design',
    title: { en: 'UI/UX Design', hy: 'UI/UX դիզայն' },
    short: { en: 'UI/UX', hy: 'UI/UX' },
    description: {
      en: 'Research-informed interfaces and design systems, from wireframe to high fidelity.',
      hy: 'Հետազոտության վրա հիմնված ինտերֆեյսներ և դիզայն-համակարգեր՝ վայրֆրեյմից մինչև բարձր մանրամասնության դիզայն։',
    },
    benefits: {
      en: ['User flows and wireframes', 'Visual identity and design systems', 'Prototypes before development'],
      hy: ['Օգտատիրոջ հոսքեր և վայրֆրեյմեր', 'Վիզուալ ինքնություն և դիզայն-համակարգեր', 'Նախատիպեր մշակումից առաջ'],
    },
    image: null,
  },
  {
    slug: 'seo-optimization',
    title: { en: 'SEO Optimization', hy: 'SEO օպտիմալացում' },
    short: { en: 'SEO', hy: 'SEO' },
    description: {
      en: 'Technical and on-page SEO so the right people can find you.',
      hy: 'Տեխնիկական և էջային SEO, որպեսզի ճիշտ մարդիկ կարողանան գտնել ձեզ։',
    },
    benefits: {
      en: ['Technical audit and fixes', 'Structured data and metadata', 'Content and keyword structure'],
      hy: ['Տեխնիկական աուդիտ և ուղղումներ', 'Կառուցվածքային տվյալներ և մետատվյալներ', 'Բովանդակության և հիմնաբառերի կառուցվածք'],
    },
    image: '/assets/images/illustrations/seo.webp',
  },
  {
    slug: 'social-media-marketing',
    title: { en: 'Social Media Marketing', hy: 'Սոցիալական մեդիայի մարքեթինգ' },
    short: { en: 'Social media', hy: 'Սոցիալական մեդիա' },
    description: {
      en: 'Content and campaigns that build an audience around your brand.',
      hy: 'Բովանդակություն և քարոզարշավներ, որոնք ձեր բրենդի շուրջ լսարան են կառուցում։',
    },
    benefits: {
      en: ['Content direction and visual language', 'Channel strategy', 'Reporting you can read'],
      hy: ['Բովանդակության ուղղություն և վիզուալ լեզու', 'Ալիքների ռազմավարություն', 'Հասկանալի հաշվետվություններ'],
    },
    image: '/assets/images/illustrations/analytics.webp',
  },
  {
    slug: 'ai-solutions',
    title: { en: 'AI Solutions & Automation', hy: 'AI լուծումներ և ավտոմատացում' },
    short: { en: 'AI', hy: 'AI' },
    description: {
      en: 'Practical AI: assistants, workflows and integrations that remove repetitive work.',
      hy: 'Գործնական AI՝ օգնականներ, աշխատանքային հոսքեր և ինտեգրացիաներ, որոնք վերացնում են կրկնվող աշխատանքը։',
    },
    benefits: {
      en: ['Use cases scoped to real processes', 'LLM and API integrations', 'Human review where it matters'],
      hy: ['Իրական գործընթացների վրա հիմնված դեպքեր', 'LLM և API ինտեգրացիաներ', 'Մարդկային վերանայում՝ որտեղ կարևոր է'],
    },
    image: null,
  },
  {
    slug: 'crm-systems',
    title: { en: 'CRM Systems', hy: 'CRM համակարգեր' },
    short: { en: 'CRM', hy: 'CRM' },
    description: {
      en: 'Custom CRM and internal tools that fit how your team sells and serves.',
      hy: 'Անհատական CRM և ներքին գործիքներ՝ հարմարեցված ձեր թիմի վաճառքի և սպասարկման եղանակին։',
    },
    benefits: {
      en: ['Pipelines and customer records', 'Role-based access', 'Integrations with the tools you already use'],
      hy: ['Վաճառքի ձագարներ և հաճախորդների քարտեր', 'Դերերի վրա հիմնված հասանելիություն', 'Ինտեգրացիաներ արդեն օգտագործվող գործիքների հետ'],
    },
    image: null,
  },
  {
    slug: 'saas-development',
    title: { en: 'SaaS Development', hy: 'SaaS մշակում' },
    short: { en: 'SaaS', hy: 'SaaS' },
    description: {
      en: 'From MVP to subscription product: architecture that is ready for billing and growth.',
      hy: 'MVP-ից մինչև բաժանորդագրային արտադրանք՝ ճարտարապետություն, պատրաստ վճարումների և աճի համար։',
    },
    benefits: {
      en: ['MVP scoping', 'Multi-tenant-ready architecture', 'Authentication and admin tooling'],
      hy: ['MVP-ի շրջանակների սահմանում', 'Բազմաօգտատիրոջ համար պատրաստ ճարտարապետություն', 'Նույնականացում և ադմին գործիքներ'],
    },
    image: null,
  },
  {
    slug: 'digital-strategy',
    title: { en: 'Digital Strategy', hy: 'Թվային ռազմավարություն' },
    short: { en: 'Strategy', hy: 'Ռազմավարություն' },
    description: {
      en: 'A clear plan that connects your goals, audience, product and channels.',
      hy: 'Հստակ պլան, որը կապում է ձեր նպատակները, լսարանը, արտադրանքը և ալիքները։',
    },
    benefits: {
      en: ['Discovery workshops', 'Roadmap and priorities', 'Measurable goals'],
      hy: ['Բացահայտման աշխատաժողովներ', 'Ճանապարհային քարտեզ և առաջնահերթություններ', 'Չափելի նպատակներ'],
    },
    image: '/assets/images/illustrations/global.webp',
  },
];
