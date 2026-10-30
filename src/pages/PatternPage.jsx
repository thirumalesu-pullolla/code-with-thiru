
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";

import { dsaTopics } from "../data/dsa";
import  { legacyProblems }  from "../data/legacyProblems";

import ProblemFilters from "../components/problems/ProblemFilters";
import ProblemList from "../components/problems/ProblemList";
import ProgressBar from "../components/problems/ProgressBar";

import { useProgress } from "../context/ProgressContext";
import NotFound from "./NotFound";

function PatternPage() {
  const { topicId, patternId } = useParams();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const { completedProblems } = useProgress();

  const topic = dsaTopics.find(
    (item) => item.id === topicId
  );

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
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm);

      const matchesDifficulty =
        difficulty === "All" ||
        problem.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [patternProblems, search, difficulty]);

  const solvedCount = patternProblems.filter(
    (problem) => completedProblems.includes(problem.id)
  ).length;

  if (!topic || !pattern) {
    return <NotFound />;
  }

  return (
    <section className="content-page">
      <Link
        to={`/dsa/${topicId}`}
        className="back-link"
      >
        ← Back to {topic.title}
      </Link>

      <h1>{pattern.title}</h1>

      <p className="page-description">
        Search, practice, and track your coding progress.
      </p>

      <ProgressBar
        completed={solvedCount}
        total={patternProblems.length}
      />

      <ProblemFilters
        search={search}
        onSearchChange={setSearch}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />

      <ProblemList problems={filteredProblems} />
    </section>
  );
}

export default PatternPage;
