
import { useMemo } from "react";
import { useSearchParams } from "react-router";

import { dsaTopics } from "../data/dsa";
import { problems } from "../data/problems";

import { useProgress } from "../context/ProgressContext";
import useProblemFilters from "../hooks/useProblemFilters";

import ExplorerFilters from "../components/problems/ExplorerFilters";
import ProblemList from "../components/problems/ProblemList";
import ProgressBar from "../components/problems/ProgressBar";

const PAGE_SIZE = 10;

const DEFAULT_FILTERS = {
  search: "",
  topic: "all",
  pattern: "all",
  difficulty: "all",
  status: "all",
  sort: "default"
};

function ProblemsExplorerPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { completedProblems } = useProgress();

  const filters = {
    search: searchParams.get("search") || "",
    topic: searchParams.get("topic") || "all",
    pattern: searchParams.get("pattern") || "all",
    difficulty: searchParams.get("difficulty") || "all",
    status: searchParams.get("status") || "all",
    sort: searchParams.get("sort") || "default"
  };

  const rawPage = Number(searchParams.get("page") || 1);

  const page =
    Number.isSafeInteger(rawPage) && rawPage > 0
      ? rawPage
      : 1;

  const availablePatterns = useMemo(() => {
    const selectedTopics =
      filters.topic === "all"
        ? dsaTopics
        : dsaTopics.filter(
            (topic) => topic.id === filters.topic
          );

    return selectedTopics.flatMap((topic) =>
      topic.patterns.map((pattern) => ({
        id: `${topic.id}:${pattern.id}`,
        title: `${topic.title} — ${pattern.title}`
      }))
    );
  }, [filters.topic]);

  const {
    paginatedProblems,
    totalResults,
    totalPages,
    currentPage
  } = useProblemFilters({
    problems,
    search: filters.search,
    topic: filters.topic,
    pattern: filters.pattern,
    difficulty: filters.difficulty,
    status: filters.status,
    sort: filters.sort,
    completedProblems,
    page,
    pageSize: PAGE_SIZE
  });

  const completedCount = problems.filter((problem) =>
    completedProblems.includes(problem.id)
  ).length;

  function updateFilter(name, value) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);

        if (value === DEFAULT_FILTERS[name]) {
          next.delete(name);
        } else {
          next.set(name, value);
        }

        if (name === "topic") {
          next.delete("pattern");
        }

        next.delete("page");

        return next;
      },
      { replace: true }
    );
  }

  function resetFilters() {
    setSearchParams({}, { replace: true });
  }

  function changePage(nextPage) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      if (nextPage <= 1) {
        next.delete("page");
      } else {
        next.set("page", String(nextPage));
      }

      return next;
    });
  }

  return (
    <section className="content-page explorer-page">
      <h1>Explore Coding Problems</h1>

      <p className="page-description">
        Browse pattern-wise DSA problems, filter by
        difficulty, and track your learning progress.
      </p>

      <ProgressBar
        completed={completedCount}
        total={problems.length}
      />

      <ExplorerFilters
        filters={filters}
        topics={dsaTopics}
        patterns={availablePatterns}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      <div className="explorer-results-heading">
        <h2>{totalResults} Problems Found</h2>

        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <ProblemList problems={paginatedProblems} />

      {totalPages > 1 && (
        <nav
          className="pagination"
          aria-label="Problem pagination"
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            ← Previous
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Next →
          </button>
        </nav>
      )}
    </section>
  );
}

export default ProblemsExplorerPage;
