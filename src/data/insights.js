/**
 * Articles. `date` is ISO year-month. Body blocks: { type: 'p' | 'h2', text: { en, hy } }.
 * Add a new object to this array to publish a new article (it also appears in the sitemap).
 */
export const insights = [
  {
    slug: 'fast-responsive-web-architecture',
    date: '2026-10',
    readMinutes: 4,
    title: {
      en: 'Architecting Fast, Responsive & User-Friendly Web Apps with React & Next.js',
      hy: 'Արագ, ադապտիվ և օգտատիրոջ համար հարմար վեբ հավելվածների ճարտարապետություն React-ով և Next.js-ով',
    },
    excerpt: {
      en: 'Detail-oriented front-end strategies for turning complex designs into flawless digital experiences with clean code.',
      hy: 'Front-end մոտեցումներ, որոնք բարդ դիզայնը վերածում են անթերի թվային փորձառության մաքուր կոդով։',
    },
    body: [
      {
        type: 'p',
        text: {
          en: 'Architecting fast, responsive, and user-friendly web applications requires a strong foundation in modern JavaScript, TypeScript, React.js and Next.js. Turning complex designs into flawless digital experiences demands clean, maintainable code, disciplined state management, and modern web standards.',
          hy: 'Արագ, ադապտիվ և օգտատիրոջ համար հարմար վեբ հավելվածների ճարտարապետությունը պահանջում է ժամանակակից JavaScript-ի, TypeScript-ի, React.js-ի և Next.js-ի ամուր հիմք։ Բարդ դիզայնը անթերի թվային փորձառության վերածելը պահանջում է մաքուր, պահպանելի կոդ, կարգապահ վիճակի կառավարում և ժամանակակից վեբ ստանդարտներ։',
        },
      },
      { type: 'h2', text: { en: '1. Modular Architecture & Clean Code', hy: '1. Մոդուլային ճարտարապետություն և մաքուր կոդ' } },
      {
        type: 'p',
        text: {
          en: 'A disciplined component architecture ensures scalability and fast load times across devices. Maintaining high standards for typography, layout hierarchies, and accessible DOM structures creates digital products that users love to engage with.',
          hy: 'Կոմպոնենտային ճարտարապետության կարգապահությունը ապահովում է մասշտաբավորելիություն և արագ բեռնում տարբեր սարքերում։ Տառատեսակի, դասավորության հիերարխիայի և հասանելի DOM կառուցվածքի բարձր չափանիշների պահպանումը ստեղծում է թվային արտադրանք, որի հետ օգտատերերը սիրում են շփվել։',
        },
      },
      { type: 'h2', text: { en: '2. Full-Stack AI Integration', hy: '2. Full-stack AI ինտեգրում' } },
      {
        type: 'p',
        text: {
          en: 'Integrating AI capabilities with responsive interfaces opens new horizons for business efficiency. Managing databases, developing robust APIs, and optimizing system reliability are core principles of modern digital product builders.',
          hy: 'AI հնարավորությունների ինտեգրումը ադապտիվ ինտերֆեյսների հետ նոր հորիզոններ է բացում բիզնեսի արդյունավետության համար։ Տվյալների բազաների կառավարումը, ամուր API-ների մշակումը և համակարգի հուսալիության օպտիմալացումը ժամանակակից թվային արտադրանք ստեղծողների հիմնական սկզբունքներն են։',
        },
      },
    ],
  },
  {
    slug: 'integrating-ai-into-production-frontends',
    date: '2026-09',
    readMinutes: 5,
    title: {
      en: 'Infusing Production Web Applications with AI Technologies & REST APIs',
      hy: 'Արտադրական վեբ հավելվածներում AI տեխնոլոգիաների և REST API-ների ինտեգրում',
    },
    excerpt: {
      en: 'Practical full-stack patterns connecting reactive interfaces, modern databases, and AI-driven workflows.',
      hy: 'Գործնական full-stack մոտեցումներ, որոնք կապում են ռեակտիվ ինտերֆեյսները, ժամանակակից տվյալների բազաները և AI-ի վրա հիմնված աշխատանքային հոսքերը։',
    },
    body: [
      {
        type: 'p',
        text: {
          en: 'Adding AI to a production web application is mostly an engineering problem, not a magic one. The patterns below keep interfaces responsive, data trustworthy and integrations maintainable.',
          hy: 'Արտադրական վեբ հավելվածին AI ավելացնելը հիմնականում ինժեներական խնդիր է, ոչ թե կախարդանք։ Ստորև բերված մոտեցումները պահում են ինտերֆեյսները արագ, տվյալները՝ վստահելի, իսկ ինտեգրացիաները՝ պահպանելի։',
        },
      },
      { type: 'h2', text: { en: '1. Keep the model behind your own API', hy: '1. Պահեք մոդելը ձեր սեփական API-ի հետևում' } },
      {
        type: 'p',
        text: {
          en: 'Route model calls through a server-side endpoint instead of calling providers from the browser. It keeps credentials private, lets you validate inputs and outputs, and gives you one place for logging, rate limits and caching.',
          hy: 'Մոդելի կանչերը անցկացրեք սերվերային endpoint-ով՝ բրաուզերից ուղիղ մատակարարին դիմելու փոխարեն։ Այսպես հավատարմագրերը մնում են գաղտնի, կարող եք վավերացնել մուտքերն ու ելքերը, և ունենում եք մեկ տեղ՝ լոգավորման, սահմանափակումների և քեշավորման համար։',
        },
      },
      { type: 'h2', text: { en: '2. Design the interface for latency and uncertainty', hy: '2. Նախագծեք ինտերֆեյսը՝ հաշվի առնելով ուշացումն ու անորոշությունը' } },
      {
        type: 'p',
        text: {
          en: 'AI responses are slower and less predictable than ordinary API calls. Stream results where you can, show clear loading and error states, and let people edit or discard what the model produces.',
          hy: 'AI-ի պատասխանները ավելի դանդաղ և պակաս կանխատեսելի են, քան սովորական API կանչերը։ Հնարավորության դեպքում փոխանցեք արդյունքը հոսքով, ցուցադրեք հստակ բեռնման և սխալի վիճակներ, և թույլ տվեք մարդկանց խմբագրել կամ մերժել մոդելի արդյունքը։',
        },
      },
      { type: 'h2', text: { en: '3. Treat model output as untrusted input', hy: '3. Մոդելի արդյունքը դիտարկեք որպես չվստահված մուտք' } },
      {
        type: 'p',
        text: {
          en: 'Validate the shape of what comes back before saving it or rendering it, and keep a record of prompts and versions so behavior stays reproducible as your product evolves.',
          hy: 'Վավերացրեք ստացված տվյալների կառուցվածքը՝ նախքան պահպանելը կամ ցուցադրելը, և պահեք հուշումների ու տարբերակների գրառումները, որպեսզի վարքը մնա վերարտադրելի արտադրանքի զարգացման հետ։',
        },
      },
    ],
  },
];

export const getInsight = (slug) => insights.find((i) => i.slug === slug);
