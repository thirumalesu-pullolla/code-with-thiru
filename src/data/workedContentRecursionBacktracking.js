export const recursionBacktrackingContent = {
  "rb-factorial": `## Problem statement

Given non-negative n, calculate n! recursively. This implementation uses long and rejects inputs whose factorial overflows.

## Example

n = 5 returns 120; 0! returns 1.

## Brute-force approach: multiply every factor iteratively

\`\`\`java
public class Solution {
    public static long factorialBruteForce(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        long result = 1;
        for (int i = 2; i <= n; i++) result = Math.multiplyExact(result, i);
        return result;
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(1)

## Optimized approach: recursive factorial

Use the recurrence n! = n * (n-1)! with 0! = 1.

\`\`\`java
public class Solution {
    public static long factorial(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        if (n < 2) return 1;
        return Math.multiplyExact(n, factorial(n - 1));
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n) recursion stack`,

  "rb-fibonacci-memoization": `## Problem statement

Return the first n Fibonacci numbers starting with 0, 1. Compare plain recursion with memoization.

## Example

n = 7 returns \`[0, 1, 1, 2, 3, 5, 8]\`.

## Brute-force approach: direct recursive Fibonacci

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Long> fibonacciBruteForce(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        List<Long> result = new ArrayList<>();
        for (int i = 0; i < n; i++) result.add(fib(i));
        return result;
    }
    private static long fib(int n) {
        if (n < 2) return n;
        return Math.addExact(fib(n - 1), fib(n - 2));
    }
}
\`\`\`

- **Time:** O(2^n)
- **Extra space:** O(n) recursion plus output

## Optimized approach: memoize while generating

Each Fibonacci value is computed once; this version detects long overflow.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Long> fibonacci(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        List<Long> result = new ArrayList<>();
        long[] memo = new long[n];
        boolean[] ready = new boolean[n];
        for (int i = 0; i < n; i++) result.add(fib(i, memo, ready));
        return result;
    }
    private static long fib(int n, long[] memo, boolean[] ready) {
        if (n < 2) return n;
        if (!ready[n]) {
            memo[n] = Math.addExact(fib(n - 1, memo, ready), fib(n - 2, memo, ready));
            ready[n] = true;
        }
        return memo[n];
    }
}
\`\`\`

- **Time:** O(n)
- **Extra space:** O(n) memo and recursion, plus output`,

  "rb-subsets-array": `## Problem statement

Given distinct values, return every subset, including the empty set and the full set.

## Example

\`[1, 2]\` returns \`[[], [2], [1], [1, 2]]\` (order may vary).

## Brute-force approach: enumerate bit masks

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> subsetsBruteForce(int[] values) {
        if (values.length >= 31) throw new IllegalArgumentException("Use a larger mask representation");
        List<List<Integer>> result = new ArrayList<>();
        for (int mask = 0; mask < (1 << values.length); mask++) {
            List<Integer> subset = new ArrayList<>();
            for (int i = 0; i < values.length; i++) if ((mask & (1 << i)) != 0) subset.add(values[i]);
            result.add(subset);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n * 2^n)
- **Extra space:** O(n * 2^n) including output

## Optimized approach: recursive include/exclude

At each value, recurse once without it and once with it.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> subsets(int[] values) {
        List<List<Integer>> result = new ArrayList<>();
        build(values, 0, new ArrayList<>(), result);
        return result;
    }
    private static void build(int[] a, int index, List<Integer> current, List<List<Integer>> out) {
        if (index == a.length) { out.add(new ArrayList<>(current)); return; }
        build(a, index + 1, current, out);
        current.add(a[index]);
        build(a, index + 1, current, out);
        current.remove(current.size() - 1);
    }
}
\`\`\`

- **Time:** O(n * 2^n)
- **Extra space:** O(n) recursion, excluding output`,

  "rb-subsequences-string": `## Problem statement

Generate every subsequence of a string, preserving character order. Include the empty subsequence.

## Example

\`"ab"\` returns \`["", "b", "a", "ab"]\` (order may vary).

## Brute-force approach: enumerate masks

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> subsequencesBruteForce(String text) {
        if (text.length() >= 31) throw new IllegalArgumentException("String too long for integer mask");
        List<String> result = new ArrayList<>();
        for (int mask = 0; mask < (1 << text.length()); mask++) {
            StringBuilder item = new StringBuilder();
            for (int i = 0; i < text.length(); i++) if ((mask & (1 << i)) != 0) item.append(text.charAt(i));
            result.add(item.toString());
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n * 2^n)
- **Extra space:** O(n * 2^n) including output

## Optimized approach: recursive include/exclude

Each character is either omitted or appended to the current subsequence.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> subsequences(String text) {
        List<String> result = new ArrayList<>();
        build(text, 0, new StringBuilder(), result);
        return result;
    }
    private static void build(String s, int index, StringBuilder current, List<String> out) {
        if (index == s.length()) { out.add(current.toString()); return; }
        build(s, index + 1, current, out);
        current.append(s.charAt(index));
        build(s, index + 1, current, out);
        current.setLength(current.length() - 1);
    }
}
\`\`\`

- **Time:** O(n * 2^n)
- **Extra space:** O(n) recursion, excluding output`,

  "rb-permutations-array": `## Problem statement

Given distinct integers, return all possible permutations.

## Example

\`[1, 2]\` returns \`[[1, 2], [2, 1]]\`.

## Brute-force approach: generate permutations by insertion

Insert each new value into every position of every partial permutation.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> permutationsBruteForce(int[] values) {
        List<List<Integer>> result = new ArrayList<>();
        result.add(new ArrayList<>());
        for (int value : values) {
            List<List<Integer>> next = new ArrayList<>();
            for (List<Integer> partial : result) for (int i = 0; i <= partial.size(); i++) {
                List<Integer> permutation = new ArrayList<>(partial);
                permutation.add(i, value); next.add(permutation);
            }
            result = next;
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n * n!)
- **Extra space:** O(n * n!) including output

## Optimized approach: swap and backtrack

Fix one position at a time by swapping each remaining value into it.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> permute(int[] values) {
        List<List<Integer>> result = new ArrayList<>();
        generate(values.clone(), 0, result);
        return result;
    }
    private static void generate(int[] a, int index, List<List<Integer>> out) {
        if (index == a.length) {
            List<Integer> item = new ArrayList<>();
            for (int value : a) item.add(value);
            out.add(item); return;
        }
        for (int i = index; i < a.length; i++) {
            swap(a, index, i); generate(a, index + 1, out); swap(a, index, i);
        }
    }
    private static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
}
\`\`\`

- **Time:** O(n * n!)
- **Extra space:** O(n) recursion and working copy, excluding output`,

  "rb-unique-permutations": `## Problem statement

Given an integer array that may contain duplicates, return each distinct permutation exactly once.

## Example

\`[1, 1, 2]\` returns \`[[1, 1, 2], [1, 2, 1], [2, 1, 1]]\`.

## Brute-force approach: generate all permutations then deduplicate

\`\`\`java
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static List<List<Integer>> uniquePermutationsBruteForce(int[] values) {
        Set<List<Integer>> unique = new HashSet<>();
        generate(values.clone(), 0, unique);
        return new ArrayList<>(unique);
    }
    private static void generate(int[] a, int index, Set<List<Integer>> out) {
        if (index == a.length) {
            List<Integer> item = new ArrayList<>();
            for (int value : a) item.add(value);
            out.add(item); return;
        }
        for (int i = index; i < a.length; i++) {
            swap(a, index, i); generate(a, index + 1, out); swap(a, index, i);
        }
    }
    private static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
}
\`\`\`

- **Time:** O(n * n!) before deduplication
- **Extra space:** O(n * n!) including duplicate candidates

## Optimized approach: skip duplicate choices at each depth

Sort the values and avoid choosing an equal value twice for the same permutation position.

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<List<Integer>> permuteUnique(int[] values) {
        int[] a = values.clone(); Arrays.sort(a);
        List<List<Integer>> result = new ArrayList<>();
        generate(a, new boolean[a.length], new ArrayList<>(), result);
        return result;
    }
    private static void generate(int[] a, boolean[] used, List<Integer> current, List<List<Integer>> out) {
        if (current.size() == a.length) { out.add(new ArrayList<>(current)); return; }
        for (int i = 0; i < a.length; i++) {
            if (used[i] || (i > 0 && a[i] == a[i - 1] && !used[i - 1])) continue;
            used[i] = true; current.add(a[i]); generate(a, used, current, out);
            current.remove(current.size() - 1); used[i] = false;
        }
    }
}
\`\`\`

- **Time:** O(n * u), where u is the number of unique permutations
- **Extra space:** O(n) recursion and state, excluding output`,

  "rb-combinations": `## Problem statement

Given n and k, return all ways to choose k distinct integers from 1 through n.

## Example

n = 4, k = 2 returns \`[[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]\`.

## Brute-force approach: enumerate masks

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> combinationsBruteForce(int n, int k) {
        if (n < 0 || n >= 31 || k < 0) throw new IllegalArgumentException();
        List<List<Integer>> result = new ArrayList<>();
        for (int mask = 0; mask < (1 << n); mask++) if (Integer.bitCount(mask) == k) {
            List<Integer> combination = new ArrayList<>();
            for (int i = 0; i < n; i++) if ((mask & (1 << i)) != 0) combination.add(i + 1);
            result.add(combination);
        }
        return result;
    }
}
\`\`\`

- **Time:** O(n * 2^n)
- **Extra space:** O(n * C(n,k)) including output

## Optimized approach: choose the next value with pruning

Once k values are selected, emit them; otherwise iterate only values that leave enough choices.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        build(n, k, 1, new ArrayList<>(), result);
        return result;
    }
    private static void build(int n, int k, int next, List<Integer> current, List<List<Integer>> out) {
        if (current.size() == k) { out.add(new ArrayList<>(current)); return; }
        int needed = k - current.size();
        for (int value = next; value <= n - needed + 1; value++) {
            current.add(value); build(n, k, value + 1, current, out); current.remove(current.size() - 1);
        }
    }
}
\`\`\`

- **Time:** O(k * C(n,k))
- **Extra space:** O(k) recursion, excluding output`,

  "rb-combination-sum": `## Problem statement

Given distinct positive candidates and a target, return unique combinations that sum to target. A candidate may be reused.

## Example

\`[2, 3, 6, 7]\`, target 7 returns \`[[2, 2, 3], [7]]\`.

## Brute-force approach: enumerate bounded candidate counts

For each candidate, try every count that fits the remaining target.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> combinationSumBruteForce(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        enumerate(candidates, 0, target, new ArrayList<>(), result);
        return result;
    }
    private static void enumerate(int[] a, int index, int remaining, List<Integer> current, List<List<Integer>> out) {
        if (index == a.length) { if (remaining == 0) out.add(new ArrayList<>(current)); return; }
        if (a[index] <= 0) throw new IllegalArgumentException("Candidates must be positive");
        for (int count = 0; count * (long) a[index] <= remaining; count++) {
            for (int i = 0; i < count; i++) current.add(a[index]);
            enumerate(a, index + 1, remaining - count * a[index], current, out);
            for (int i = 0; i < count; i++) current.remove(current.size() - 1);
        }
    }
}
\`\`\`

- **Time:** O(product of (1 + target/candidate)) plus output
- **Extra space:** O(target/minCandidate) recursion and current path

## Optimized approach: backtrack from the current candidate

Reuse the current candidate by recursing with the same index; advancing the index prevents duplicate orderings.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        search(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }
    private static void search(int[] a, int remaining, int start, List<Integer> path, List<List<Integer>> out) {
        if (remaining == 0) { out.add(new ArrayList<>(path)); return; }
        for (int i = start; i < a.length; i++) {
            if (a[i] <= 0) throw new IllegalArgumentException("Candidates must be positive");
            if (a[i] > remaining) continue;
            path.add(a[i]); search(a, remaining - a[i], i, path, out); path.remove(path.size() - 1);
        }
    }
}
\`\`\`

- **Time:** O(number of explored combinations)
- **Extra space:** O(target/minCandidate) recursion, excluding output`,

  "rb-combination-sum-ii": `## Problem statement

Given candidates that may contain duplicates and a target, return unique combinations summing to target. Each array element may be used at most once.

## Example

\`[10, 1, 2, 7, 6, 1, 5]\`, target 8 returns \`[[1,1,6], [1,2,5], [1,7], [2,6]]\`.

## Brute-force approach: enumerate subsets and deduplicate

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static List<List<Integer>> combinationSum2BruteForce(int[] values, int target) {
        Set<List<Integer>> unique = new HashSet<>();
        enumerate(values, 0, target, new ArrayList<>(), unique);
        return new ArrayList<>(unique);
    }
    private static void enumerate(int[] a, int i, int remaining, List<Integer> path, Set<List<Integer>> out) {
        if (i == a.length) {
            if (remaining == 0) { List<Integer> item = new ArrayList<>(path); item.sort(Integer::compare); out.add(item); }
            return;
        }
        enumerate(a, i + 1, remaining, path, out);
        path.add(a[i]); enumerate(a, i + 1, remaining - a[i], path, out); path.remove(path.size() - 1);
    }
}
\`\`\`

- **Time:** O(2^n * n log n) including canonicalization
- **Extra space:** O(2^n * n) including stored results

## Optimized approach: sort and skip equal siblings

Sort candidates, skip equal values at the same recursion depth, and never reuse an index.

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public static List<List<Integer>> combinationSum2(int[] candidates, int target) {
        int[] a = candidates.clone(); Arrays.sort(a);
        List<List<Integer>> result = new ArrayList<>();
        search(a, target, 0, new ArrayList<>(), result);
        return result;
    }
    private static void search(int[] a, int remaining, int start, List<Integer> path, List<List<Integer>> out) {
        if (remaining == 0) { out.add(new ArrayList<>(path)); return; }
        for (int i = start; i < a.length && a[i] <= remaining; i++) {
            if (i > start && a[i] == a[i - 1]) continue;
            path.add(a[i]); search(a, remaining - a[i], i + 1, path, out); path.remove(path.size() - 1);
        }
    }
}
\`\`\`

- **Time:** O(2^n) worst case
- **Extra space:** O(n) working copy and recursion, excluding output`,

  "rb-generate-parentheses": `## Problem statement

Given n pairs of parentheses, return all well-formed strings.

## Example

n = 3 returns \`["((()))", "(()())", "(())()", "()(())", "()()()"]\`.

## Brute-force approach: generate and validate all strings

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> generateParenthesesBruteForce(int n) {
        List<String> result = new ArrayList<>();
        generate(n, new StringBuilder(), result);
        return result;
    }
    private static void generate(int n, StringBuilder text, List<String> out) {
        if (text.length() == 2 * n) { if (valid(text)) out.add(text.toString()); return; }
        text.append('('); generate(n, text, out); text.setLength(text.length() - 1);
        text.append(')'); generate(n, text, out); text.setLength(text.length() - 1);
    }
    private static boolean valid(CharSequence s) {
        int balance = 0;
        for (int i = 0; i < s.length(); i++) { balance += s.charAt(i) == '(' ? 1 : -1; if (balance < 0) return false; }
        return balance == 0;
    }
}
\`\`\`

- **Time:** O(2^(2n) * n)
- **Extra space:** O(n) recursion, excluding output

## Optimized approach: build only valid prefixes

Add an opening parenthesis while fewer than n are used; add a closing one only when it keeps the prefix valid.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> generateParenthesis(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        List<String> result = new ArrayList<>();
        build(n, 0, 0, new StringBuilder(), result);
        return result;
    }
    private static void build(int n, int open, int close, StringBuilder path, List<String> out) {
        if (path.length() == 2 * n) { out.add(path.toString()); return; }
        if (open < n) { path.append('('); build(n, open + 1, close, path, out); path.setLength(path.length() - 1); }
        if (close < open) { path.append(')'); build(n, open, close + 1, path, out); path.setLength(path.length() - 1); }
    }
}
\`\`\`

- **Time:** O(Cn), where C is the Catalan number of valid strings
- **Extra space:** O(n) recursion, excluding output`,

  "rb-n-queens": `## Problem statement

Place n queens on an n by n board so no two share a row, column, or diagonal. Return every board as strings.

## Example

n = 4 has two solutions.

## Brute-force approach: enumerate row placements and validate

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<String>> solveNQueensBruteForce(int n) {
        List<List<String>> result = new ArrayList<>();
        place(n, 0, new int[n], result);
        return result;
    }
    private static void place(int n, int row, int[] columns, List<List<String>> out) {
        if (row == n) {
            boolean valid = true;
            for (int r = 0; r < n; r++) for (int p = 0; p < r; p++) {
                if (columns[r] == columns[p] || Math.abs(columns[r] - columns[p]) == r - p) valid = false;
            }
            if (valid) out.add(board(columns));
            return;
        }
        for (int c = 0; c < n; c++) { columns[row] = c; place(n, row + 1, columns, out); }
    }
    private static List<String> board(int[] columns) {
        List<String> result = new ArrayList<>();
        for (int c : columns) { char[] row = new char[columns.length]; java.util.Arrays.fill(row, '.'); row[c] = 'Q'; result.add(new String(row)); }
        return result;
    }
}
\`\`\`

- **Time:** O(n! * n²) with leaf validation
- **Extra space:** O(n) recursion, excluding output

## Optimized approach: prune columns and diagonals immediately

Track occupied columns and both diagonal directions while placing one queen per row.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<String>> solveNQueens(int n) {
        if (n < 0) throw new IllegalArgumentException("n must be non-negative");
        List<List<String>> result = new ArrayList<>();
        boolean[] columns = new boolean[n], down = new boolean[2 * n], up = new boolean[2 * n];
        int[] placement = new int[n];
        search(0, n, columns, down, up, placement, result);
        return result;
    }
    private static void search(int row, int n, boolean[] cols, boolean[] down, boolean[] up,
                               int[] placement, List<List<String>> out) {
        if (row == n) { out.add(board(placement)); return; }
        for (int c = 0; c < n; c++) {
            int d = row - c + n, u = row + c;
            if (cols[c] || down[d] || up[u]) continue;
            cols[c] = down[d] = up[u] = true; placement[row] = c;
            search(row + 1, n, cols, down, up, placement, out);
            cols[c] = down[d] = up[u] = false;
        }
    }
    private static List<String> board(int[] placement) {
        List<String> result = new ArrayList<>();
        for (int c : placement) { char[] row = new char[placement.length]; java.util.Arrays.fill(row, '.'); row[c] = 'Q'; result.add(new String(row)); }
        return result;
    }
}
\`\`\`

- **Time:** O(n!) upper bound, plus output construction
- **Extra space:** O(n) search state, excluding output`,

  "rb-sudoku-solver": `## Problem statement

Fill a 9 by 9 Sudoku board in place. Empty cells contain '.'. Return true if a solution exists; otherwise leave the board unchanged and return false.

## Example

The standard partially filled Sudoku puzzle returns true and is completed consistently across rows, columns, and 3 by 3 boxes.

## Brute-force approach: try every digit and validate constraints

\`\`\`java
public class Solution {
    public static boolean solveSudokuBruteForce(char[][] board) {
        int[] cell = findEmpty(board);
        if (cell == null) return true;
        int r = cell[0], c = cell[1];
        for (char digit = '1'; digit <= '9'; digit++) {
            if (valid(board, r, c, digit)) {
                board[r][c] = digit;
                if (solveSudokuBruteForce(board)) return true;
                board[r][c] = '.';
            }
        }
        return false;
    }
    private static int[] findEmpty(char[][] b) {
        for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) if (b[r][c] == '.') return new int[] {r, c};
        return null;
    }
    private static boolean valid(char[][] b, int r, int c, char d) {
        for (int i = 0; i < 9; i++) if (b[r][i] == d || b[i][c] == d) return false;
        int sr = r / 3 * 3, sc = c / 3 * 3;
        for (int i = sr; i < sr + 3; i++) for (int j = sc; j < sc + 3; j++) if (b[i][j] == d) return false;
        return true;
    }
}
\`\`\`

- **Time:** O(9^e) for e empty cells
- **Extra space:** O(e) recursion

## Optimized approach: bit masks and minimum-remaining-values choice

Track used digits in row, column, and box masks; choose the empty cell with the fewest legal digits at each step.

\`\`\`java
public class Solution {
    private static final int ALL = (1 << 9) - 1;
    public static boolean solveSudoku(char[][] board) {
        int[] rows = new int[9], cols = new int[9], boxes = new int[9];
        for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) if (board[r][c] != '.') {
            int bit = 1 << (board[r][c] - '1'), box = r / 3 * 3 + c / 3;
            if ((rows[r] & bit) != 0 || (cols[c] & bit) != 0 || (boxes[box] & bit) != 0) return false;
            rows[r] |= bit; cols[c] |= bit; boxes[box] |= bit;
        }
        return search(board, rows, cols, boxes);
    }
    private static boolean search(char[][] b, int[] rows, int[] cols, int[] boxes) {
        int bestR = -1, bestC = -1, bestMask = 0, bestCount = 10;
        for (int r = 0; r < 9; r++) for (int c = 0; c < 9; c++) if (b[r][c] == '.') {
            int box = r / 3 * 3 + c / 3, mask = ALL & ~(rows[r] | cols[c] | boxes[box]);
            int count = Integer.bitCount(mask);
            if (count < bestCount) { bestCount = count; bestR = r; bestC = c; bestMask = mask; }
        }
        if (bestR == -1) return true;
        if (bestMask == 0) return false;
        int box = bestR / 3 * 3 + bestC / 3;
        while (bestMask != 0) {
            int bit = bestMask & -bestMask; bestMask -= bit;
            b[bestR][bestC] = (char) ('1' + Integer.numberOfTrailingZeros(bit));
            rows[bestR] |= bit; cols[bestC] |= bit; boxes[box] |= bit;
            if (search(b, rows, cols, boxes)) return true;
            rows[bestR] ^= bit; cols[bestC] ^= bit; boxes[box] ^= bit; b[bestR][bestC] = '.';
        }
        return false;
    }
}
\`\`\`

- **Time:** Exponential in empty cells in the worst case; pruning greatly reduces search
- **Extra space:** O(e) recursion plus fixed-size masks`,

  "rb-rat-in-maze": `## Problem statement

Find all paths from the top-left to the bottom-right of a square maze, moving through 1 cells only. Moves are down, left, right, and up. Return paths as strings using D, L, R, U.

## Example

For a 2 by 2 all-open maze, return \`["DR", "RD"]\`.

## Brute-force approach: enumerate simple paths with a visited matrix

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> ratPathsBruteForce(int[][] maze) {
        List<String> out = new ArrayList<>();
        if (maze.length == 0 || maze[0].length == 0 || maze[0][0] == 0) return out;
        boolean[][] seen = new boolean[maze.length][maze[0].length];
        search(maze, 0, 0, seen, new StringBuilder(), out);
        return out;
    }
    private static void search(int[][] m, int r, int c, boolean[][] seen, StringBuilder path, List<String> out) {
        if (r == m.length - 1 && c == m[0].length - 1) { out.add(path.toString()); return; }
        seen[r][c] = true;
        int[] dr = {1, 0, 0, -1}, dc = {0, -1, 1, 0}; char[] move = {'D', 'L', 'R', 'U'};
        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < m.length && nc >= 0 && nc < m[0].length && m[nr][nc] == 1 && !seen[nr][nc]) {
                path.append(move[i]); search(m, nr, nc, seen, path, out); path.setLength(path.length() - 1);
            }
        }
        seen[r][c] = false;
    }
}
\`\`\`

- **Time:** O(4^(mn)) worst case
- **Extra space:** O(mn) visited and recursion, excluding output

## Optimized approach: backtrack with in-place visited marking

Temporarily mark visited cells in the maze, avoiding a separate visited matrix.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> findPaths(int[][] maze) {
        List<String> out = new ArrayList<>();
        int n = maze.length;
        for (int[] row : maze) if (row.length != n) throw new IllegalArgumentException("Maze must be square");
        if (n == 0 || maze[0][0] == 0) return out;
        search(maze, 0, 0, new StringBuilder(), out);
        return out;
    }
    private static void search(int[][] m, int r, int c, StringBuilder path, List<String> out) {
        int n = m.length;
        if (r == n - 1 && c == n - 1) { out.add(path.toString()); return; }
        m[r][c] = 0;
        int[] dr = {1, 0, 0, -1}, dc = {0, -1, 1, 0}; char[] move = {'D', 'L', 'R', 'U'};
        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && m[nr][nc] == 1) {
                path.append(move[i]); search(m, nr, nc, path, out); path.setLength(path.length() - 1);
            }
        }
        m[r][c] = 1;
    }
}
\`\`\`

- **Time:** O(4^(mn)) worst case
- **Extra space:** O(mn) recursion; O(1) visited storage`,

  "rb-word-search": `## Problem statement

Determine whether a word can be formed from adjacent horizontal or vertical grid cells without reusing a cell.

## Example

Board \`[["A","B","C"], ["S","F","C"], ["A","D","E"]]\`, word \`"ABCCED"\` returns true.

## Brute-force approach: search with a visited matrix

\`\`\`java
public class Solution {
    public static boolean existBruteForce(char[][] board, String word) {
        if (word.isEmpty()) return true;
        if (board.length == 0 || board[0].length == 0) return false;
        boolean[][] seen = new boolean[board.length][board[0].length];
        for (int r = 0; r < board.length; r++) for (int c = 0; c < board[0].length; c++) {
            if (search(board, word, r, c, 0, seen)) return true;
        }
        return false;
    }
    private static boolean search(char[][] b, String w, int r, int c, int i, boolean[][] seen) {
        if (i == w.length()) return true;
        if (r < 0 || r >= b.length || c < 0 || c >= b[0].length || seen[r][c] || b[r][c] != w.charAt(i)) return false;
        seen[r][c] = true;
        boolean found = search(b, w, r + 1, c, i + 1, seen) || search(b, w, r - 1, c, i + 1, seen)
                || search(b, w, r, c + 1, i + 1, seen) || search(b, w, r, c - 1, i + 1, seen);
        seen[r][c] = false;
        return found;
    }
}
\`\`\`

- **Time:** O(mn * 4^L), where L is word length
- **Extra space:** O(mn) visited plus O(L) recursion

## Optimized approach: mark visited cells in the board

Temporarily replace a matched cell with a sentinel during recursion, restoring it afterward.

\`\`\`java
public class Solution {
    public static boolean exist(char[][] board, String word) {
        if (word.isEmpty()) return true;
        if (board.length == 0 || board[0].length == 0) return false;
        for (char[] row : board) for (char ch : row) if (ch == '\\0') throw new IllegalArgumentException("Grid contains reserved marker");
        for (int r = 0; r < board.length; r++) for (int c = 0; c < board[0].length; c++) {
            if (search(board, word, r, c, 0)) return true;
        }
        return false;
    }
    private static boolean search(char[][] b, String w, int r, int c, int i) {
        if (r < 0 || r >= b.length || c < 0 || c >= b[0].length || b[r][c] != w.charAt(i)) return false;
        if (i == w.length() - 1) return true;
        char original = b[r][c]; b[r][c] = '\\0';
        boolean found = search(b, w, r + 1, c, i + 1) || search(b, w, r - 1, c, i + 1)
                || search(b, w, r, c + 1, i + 1) || search(b, w, r, c - 1, i + 1);
        b[r][c] = original;
        return found;
    }
}
\`\`\`

- **Time:** O(mn * 4^L) worst case
- **Extra space:** O(L) recursion`,

  "rb-palindrome-partitioning": `## Problem statement

Partition a string into substrings so every part is a palindrome. Return all valid partitions.

## Example

\`"aab"\` returns \`[["a","a","b"], ["aa","b"]]\`.

## Brute-force approach: generate every cut pattern, then validate

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<String>> partitionBruteForce(String text) {
        if (text.length() >= 31) throw new IllegalArgumentException("Input too long for integer mask");
        List<List<String>> result = new ArrayList<>();
        int cuts = Math.max(0, text.length() - 1);
        for (int mask = 0; mask < (1 << cuts); mask++) {
            List<String> parts = new ArrayList<>(); int start = 0; boolean valid = true;
            for (int i = 0; i < text.length(); i++) if (i == text.length() - 1 || (mask & (1 << i)) != 0) {
                String part = text.substring(start, i + 1);
                if (!palindrome(part)) { valid = false; break; }
                parts.add(part); start = i + 1;
            }
            if (valid) result.add(parts);
        }
        return result;
    }
    private static boolean palindrome(String s) {
        for (int l = 0, r = s.length() - 1; l < r; l++, r--) if (s.charAt(l) != s.charAt(r)) return false;
        return true;
    }
}
\`\`\`

- **Time:** O(2^n * n)
- **Extra space:** O(n) working state, excluding output

## Optimized approach: backtrack only at palindrome prefixes

Try each end position, recurse only when the chosen prefix is a palindrome.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<String>> partition(String text) {
        List<List<String>> result = new ArrayList<>();
        search(text, 0, new ArrayList<>(), result);
        return result;
    }
    private static void search(String s, int start, List<String> path, List<List<String>> out) {
        if (start == s.length()) { out.add(new ArrayList<>(path)); return; }
        for (int end = start; end < s.length(); end++) {
            if (!palindrome(s, start, end)) continue;
            path.add(s.substring(start, end + 1)); search(s, end + 1, path, out); path.remove(path.size() - 1);
        }
    }
    private static boolean palindrome(String s, int left, int right) {
        while (left < right) if (s.charAt(left++) != s.charAt(right--)) return false;
        return true;
    }
}
\`\`\`

- **Time:** O(n * 2^n) worst case
- **Extra space:** O(n) recursion and path, excluding output`,

  "rb-restore-ip-addresses": `## Problem statement

Insert three dots into a digit string to form all valid IPv4 addresses. Each segment is 0 through 255 and has no leading zero unless it is exactly "0".

## Example

\`"25525511135"\` returns \`["255.255.11.135", "255.255.111.35"]\`.

## Brute-force approach: try all three dot positions

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> restoreIpBruteForce(String digits) {
        List<String> result = new ArrayList<>();
        for (int a = 1; a < digits.length(); a++) for (int b = a + 1; b < digits.length(); b++)
            for (int c = b + 1; c < digits.length(); c++) {
                String[] parts = {digits.substring(0, a), digits.substring(a, b), digits.substring(b, c), digits.substring(c)};
                if (valid(parts)) result.add(String.join(".", parts));
            }
        return result;
    }
    private static boolean valid(String[] parts) {
        for (String p : parts) {
            if (p.isEmpty() || p.length() > 3 || (p.length() > 1 && p.charAt(0) == '0')) return false;
            int value = Integer.parseInt(p); if (value > 255) return false;
        }
        return true;
    }
}
\`\`\`

- **Time:** O(n³)
- **Extra space:** O(n) for output and candidate strings

## Optimized approach: backtrack over at most three digits per segment

Prune when the remaining characters cannot fill the remaining segments.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> restoreIpAddresses(String digits) {
        List<String> result = new ArrayList<>();
        if (!digits.matches("\\\\d*")) throw new IllegalArgumentException("Digits only");
        search(digits, 0, new ArrayList<>(), result);
        return result;
    }
    private static void search(String s, int index, List<String> parts, List<String> out) {
        int remainingParts = 4 - parts.size(), remainingChars = s.length() - index;
        if (remainingChars < remainingParts || remainingChars > 3 * remainingParts) return;
        if (parts.size() == 4) { if (index == s.length()) out.add(String.join(".", parts)); return; }
        int value = 0;
        for (int end = index; end < s.length() && end < index + 3; end++) {
            if (end > index && s.charAt(index) == '0') break;
            value = value * 10 + s.charAt(end) - '0';
            if (value > 255) break;
            parts.add(s.substring(index, end + 1)); search(s, end + 1, parts, out); parts.remove(parts.size() - 1);
        }
    }
}
\`\`\`

- **Time:** O(1) candidates per input (at most 3^4 splits), excluding output
- **Extra space:** O(1) recursion depth, excluding output`,

  "rb-phone-letter-combinations": `## Problem statement

Given digits 2 through 9, return all letter combinations from a phone keypad. Empty input returns an empty list.

## Example

\`"23"\` returns \`["ad","ae","af","bd","be","bf","cd","ce","cf"]\`.

## Brute-force approach: build combinations iteratively

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    private static final String[] MAP = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    public static List<String> letterCombinationsBruteForce(String digits) {
        List<String> result = new ArrayList<>();
        if (digits.isEmpty()) return result;
        result.add("");
        for (char digit : digits.toCharArray()) {
            int d = digit - '0'; if (d < 2 || d > 9) throw new IllegalArgumentException("Digits must be 2 through 9");
            List<String> next = new ArrayList<>();
            for (String prefix : result) for (char letter : MAP[d].toCharArray()) next.add(prefix + letter);
            result = next;
        }
        return result;
    }
}
\`\`\`

- **Time:** O(4^n * n)
- **Extra space:** O(4^n * n) including output

## Optimized approach: recursive backtracking with one builder

Append each possible letter, recurse to the next digit, then remove the appended character.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    private static final String[] MAP = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    public static List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits.isEmpty()) return result;
        build(digits, 0, new StringBuilder(), result);
        return result;
    }
    private static void build(String digits, int index, StringBuilder path, List<String> out) {
        if (index == digits.length()) { out.add(path.toString()); return; }
        int d = digits.charAt(index) - '0';
        if (d < 2 || d > 9) throw new IllegalArgumentException("Digits must be 2 through 9");
        for (char letter : MAP[d].toCharArray()) {
            path.append(letter); build(digits, index + 1, path, out); path.setLength(path.length() - 1);
        }
    }
}
\`\`\`

- **Time:** O(4^n * n) including output strings
- **Extra space:** O(n) recursion and builder, excluding output`,

  "rb-expression-target": `## Problem statement

Given a digit string and target, insert binary +, -, or * between digits to produce expressions evaluating to target. Preserve digit order and do not create operands with leading zeros.

## Example

\`"123"\`, target 6 returns \`["1+2+3", "1*2*3"]\`.

## Brute-force approach: enumerate operators and evaluate precedence

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> addOperatorsBruteForce(String digits, long target) {
        List<String> result = new ArrayList<>();
        enumerate(digits, 0, new StringBuilder(), result, target);
        return result;
    }
    private static void enumerate(String s, int index, StringBuilder expression, List<String> out, long target) {
        if (index == s.length()) { if (expression.length() > 0 && evaluate(expression.toString()) == target) out.add(expression.toString()); return; }
        int length = expression.length();
        for (int end = index + 1; end <= s.length(); end++) {
            String token = s.substring(index, end);
            if (token.length() > 1 && token.charAt(0) == '0') break;
            if (index == 0) { expression.append(token); enumerate(s, end, expression, out, target); expression.setLength(length); }
            else for (char op : new char[] {'+', '-', '*'}) {
                expression.append(op).append(token); enumerate(s, end, expression, out, target); expression.setLength(length);
            }
        }
    }
    private static long evaluate(String e) {
        long total = 0, term = 0, number = 0; char sign = '+';
        for (int i = 0; i <= e.length(); i++) {
            if (i < e.length() && Character.isDigit(e.charAt(i))) { number = number * 10 + e.charAt(i) - '0'; continue; }
            if (sign == '+') { total += term; term = number; }
            else if (sign == '-') { total += term; term = -number; }
            else term *= number;
            if (i < e.length()) sign = e.charAt(i);
            number = 0;
        }
        return total + term;
    }
}
\`\`\`

- **Time:** O(4^n * n) for expression generation and evaluation
- **Extra space:** O(n) recursion and expression, excluding output

## Optimized approach: track total and last multiplicative term

Evaluate as expressions are built. Replace the last term when adding multiplication to respect precedence.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> addOperators(String digits, long target) {
        List<String> result = new ArrayList<>();
        search(digits, target, 0, 0, 0, new StringBuilder(), result);
        return result;
    }
    private static void search(String s, long target, int index, long total, long last,
                               StringBuilder path, List<String> out) {
        if (index == s.length()) { if (total == target) out.add(path.toString()); return; }
        for (int end = index + 1; end <= s.length(); end++) {
            if (end > index + 1 && s.charAt(index) == '0') break;
            long value;
            try { value = Long.parseLong(s.substring(index, end)); }
            catch (NumberFormatException ex) { break; }
            int length = path.length();
            if (index == 0) {
                path.append(value); search(s, target, end, value, value, path, out); path.setLength(length);
            } else {
                path.append('+').append(value); search(s, target, end, total + value, value, path, out); path.setLength(length);
                path.append('-').append(value); search(s, target, end, total - value, -value, path, out); path.setLength(length);
                path.append('*').append(value);
                search(s, target, end, total - last + last * value, last * value, path, out); path.setLength(length);
            }
        }
    }
}
\`\`\`

- **Time:** O(4^n) worst case, excluding output
- **Extra space:** O(n) recursion and expression`,

  "rb-partition-equal-subsets": `## Problem statement

Determine whether a non-negative integer array can be partitioned into k non-empty subsets with equal sums. Require 1 <= k <= n.

## Example

\`[4, 3, 2, 3, 5, 2, 1]\`, k = 4 returns true.

## Brute-force approach: assign each number to a bucket

\`\`\`java
public class Solution {
    public static boolean canPartitionKSubsetsBruteForce(int[] values, int k) {
        if (k < 1 || k > values.length) return false;
        long total = 0; for (int value : values) { if (value < 0) throw new IllegalArgumentException("Values must be non-negative"); total += value; }
        if (total % k != 0) return false;
        return assign(values, 0, new long[k], total / k);
    }
    private static boolean assign(int[] a, int index, long[] sums, long target) {
        if (index == a.length) { for (long sum : sums) if (sum != target) return false; return true; }
        for (int bucket = 0; bucket < sums.length; bucket++) {
            if (sums[bucket] + a[index] > target) continue;
            sums[bucket] += a[index];
            if (assign(a, index + 1, sums, target)) return true;
            sums[bucket] -= a[index];
            if (sums[bucket] == 0) break;
        }
        return false;
    }
}
\`\`\`

- **Time:** O(k^n)
- **Extra space:** O(n + k) recursion and bucket sums

## Optimized approach: fill one target-sum bucket at a time

Sort descending, place unused values into the current bucket, and memoize failed used-element masks.

\`\`\`java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public static boolean canPartitionKSubsets(int[] values, int k) {
        if (k < 1 || k > values.length) return false;
        if (values.length > 30) throw new IllegalArgumentException("At most 30 values are supported");
        int[] a = values.clone(); Arrays.sort(a);
        long total = 0; for (int value : a) { if (value < 0) throw new IllegalArgumentException("Values must be non-negative"); total += value; }
        if (total % k != 0 || a[a.length - 1] > total / k) return false;
        if (total == 0) return values.length >= k;
        reverse(a);
        return fill(a, k, 0, 0, total / k, new HashSet<>());
    }
    private static boolean fill(int[] a, int buckets, int mask, long sum, long target, Set<Integer> failed) {
        if (buckets == 1) return true;
        if (sum == target) return fill(a, buckets - 1, mask, 0, target, failed);
        if (failed.contains(mask)) return false;
        for (int i = 0; i < a.length; i++) {
            if ((mask & (1 << i)) != 0 || sum + a[i] > target) continue;
            if (fill(a, buckets, mask | (1 << i), sum + a[i], target, failed)) return true;
        }
        failed.add(mask); return false;
    }
    private static void reverse(int[] a) { for (int l = 0, r = a.length - 1; l < r; l++, r--) { int t = a[l]; a[l] = a[r]; a[r] = t; } }
}
\`\`\`

- **Time:** O(n * 2^n) states (masking supports up to 30 elements)
- **Extra space:** O(2^n) memoization`,

  "rb-hamiltonian-path": `## Problem statement

Given an undirected graph with a small number of vertices, return any path visiting every vertex exactly once, or an empty list if none exists.

## Example

For edges 0-1, 1-2, and 2-3, one Hamiltonian path is \`[0, 1, 2, 3]\`.

## Brute-force approach: enumerate vertex permutations

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> hamiltonianBruteForce(boolean[][] graph) {
        int n = graph.length; boolean[] used = new boolean[n]; int[] path = new int[n];
        for (boolean[] row : graph) if (row.length != n) throw new IllegalArgumentException("Graph must be square");
        return permute(graph, 0, used, path) ? toList(path) : List.of();
    }
    private static boolean permute(boolean[][] g, int index, boolean[] used, int[] path) {
        if (index == g.length) {
            for (int i = 1; i < path.length; i++) if (!g[path[i - 1]][path[i]]) return false;
            return true;
        }
        for (int v = 0; v < g.length; v++) if (!used[v]) {
            used[v] = true; path[index] = v;
            if (permute(g, index + 1, used, path)) return true;
            used[v] = false;
        }
        return false;
    }
    private static List<Integer> toList(int[] path) { List<Integer> out = new ArrayList<>(); for (int v : path) out.add(v); return out; }
}
\`\`\`

- **Time:** O(n! * n)
- **Extra space:** O(n)

## Optimized approach: backtrack only across graph edges

Start at each vertex and extend only to unused adjacent vertices.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<Integer> hamiltonianPath(boolean[][] graph) {
        int n = graph.length;
        for (boolean[] row : graph) if (row.length != n) throw new IllegalArgumentException("Graph must be square");
        boolean[] used = new boolean[n]; int[] path = new int[n];
        for (int start = 0; start < n; start++) {
            used[start] = true; path[0] = start;
            if (search(graph, 1, used, path)) {
                List<Integer> result = new ArrayList<>(); for (int v : path) result.add(v); return result;
            }
            used[start] = false;
        }
        return List.of();
    }
    private static boolean search(boolean[][] g, int index, boolean[] used, int[] path) {
        if (index == g.length) return true;
        int previous = path[index - 1];
        for (int next = 0; next < g.length; next++) if (g[previous][next] && !used[next]) {
            used[next] = true; path[index] = next;
            if (search(g, index + 1, used, path)) return true;
            used[next] = false;
        }
        return false;
    }
}
\`\`\`

- **Time:** O(n!) worst case; often less because non-edges are pruned
- **Extra space:** O(n)`
};
