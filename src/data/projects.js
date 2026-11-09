/**
 * Selected works. All facts here come from the original site archive
 * (domain, year, role, stack, one-line description). No results, metrics,
 * awards or testimonials are claimed.
 *
 * To add a screenshot:  put it in /public/assets/images/projects/<slug>.jpg
 *                       and set  cover: '/assets/images/projects/<slug>.jpg'
 * To add a hover video: put it in /public/assets/videos/ and set  video: '/assets/videos/<file>.mp4'
 * While cover is null a generated typographic cover is rendered.
 *
 * category: 'corporate' | 'ecommerce' | 'platform' | 'design'
 */
export const projects = [
  {
    slug: 'haydalek',
    name: 'Haydalek',
    domain: 'haydalek.am',
    url: 'https://haydalek.am',
    year: '2026',
    category: 'corporate',
    role: { en: 'Full-Stack Developer', hy: 'Full-Stack ծրագրավորող' },
    stack: ['React.js', 'Next.js', 'Tailwind CSS', 'REST APIs'],
    summary: {
      en: 'Commercial web presence and product catalog.',
      hy: 'Առևտրային կայք և ապրանքների կատալոգ։',
    },
    scope: {
      en: ['Commercial website and product catalog', 'Customizable production site', 'Modern web standards and responsive layout'],
      hy: ['Առևտրային կայք և ապրանքների կատալոգ', 'Հարմարեցվող արտադրական կայք', 'Ժամանակակից վեբ ստանդարտներ և ադապտիվ դասավորություն'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'hayclima',
    name: 'HayClima',
    domain: 'hayclima.am',
    url: 'https://hayclima.am',
    year: '2026',
    category: 'corporate',
    role: { en: 'Front-End Developer', hy: 'Front-End ծրագրավորող' },
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5'],
    summary: {
      en: 'HVAC and climate systems service portal.',
      hy: 'Օդորակման և կլիմայական համակարգերի սպասարկման պորտալ։',
    },
    scope: {
      en: ['Responsive equipment catalog', 'Service inquiry system'],
      hy: ['Սարքավորումների ադապտիվ կատալոգ', 'Սպասարկման հարցումների համակարգ'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'ecoventgroup',
    name: 'EcoVent Group',
    domain: 'ecoventgroup.am',
    url: 'https://ecoventgroup.am',
    year: '2026',
    category: 'corporate',
    role: { en: 'Full-Stack Developer', hy: 'Full-Stack ծրագրավորող' },
    stack: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    summary: {
      en: 'Industrial ventilation equipment platform.',
      hy: 'Արդյունաբերական օդափոխության սարքավորումների հարթակ։',
    },
    scope: {
      en: ['Engineering specifications', 'Product showcase'],
      hy: ['Ինժեներական բնութագրեր', 'Արտադրանքի ներկայացում'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'rabridge',
    name: 'RABridge',
    domain: 'rabridge.am',
    url: 'https://rabridge.am',
    year: '2026',
    category: 'platform',
    role: { en: 'Full-Stack Developer', hy: 'Full-Stack ծրագրավորող' },
    stack: ['React.js', 'Node.js', 'TypeScript', 'REST APIs'],
    summary: {
      en: 'Enterprise coordination and bridge portal.',
      hy: 'Կորպորատիվ համակարգման պորտալ։',
    },
    scope: {
      en: ['Corporate communication', 'Service workflows'],
      hy: ['Կորպորատիվ հաղորդակցություն', 'Սպասարկման աշխատանքային հոսքեր'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'mkheyan-agency',
    name: 'Mkheyan Agency',
    domain: 'mkheyan.agency',
    url: 'https://mkheyan.agency',
    year: '2026',
    category: 'design',
    role: { en: 'Web Developer / Founder', hy: 'Վեբ ծրագրավորող / հիմնադիր' },
    stack: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Design thinking'],
    summary: {
      en: 'Digital agency showcase, from design to cloud deployment.',
      hy: 'Թվային գործակալության ցուցափեղկ՝ դիզայնից մինչև ամպային տեղակայում։',
    },
    scope: {
      en: ['Custom web solutions from design to deployment', 'Project management and technical delivery'],
      hy: ['Անհատական վեբ լուծումներ՝ դիզայնից մինչև տեղակայում', 'Նախագծի կառավարում և տեխնիկական իրականացում'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'iclone',
    name: 'iClone',
    domain: 'iclone.am',
    url: 'https://iclone.am',
    year: '2026',
    category: 'ecommerce',
    role: { en: 'Full-Stack Developer', hy: 'Full-Stack ծրագրավորող' },
    stack: ['React.js', 'Next.js', 'Redux Toolkit', 'MongoDB', 'REST APIs'],
    summary: {
      en: 'Modern hardware and accessories e-commerce catalog.',
      hy: 'Սարքավորումների և աքսեսուարների ժամանակակից առցանց կատալոգ։',
    },
    scope: {
      en: ['Responsive browsing', 'Cart management', 'Fast checkout flows'],
      hy: ['Ադապտիվ դիտարկում', 'Զամբյուղի կառավարում', 'Արագ վճարման հոսքեր'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'onlyluxe',
    name: 'OnlyLuxe',
    domain: 'onlyluxe.am',
    url: 'https://onlyluxe.am',
    year: '2026',
    category: 'design',
    role: { en: 'Front-End Developer', hy: 'Front-End ծրագրավորող' },
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'SASS / CSS3'],
    summary: {
      en: 'Premium digital boutique and luxury showcase.',
      hy: 'Պրեմիում թվային բուտիկ և շքեղ ապրանքների ցուցադրություն։',
    },
    scope: {
      en: ['High-contrast aesthetics', 'Bespoke brand presentation'],
      hy: ['Բարձր կոնտրաստի էսթետիկա', 'Բրենդի անհատական ներկայացում'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'bloggerawards',
    name: 'Blogger Awards',
    domain: 'bloggerawards.am',
    url: 'https://bloggerawards.am',
    year: '2026',
    category: 'platform',
    role: { en: 'Full-Stack Developer', hy: 'Full-Stack ծրագրավորող' },
    stack: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'REST APIs'],
    summary: {
      en: 'Voting ceremony and creator portal.',
      hy: 'Քվեարկության արարողության և բլոգերների պորտալ։',
    },
    scope: {
      en: ['Nominations', 'Ballot processing', 'Live winner announcements'],
      hy: ['Առաջադրումներ', 'Քվեաթերթիկների մշակում', 'Հաղթողների ուղիղ հայտարարություն'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'gradstroymsk',
    name: 'GradStroy MSK',
    domain: 'gradstroymsk.ru',
    url: 'https://gradstroymsk.ru',
    year: '2026',
    category: 'corporate',
    role: { en: 'Front-End Developer', hy: 'Front-End ծրագրավորող' },
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'HTML5'],
    summary: {
      en: 'Construction engineering and corporate portal.',
      hy: 'Շինարարական ինժեներիայի և կորպորատիվ պորտալ։',
    },
    scope: {
      en: ['Project portfolio', 'Industrial contracting specifications'],
      hy: ['Նախագծերի պորտֆոլիո', 'Արդյունաբերական կապալի բնութագրեր'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'homeler',
    name: 'HOME LER',
    domain: 'homeler.am',
    url: 'https://homeler.am',
    year: '2026',
    category: 'design',
    role: { en: 'UI/UX Designer & Developer', hy: 'UI/UX դիզայներ և ծրագրավորող' },
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Design thinking'],
    summary: {
      en: 'Interior architecture and living-space showroom.',
      hy: 'Ինտերիերի ճարտարապետության և կենցաղային տարածքների շոուրում։',
    },
    scope: {
      en: ['Modern spatial design', 'Portfolio galleries'],
      hy: ['Ժամանակակից տարածական դիզայն', 'Պորտֆոլիոյի պատկերասրահներ'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'digitalprint',
    name: 'Digital Print',
    domain: 'digitalprint.am',
    url: 'https://digitalprint.am',
    year: '2026',
    category: 'platform',
    role: { en: 'Front-End Engineer', hy: 'Front-End ինժեներ' },
    stack: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'REST APIs'],
    summary: {
      en: 'Custom print ordering and prepress production.',
      hy: 'Անհատական տպագրության պատվերներ և նախատպագրական արտադրություն։',
    },
    scope: {
      en: ['Digital printing solutions', 'Custom branding catalog'],
      hy: ['Թվային տպագրության լուծումներ', 'Անհատական բրենդինգի կատալոգ'],
    },
    cover: null,
    video: null,
  },
  {
    slug: 'shiftagency',
    name: 'SHIFT Agency',
    domain: 'shiftagency.am',
    url: 'https://shiftagency.am',
    year: '2026',
    category: 'platform',
    role: { en: 'Full-Stack AI Developer', hy: 'Full-Stack AI ծրագրավորող' },
    stack: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB'],
    summary: {
      en: 'Digital marketing agency platform with AI technologies and database management.',
      hy: 'Թվային մարքեթինգի գործակալության հարթակ՝ AI տեխնոլոգիաներով և տվյալների բազաների կառավարմամբ։',
    },
    scope: {
      en: ['Full web applications', 'AI technologies', 'Database management'],
      hy: ['Ամբողջական վեբ հավելվածներ', 'AI տեխնոլոգիաներ', 'Տվյալների բազաների կառավարում'],
    },
    cover: null,
    video: null,
  },
];

export const projectCategories = ['all', 'corporate', 'ecommerce', 'platform', 'design'];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
