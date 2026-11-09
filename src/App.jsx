import { useCallback, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { I18nProvider, useI18n } from './i18n/index.jsx';
import { LANG_STORAGE_KEY, localePath, stripLocale } from './config/site.js';
import SmoothScroll from './animations/SmoothScroll.jsx';
import { Curtain, PageWrapper } from './animations/PageTransition.jsx';
import { scrollToHash, scrollToTop } from './animations/lenisStore.js';
import { ScrollTrigger } from './animations/registerGsap.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import WorkDetail from './pages/WorkDetail.jsx';
import Insights from './pages/Insights.jsx';
import InsightArticle from './pages/InsightArticle.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Armenian is served at "/" and English at "/en". If the visitor explicitly chose English earlier
 * (stored in localStorage) and lands on an Armenian URL at the start of a session, send them to /en once.
 */
function useStoredLanguageRedirect(lang) {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (lang !== 'hy') return;
    try {
      if (sessionStorage.getItem('mkheyan:lang-checked')) return;
      sessionStorage.setItem('mkheyan:lang-checked', '1');
      if (localStorage.getItem(LANG_STORAGE_KEY) === 'en') {
        navigate(`${localePath('en', stripLocale(pathname))}${search}${hash}`, { replace: true });
      }
    } catch {
      /* storage unavailable — stay on the current language */
    }
    // run once per page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Scroll restoration for route changes + in-page #hash navigation (works with Lenis or native scroll). */
function useRouteScroll() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(null);
  const pendingNavigation = useRef(false);
  const latestHash = useRef(hash);
  latestHash.current = hash;

  useEffect(() => {
    if (previousPath.current === null) {
      // first load: honour a #hash in the URL once layout has settled
      if (hash) window.setTimeout(() => scrollToHash(hash, { immediate: true }), 400);
    } else if (previousPath.current !== pathname) {
      // new page: the old one is still animating out; scroll when it has been removed
      pendingNavigation.current = true;
    } else if (hash) {
      scrollToHash(hash);
    }
    previousPath.current = pathname;
  }, [pathname, hash]);

  return useCallback(() => {
    if (!pendingNavigation.current) return;
    pendingNavigation.current = false;
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (latestHash.current) scrollToHash(latestHash.current, { immediate: true });
      else scrollToTop(true);
    });
  }, []);
}

function LangLayout({ lang }) {
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const onExitComplete = useRouteScroll();
  useStoredLanguageRedirect(lang);

  return (
    <I18nProvider lang={lang}>
      <LayoutBody outlet={outlet} routeKey={`${lang}:${pathname}`} onExitComplete={onExitComplete} />
    </I18nProvider>
  );
}


function LayoutBody({ outlet, routeKey, onExitComplete }) {
  const { t } = useI18n();
  return (
    <>
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <Header />
      <Curtain routeKey={routeKey} />
      <AnimatePresence mode="wait" initial={false} onExitComplete={onExitComplete}>
        <PageWrapper key={routeKey}>{outlet}</PageWrapper>
      </AnimatePresence>
      <Footer />
    </>
  );
}

const pageRoutes = () => [
  <Route key="home" index element={<Home />} />,
  <Route key="work" path="work/:slug" element={<WorkDetail />} />,
  <Route key="insights" path="insights" element={<Insights />} />,
  <Route key="article" path="insights/:slug" element={<InsightArticle />} />,
  <Route key="404" path="*" element={<NotFound />} />,
];

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route element={<LangLayout lang="hy" />}>{pageRoutes()}</Route>
          <Route path="/en" element={<LangLayout lang="en" />}>
            {pageRoutes()}
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
