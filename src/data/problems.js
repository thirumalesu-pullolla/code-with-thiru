
import frontMatter from "front-matter";
import { legacyProblems } from "./legacyProblems";

// Automatically import all Markdown files.
const markdownFiles = import.meta.glob(
  "../content/dsa/**/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true
  }
);

const validDifficulties = new Set([
  "Easy",
  "Medium",
  "Hard"
]);

function parseMarkdownProblem(filePath, rawContent) {
  const { attributes, body } = frontMatter(rawContent);

  const requiredFields = [
    "id",
    "title",
    "topicId",
    "patternId",
    "difficulty",
    "description"
  ];

  for (const field of requiredFields) {
    if (
      typeof attributes[field] !== "string" ||
      attributes[field].trim() === ""
    ) {
      throw new Error(
        `Missing or invalid "${field}" in ${filePath}`
      );
    }
  }

  if (!validDifficulties.has(attributes.difficulty)) {
    throw new Error(
      `Invalid difficulty in ${filePath}`
    );
  }

  return {
    id: attributes.id,
    title: attributes.title,
    topicId: attributes.topicId,
    patternId: attributes.patternId,
    difficulty: attributes.difficulty,
    description: attributes.description,
    contentType: "markdown",
    content: body
  };
}

const markdownProblems = Object.entries(markdownFiles).map(
  ([filePath, rawContent]) =>
    parseMarkdownProblem(filePath, rawContent)
);

export const problems = [
  ...legacyProblems,
  ...markdownProblems
];

// Validate unique IDs and routes.
const problemIds = new Set();
const problemRoutes = new Set();

for (const problem of problems) {
  if (problemIds.has(problem.id)) {
    throw new Error(
      `Duplicate problem ID detected: ${problem.id}`
    );
  }

  const route = [
    problem.topicId,
    problem.patternId,
    problem.id
  ].join("/");

  if (problemRoutes.has(route)) {
    throw new Error(
      `Duplicate problem route detected: ${route}`
    );
  }

  problemIds.add(problem.id);
  problemRoutes.add(route);
}
