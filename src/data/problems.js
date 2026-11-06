import { parseMarkdownDocument } from "./parseMarkdownDocument.js";
import { legacyProblems } from "./legacyProblems";
import { questionCatalog } from "./questionCatalog";
import { dsaTopics } from "./dsa";
import { validateProblems } from "./validateProblems";

// Automatically import all Markdown files.
const markdownFiles = import.meta.glob(
  "../content/dsa/**/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true
  }
);

function parseMarkdownProblem(filePath, rawContent) {
  const { attributes, body } = parseMarkdownDocument(rawContent);

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
  ...markdownProblems,
  ...questionCatalog
];

validateProblems(problems, dsaTopics);
