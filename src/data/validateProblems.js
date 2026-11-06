const validDifficulties = new Set(["Easy", "Medium", "Hard"]);

export function validateProblems(problems, topics) {
  const topicPatterns = new Map(
    topics.map((topic) => [
      topic.id,
      new Set(topic.patterns.map((pattern) => pattern.id))
    ])
  );
  const problemIds = new Set();
  const problemRoutes = new Set();

  for (const problem of problems) {
    for (const field of [
      "id",
      "title",
      "topicId",
      "patternId",
      "difficulty",
      "description"
    ]) {
      if (
        typeof problem[field] !== "string" ||
        problem[field].trim() === ""
      ) {
        throw new Error(
          `Missing or invalid "${field}" in problem "${problem.id ?? "unknown"}"`
        );
      }
    }

    if (!validDifficulties.has(problem.difficulty)) {
      throw new Error(`Invalid difficulty in problem "${problem.id}"`);
    }

    const patterns = topicPatterns.get(problem.topicId);
    if (!patterns || !patterns.has(problem.patternId)) {
      throw new Error(
        `Unknown topic or pattern for problem "${problem.id}": ` +
          `${problem.topicId}/${problem.patternId}`
      );
    }

    if (problemIds.has(problem.id)) {
      throw new Error(`Duplicate problem ID detected: ${problem.id}`);
    }

    const route = [
      problem.topicId,
      problem.patternId,
      problem.id
    ].join("/");

    if (problemRoutes.has(route)) {
      throw new Error(`Duplicate problem route detected: ${route}`);
    }

    if (
      problem.contentType === "markdown" &&
      (typeof problem.content !== "string" ||
        problem.content.trim() === "") &&
      problem.contentStatus !== "complete"
    ) {
      throw new Error(`Missing Markdown content in problem "${problem.id}"`);
    }

    problemIds.add(problem.id);
    problemRoutes.add(route);
  }
}
