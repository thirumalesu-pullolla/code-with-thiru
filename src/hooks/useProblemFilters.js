
import { useMemo } from "react";

const difficultyOrder = {
  Easy: 1,
  Medium: 2,
  Hard: 3
};

export default function useProblemFilters({
  problems,
  search,
  topic,
  pattern,
  difficulty,
  status,
  sort,
  completedProblems,
  page,
  pageSize = 10
}) {
  const filteredProblems = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const completedSet = new Set(completedProblems);

    const result = problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm) ||
        problem.description.toLowerCase().includes(searchTerm);

      const matchesTopic =
        topic === "all" || problem.topicId === topic;

      // Combined topic:pattern ID prevents ambiguity.
      const matchesPattern =
        pattern === "all" ||
        `${problem.topicId}:${problem.patternId}` === pattern;

      const matchesDifficulty =
        difficulty === "all" ||
        problem.difficulty === difficulty;

      const solved = completedSet.has(problem.id);

      const matchesStatus =
        status === "all" ||
        (status === "solved" && solved) ||
        (status === "unsolved" && !solved);

      return (
        matchesSearch &&
        matchesTopic &&
        matchesPattern &&
        matchesDifficulty &&
        matchesStatus
      );
    });

    result.sort((a, b) => {
      if (sort === "title-asc") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "title-desc") {
        return b.title.localeCompare(a.title);
      }

      if (sort === "difficulty-asc") {
        return (
          difficultyOrder[a.difficulty] -
          difficultyOrder[b.difficulty]
        );
      }

      if (sort === "difficulty-desc") {
        return (
          difficultyOrder[b.difficulty] -
          difficultyOrder[a.difficulty]
        );
      }

      return 0;
    });

    return result;
  }, [
    problems,
    search,
    topic,
    pattern,
    difficulty,
    status,
    sort,
    completedProblems
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProblems.length / pageSize)
  );

  const currentPage = Math.min(
    Math.max(page, 1),
    totalPages
  );

  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredProblems.slice(
      startIndex,
      startIndex + pageSize
    );
  }, [filteredProblems, currentPage, pageSize]);

  return {
    filteredProblems,
    paginatedProblems,
    totalPages,
    currentPage,
    totalResults: filteredProblems.length
  };
}
