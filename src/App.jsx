
import { Routes, Route } from "react-router";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import DsaPage from "./pages/DsaPage";
import DsaTopicPage from "./pages/DsaTopicPage";
import PatternPage from "./pages/PatternPage";
import ProblemDetailPage from "./pages/ProblemDetailPage";
import ProblemsExplorerPage from "./pages/ProblemsExplorerPage";
import TechnologyPage from "./pages/TechnologyPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
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
  );
}

export default App;
