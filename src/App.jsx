
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import MainLayout from "./layouts/MainLayout";

const Home = lazy(() => import("./pages/Home"));
const DsaPage = lazy(() => import("./pages/DsaPage"));
const DsaTopicPage = lazy(() => import("./pages/DsaTopicPage"));
const PatternPage = lazy(() => import("./pages/PatternPage"));
const ProblemDetailPage = lazy(
  () => import("./pages/ProblemDetailPage")
);
const ProblemsExplorerPage = lazy(
  () => import("./pages/ProblemsExplorerPage")
);
const TechnologyPage = lazy(
  () => import("./pages/TechnologyPage")
);
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="route-loading" role="status">
          Loading page…
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route
            path="problems"
            element={<ProblemsExplorerPage />}
          />

          <Route path="dsa" element={<DsaPage />} />

          <Route
            path="dsa/:topicId"
            element={<DsaTopicPage />}
          />

          <Route
            path="dsa/:topicId/:patternId"
            element={<PatternPage />}
          />

          <Route
            path="dsa/:topicId/:patternId/:problemId"
            element={<ProblemDetailPage />}
          />

          <Route
            path=":technology"
            element={<TechnologyPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
