import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { dsaTopics } from "../src/data/dsa.js";
import { legacyProblems } from "../src/data/legacyProblems.js";
import { questionCatalog } from "../src/data/questionCatalog.js";
import { loadQuestionContent } from "../src/data/questionContent.js";
import { validateProblems } from "../src/data/validateProblems.js";
import { parseMarkdownDocument } from "../src/data/parseMarkdownDocument.js";

const markdownRoot = fileURLToPath(
  new URL("../src/content/dsa/", import.meta.url)
);

function getMarkdownProblems(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        return getMarkdownProblems(path);
      }

      if (!entry.isFile() || !entry.name.endsWith(".md")) {
        return [];
      }

      const { attributes, body } = parseMarkdownDocument(
        readFileSync(path, "utf8")
      );

      return [{ ...attributes, contentType: "markdown", content: body }];
    }
  );
}

test("all problem sources reference declared patterns", () => {
  const markdownProblems = getMarkdownProblems(markdownRoot);
  assert.ok(markdownProblems.length > 0);

  assert.doesNotThrow(() =>
    validateProblems(
      [...legacyProblems, ...markdownProblems, ...questionCatalog],
      dsaTopics
    )
  );
});

test("completed patterns have worked solutions for every listed problem", async () => {
  const completedProblems = questionCatalog.filter(
    (problem) => problem.contentStatus === "complete"
  );
  const basicProblems = questionCatalog.filter(
    (problem) => problem.topicId === "basics"
  );
  const traversalProblems = questionCatalog.filter(
    (problem) => problem.topicId === "arrays" && problem.patternId === "traversal"
  );
  const hashingProblems = questionCatalog.filter(
    (problem) => problem.topicId === "arrays" && problem.patternId === "hashing"
  );
  const twoPointerProblems = questionCatalog.filter(
    (problem) =>
      problem.topicId === "arrays" && problem.patternId === "two-pointers"
  );
  const prefixProblems = questionCatalog.filter(
    (problem) =>
      problem.topicId === "arrays" &&
      problem.patternId === "prefix-sums-difference-arrays"
  );
  const slidingWindowProblems = questionCatalog.filter(
    (problem) =>
      problem.topicId === "arrays" && problem.patternId === "sliding-window"
  );
  const binarySearchProblems = questionCatalog.filter(
    (problem) =>
      problem.topicId === "arrays" && problem.patternId === "binary-search"
  );
  const sortingSelectionProblems = questionCatalog.filter(
    (problem) =>
      problem.topicId === "arrays" && problem.patternId === "sorting-selection"
  );
  const matrixGridProblems = questionCatalog.filter(
    (problem) => problem.topicId === "arrays" && problem.patternId === "matrix-grid"
  );
  const linkedListProblems = questionCatalog.filter(
    (problem) => problem.topicId === "linked-lists" && problem.patternId === "linked-lists"
  );
  const stackQueueProblems = questionCatalog.filter(
    (problem) => problem.topicId === "stacks-queues" && problem.patternId === "stack-queue"
  );
  const monotonicStackProblems = questionCatalog.filter(
    (problem) => problem.topicId === "stacks-queues" && problem.patternId === "monotonic-stack-queue"
  );
  const recursionBacktrackingProblems = questionCatalog.filter(
    (problem) =>
      problem.topicId === "recursion-backtracking" &&
      problem.patternId === "recursion-backtracking"
  );

  assert.equal(basicProblems.length, 20);
  assert.equal(traversalProblems.length, 27);
  assert.equal(hashingProblems.length, 20);
  assert.equal(twoPointerProblems.length, 20);
  assert.equal(prefixProblems.length, 15);
  assert.equal(slidingWindowProblems.length, 20);
  assert.equal(binarySearchProblems.length, 25);
  assert.equal(sortingSelectionProblems.length, 20);
  assert.equal(matrixGridProblems.length, 20);
  assert.equal(linkedListProblems.length, 20);
  assert.equal(stackQueueProblems.length, 20);
  assert.equal(monotonicStackProblems.length, 15);
  assert.equal(recursionBacktrackingProblems.length, 20);
  assert.equal(questionCatalog.length, 450);
  assert.equal(completedProblems.length, 450);
  for (const [patternId, expectedCount] of Object.entries({
    "dp-grids-knapsack-partitioning": 18,
    "one-dimensional": 15,
    "dp-strings-subsequences": 15,
    "greedy-algorithms": 20,
    "disjoint-set-union": 10,
    "shortest-paths-mst": 15,
    "topological-sort": 10,
    "graph-traversal": 20,
    "trie-prefix-search": 10,
    "heap-priority-queue": 15,
    "binary-trees": 25,
    "binary-search-trees": 15
  })) {
    assert.equal(
      questionCatalog.filter((problem) => problem.patternId === patternId).length,
      expectedCount,
      `Unexpected problem count for ${patternId}`
    );
  }
  assert.ok(
    [
      ...basicProblems,
      ...traversalProblems,
      ...hashingProblems,
      ...prefixProblems,
      ...twoPointerProblems,
      ...slidingWindowProblems,
      ...binarySearchProblems,
      ...sortingSelectionProblems,
      ...matrixGridProblems,
      ...linkedListProblems,
      ...stackQueueProblems,
      ...monotonicStackProblems,
      ...recursionBacktrackingProblems
    ].every((problem) => problem.contentStatus === "complete")
  );

  for (const problem of completedProblems) {
    const content = await loadQuestionContent(problem);
    assert.match(content, /## Examples?/);
    assert.match(content, /## Brute-force approach/);
    assert.match(content, /## Optimized approach/);
    assert.match(content, /\*\*Time:\*\*/);
    assert.match(content, /\*\*Extra space:\*\*/);
    assert.ok((content.match(/(?:~~~|```)\s*java/g) ?? []).length >= 2);
  }
});

test("unfinished catalog prompts remain explicitly marked as drafts", () => {
  const drafts = questionCatalog.filter(
    (problem) => problem.contentStatus === "draft"
  );

  assert.equal(drafts.length, 0);
  assert.ok(drafts.every((problem) => problem.contentStatus === "draft"));
});

test("problem validation rejects unknown topic and pattern IDs", () => {
  const problem = {
    id: "valid-problem",
    title: "Valid problem",
    topicId: "unknown-topic",
    patternId: "unknown-pattern",
    difficulty: "Easy",
    description: "A sample problem."
  };

  assert.throws(
    () => validateProblems([problem], dsaTopics),
    /Unknown topic or pattern/
  );
});

test("problem validation rejects duplicate IDs and invalid difficulty", () => {
  const problem = {
    id: "valid-problem",
    title: "Valid problem",
    topicId: "arrays",
    patternId: "traversal",
    difficulty: "Easy",
    description: "A sample problem."
  };

  assert.throws(
    () => validateProblems([problem, problem], dsaTopics),
    /Duplicate problem ID/
  );

  assert.throws(
    () =>
      validateProblems(
        [{ ...problem, difficulty: "Unknown" }],
        dsaTopics
      ),
    /Invalid difficulty/
  );
});
