const contentLoaders = {
  "basic-programming-number-problems": async () =>
    (await import("./workedContentBasics.js")).basicsContent,
  traversal: async () =>
    (await import("./workedContentArrayTraversal.js")).arrayTraversalContent,
  hashing: async () =>
    (await import("./workedContentArrayHashing.js")).arrayHashingContent,
  "prefix-sums-difference-arrays": async () =>
    (await import("./workedContentPrefixSums.js")).prefixSumsContent,
  "two-pointers": async () =>
    (await import("./workedContentTwoPointers.js")).twoPointersContent,
  "sliding-window": async () =>
    (await import("./workedContentSlidingWindow.js")).slidingWindowContent,
  "binary-search": async () =>
    (await import("./workedContentBinarySearch.js")).binarySearchContent,
  "sorting-selection": async () =>
    (await import("./workedContentSortingSelection.js")).sortingSelectionContent,
  "matrix-grid": async () =>
    (await import("./workedContentMatrixGrid.js")).matrixGridContent,
  "linked-lists": async () =>
    (await import("./workedContentLinkedLists.js")).linkedListContent,
  "stack-queue": async () =>
    (await import("./workedContentStackQueue.js")).stackQueueContent,
  "monotonic-stack-queue": async () =>
    (await import("./workedContentMonotonicStack.js")).monotonicStackContent,
  "recursion-backtracking": async () =>
    (await import("./workedContentRecursionBacktracking.js")).recursionBacktrackingContent,
  "dp-grids-knapsack-partitioning": async () =>
    (await import("./workedContentDpGrids.js")).dpGridsContent,
  "one-dimensional": async () =>
    (await import("./workedContentDpOneDimensional.js")).dpOneDimensionalContent,
  "dp-strings-subsequences": async () =>
    (await import("./workedContentDpStrings.js")).dpStringsContent,
  "greedy-algorithms": async () =>
    (await import("./workedContentGreedy.js")).greedyContent,
  "disjoint-set-union": async () =>
    (await import("./workedContentDisjointSet.js")).disjointSetContent,
  "shortest-paths-mst": async () =>
    (await import("./workedContentShortestPathsMst.js")).shortestPathsMstContent,
  "topological-sort": async () =>
    (await import("./workedContentTopologicalSort.js")).topologicalSortContent,
  "graph-traversal": async () =>
    (await import("./workedContentGraphTraversal.js")).graphTraversalContent,
  "trie-prefix-search": async () =>
    (await import("./workedContentTries.js")).triesContent,
  "heap-priority-queue": async () =>
    (await import("./workedContentHeapPriorityQueue.js")).heapContent,
  "binary-trees": async () =>
    (await import("./workedContentBinaryTrees.js")).binaryTreeContent,
  "binary-search-trees": async () =>
    (await import("./workedContentBinarySearchTrees.js")).binarySearchTreeContent
};

export async function loadQuestionContent(problem) {
  const loadContent = contentLoaders[problem.patternId];
  if (!loadContent) {
    throw new Error(`No solution content loader for pattern "${problem.patternId}"`);
  }

  const content = await loadContent();
  const solution = content[problem.id];
  if (typeof solution !== "string" || solution.trim() === "") {
    throw new Error(`No worked solution found for problem "${problem.id}"`);
  }

  return solution;
}
