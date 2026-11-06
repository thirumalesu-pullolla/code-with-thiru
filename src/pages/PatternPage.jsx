import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router";

import { dsaTopics } from "../data/dsa";
import { problems } from "../data/problems";

import ProblemFilters from "../components/problems/ProblemFilters";
import ProblemList from "../components/problems/ProblemList";
import ProgressBar from "../components/problems/ProgressBar";

import { useProgress } from "../context/useProgress";
import NotFound from "./NotFound";

function PatternPage() {
  const { topicId, patternId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const requestedDifficulty = searchParams.get("difficulty");
  const difficulty = ["Easy", "Medium", "Hard"].includes(requestedDifficulty)
    ? requestedDifficulty
    : "All";

  const { completedProblems } = useProgress();

  const topic = dsaTopics.find((item) => item.id === topicId);
  const pattern = topic?.patterns.find(
    (item) => item.id === patternId
  );

  const patternProblems = useMemo(
    () =>
      problems.filter(
        (problem) =>
          problem.topicId === topicId &&
          problem.patternId === patternId
      ),
    [topicId, patternId]
  );

  const filteredProblems = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return patternProblems.filter((problem) => {
      const matchesSearch = problem.title
        .toLowerCase()
        .includes(searchTerm);

      const matchesDifficulty =
        difficulty === "All" ||
        problem.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [patternProblems, search, difficulty]);

  const solvedCount = patternProblems.filter((problem) =>
    completedProblems.includes(problem.id)
  ).length;

  function updateFilter(name, value) {
    const nextParams = new URLSearchParams(searchParams);

    if (!value || value === "All") {
      nextParams.delete(name);
    } else {
      nextParams.set(name, value);
    }

    setSearchParams(nextParams, { replace: true });
  }

  if (!topic || !pattern) {
    return <NotFound />;
  }

  return (
    <section className="content-page">
      <Link to={`/dsa/${topicId}`} className="back-link">
        ← Back to {topic.title}
      </Link>

      <h1>{pattern.title}</h1>

      {patternProblems.length === 0 ? (
        <p className="empty-pattern-message" role="status">
          Questions for this pattern are coming soon.
        </p>
      ) : (
        <>
          <p className="page-description">
            Search, practice, and track your coding progress.
          </p>

          <ProgressBar
            completed={solvedCount}
            total={patternProblems.length}
          />

          <ProblemFilters
            search={search}
            onSearchChange={(value) => updateFilter("q", value)}
            difficulty={difficulty}
            onDifficultyChange={(value) => updateFilter("difficulty", value)}
          />

          <ProblemList problems={filteredProblems} />
        </>
      )}
    </section>
  );
}

export default PatternPage;
